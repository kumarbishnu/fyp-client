import MainLayout from "../../components/layout/main-layout";
import {Accordion, Alert, Button, Card, Col, Container, Modal, Row} from "react-bootstrap";
import {Fragment, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {enrollCourse, fetchCourseContent} from "../../store/course/course-actions";
import {Link, useHistory} from "react-router-dom";
import {fetchUserCourses} from "../../store/user/user-actions";
import Badge from "../../components/ui/badge";
import Notification from "../../components/ui/notification";

const CoursePage = ({match}) => {

	const dispatch = useDispatch();
	const history = useHistory();

	const courseContent = useSelector(state => state.courses.courseContent);
	const {course, error} = courseContent;

	const enroll = useSelector(state => state.courses.enroll);
	const {success: enrollSuccess, loading: enrollLoading, error: enrollError} = enroll;

	const userInfo = useSelector(state => state.auth.userInfo);
	const userCourses = useSelector(state => state.user.courses)

	const [show, setShow] = useState(false);
	const [owner, setOwner] = useState(false);
	const [student, setStudent] = useState(false);
	const [tutor, setTutor] = useState(false);

	useEffect(() => {
		dispatch(fetchCourseContent(match.params.id));
	}, [dispatch, match.params.id])

	useEffect(() => {
		if (userInfo) {
			dispatch(fetchUserCourses())
		}
	}, [dispatch, userInfo])

	useEffect(() => {
		setTutor(false);
		setStudent(false);
		if (userInfo && !userInfo.is_tutor) {setStudent(true)}
		if (userInfo && userInfo.is_tutor) {setTutor(true)}
	}, [userInfo, course])

	useEffect(() => {
		setOwner(false);
		if (userCourses.length > 0 && course) {
			let findIndex = userCourses.findIndex(x => x.id === course.id);
			if (findIndex !== -1) {setOwner(true)}
		}
	}, [userCourses, course])

	// const showHandler = () => {setShow(true)}
	const hideHandler = () => {setShow(false)}

	const enrollHandler = () => {
		if (!userInfo) {history.push('/login/');}
		dispatch(enrollCourse(course.id));
		setShow(true);
	}

	const redirectHandler = () => {history.push(`/learn/${course.id}`)}

	return <MainLayout>
		{enrollLoading && <Notification variant="info" title="Info" message="Enrolling in course..."/>}
		{enrollError && <Notification variant="danger" title="Error" message="Something went wrong!"/>}
		<Modal show={show} onHide={hideHandler} centered>
			<Modal.Body  className="p-5">
				<Modal.Title>
					{course && course.title} added to your library!
				</Modal.Title>
				<hr/>
				<div className="text-end">
					<Button variant="secondary" onClick={redirectHandler}>Okay</Button>
				</div>
			</Modal.Body>
		</Modal>
		<Container className="my-5">
			{error && <Alert variant="danger">Course Not Found.</Alert> }
			{course &&
				<Fragment>
					<Card className="shadow p-5">
						<Row>
							<Col md={4}>
								<Card.Img src={course.image} style={{aspectRatio: "4/3", objectFit: "cover"}} />
							</Col>
							<Col md={8}>
								<Card.Title>{course.title}</Card.Title>
								<Badge variant="secondary">{course.category}</Badge>
								<Card.Subtitle className="mt-1 mb-3">By {course.tutor && course.tutor.name}</Card.Subtitle>
								<div className="d-flex mb-2 w-50 justify-content-between">
									<Card.Subtitle><span className="text-warning">{course.rating}<i className="fas fa-star mx-2" /></span>({course.review_count})</Card.Subtitle>
									<Card.Subtitle>{course.student_count} <span className="text-muted">Student</span></Card.Subtitle>
								</div>
								<div className="d-flex mb-2 w-50 justify-content-between">
									<Card.Subtitle className="mb-0"><i className="fas fa-book text-warning me-2" />{course.lecture_count} lectures</Card.Subtitle>
									<Card.Subtitle><i className="fas fa-brain text-success me-2" />{course.level}</Card.Subtitle>
								</div>
								<Card.Text className="text-justify">{course.description}</Card.Text>
								{!userInfo && <Button variant="success" onClick={enrollHandler}>Enroll</Button>}
								{student && owner && <Link to={`/learn/${course.id}`} class="btn btn-success">Learn</Link>}
								{student && !owner && <Button variant="success" onClick={enrollHandler}>Enroll</Button>}
								{tutor && owner && <Link to={`/dashboard/courses/${course.id}`} class="btn btn-success">Edit</Link>}
							</Col>
						</Row>
					</Card>
					<Row>
						<Col md={6}>
							<Accordion className="p-5 mt-5 shadow mx-auto">
								<h5 className="mb-4">Course Contents</h5>
								{course.chapters && course.chapters.map(chapter =>
									<Card key={chapter.id}>
										<Card.Header>
											<Accordion.Toggle eventKey={chapter.id} as="div" className="btn d-flex text-start align-items-center">
												<span className="me-2">{chapter.number}.</span>
												<span className="flex-fill">{chapter.title}</span>
												<i className="fas fa-chevron-down"/>
											</Accordion.Toggle>
										</Card.Header>
										<Accordion.Collapse eventKey={chapter.id}>
											<Card.Body>
												{chapter.lectures && chapter.lectures.map(lecture =>
													<div key={lecture.id} className="ps-3">
														<span className="me-2">{chapter.number}.{lecture.number}.</span>
														{lecture.title}
													</div>
												)}
											</Card.Body>
										</Accordion.Collapse>
									</Card>
								)}
							</Accordion>
						</Col>
					</Row>
				</Fragment>
			}
		</Container>
	</MainLayout>
}

export default CoursePage;
