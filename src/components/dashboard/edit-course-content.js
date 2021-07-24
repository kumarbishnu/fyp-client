import {Accordion, Button, Card, Col, Modal, Row} from "react-bootstrap";
import {Link, Route} from "react-router-dom";
import {useEffect, useState} from "react";
import ChapterPage from "../../pages/dashboard/chapter-page";
import LecturePage from "../../pages/dashboard/lecture-page";
import {useDispatch, useSelector} from "react-redux";
import {deleteChapter} from "../../store/chapter/chapter-actions";
import {fetchCourseContent} from "../../store/course/course-actions";
import {deleteLecture} from "../../store/lecture/lecture-actions";
import Notification from "../ui/notification";

const ConfirmationModal = props => {

	const {chapter, lecture} = props.content;

	return <Modal centered show={props.show} onHide={props.onHide}>
		<Modal.Body>
			<Modal.Title>Are you sure you want to delete this {chapter && 'Chapter'}{lecture && 'Lecture'} ?</Modal.Title>
		</Modal.Body>
		<Modal.Footer>
			<Button variant="danger" onClick={props.onHide}>Cancel</Button>
			{chapter && <Button variant="success" onClick={() => props.onChapterDelete(chapter)}>Delete</Button>}
			{lecture && <Button variant="success" onClick={() => props.onLectureDelete(lecture)}>Delete</Button>}
		</Modal.Footer>
	</Modal>
}

const EditCourseContent = props => {

	const dispatch = useDispatch();

	const [course, setCourse] = useState({})

	const [show, setShow] = useState(false);
	const [content, setContent] = useState({});


	const chapterDelete = useSelector(state => state.chapter.chapterDelete);
	const {success: chapterDeleted, loading: chapterDeleting, error: chapterDeleteError} = chapterDelete;

	const lectureDelete = useSelector(state => state.lecture.lectureDelete);
	const {success: lectureDeleted, loading: lectureDeleting, error: lectureDeleteError} = lectureDelete;

	useEffect(() => {
		setCourse(props.course);
	}, [props.course])

	const hideHandler = () => {setShow(false)}
	const deleteHandler = content => {
		setShow(true);
		setContent(content);
	}

	const deleteChapterHandler = id => {
		setShow(false);
		dispatch(deleteChapter(id));
		dispatch(fetchCourseContent(course.id));
	}
	const deleteLectureHandler = id => {
		setShow(false);
		dispatch(deleteLecture(id));
		dispatch(fetchCourseContent(course.id));
	}

	return <Row>
		{chapterDeleting && <Notification variant="info" title="Info" message="Deleting Chapter..." />}
		{chapterDeleteError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{chapterDeleted && <Notification variant="success" title="Success" message="Chapter Deleted!" />}
		{lectureDeleting && <Notification variant="info" title="Info" message="Deleting Lecture..." />}
		{lectureDeleteError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{lectureDeleted && <Notification variant="success" title="Success" message="Lecture Deleted!" />}
		<ConfirmationModal
			show={show}
			onHide={hideHandler}
			content={content}
			onChapterDelete={deleteChapterHandler}
			onLectureDelete={deleteLectureHandler}
		/>
		<Col md={4}>
			<Accordion>
				<Card>
					<Card.Header>
						<Link to={`/dashboard/courses/${course.id}/chapter`} variant="link"><i className="fas fa-plus me-2"/>Add Chapter</Link>
					</Card.Header>
				</Card>
				{course.chapters && course.chapters.map(chapter =>
					<Card key={chapter.id}>
						<Card.Header className="d-flex justify-content-between align-items-center">
							<Accordion.Toggle eventKey={chapter.id} as="div" className="p-1 btn flex-fill text-start">{chapter.number}. {chapter.title}</Accordion.Toggle>
							<div>
								<Link to={{pathname: `/dashboard/courses/${course.id}/chapter`, state: chapter}} className="text-info text-decoration-none me-3"><i className="fas fa-edit"/></Link>
								<Button variant="link" onClick={() => deleteHandler({chapter: chapter.id})} className="text-danger p-0 text-decoration-none"><i className="fas fa-trash-alt"/></Button>
							</div>
						</Card.Header>
						<Accordion.Collapse eventKey={chapter.id}>
							<Card.Body className="py-2">
								<Link to={`/dashboard/courses/${course.id}/${chapter.id}/lecture`} className="text-decoration-none text-success my-2"><i className="fas fa-plus me-2"/>Add Lecture</Link>
								{chapter.lectures && chapter.lectures.map(lecture =>
									<div key={lecture.id} className="d-flex justify-content-between align-content-center">
										<Card.Text className="mb-0">{lecture.number}. {lecture.title}</Card.Text>
										<div>
											<Link to={{pathname: `/dashboard/courses/${course.id}/${chapter.id}/lecture`, state: lecture}} className="text-info text-decoration-none me-3"><i className="fas fa-edit"/></Link>
											<Button variant="link" onClick={() => deleteHandler({lecture: lecture.id})} className="text-danger p-0 text-decoration-none"><i className="fas fa-trash-alt"/></Button>
										</div>
									</div>
								)}
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				)}
			</Accordion>
		</Col>
		<Col md={8}>
			<Route path="/dashboard/courses/:course_id/chapter/" component={ChapterPage} exact />
			<Route path="/dashboard/courses/:course_id/:chapter_id/lecture/" component={LecturePage} />
		</Col>
	</Row>

}

export default EditCourseContent;
