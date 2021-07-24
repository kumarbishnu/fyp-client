import LearnLayout from "../../components/layout/learn-layout";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchCourseContent} from "../../store/course/course-actions";
import {Accordion, Card, Col, Row} from "react-bootstrap";
import {Link, Route} from "react-router-dom";
import LearnLecture from "../../components/learn/learn-lecture";

const LearnPage = ({match}) => {

	const dispatch = useDispatch();
	const courseContent = useSelector(state => state.courses.courseContent);
	const {course} = courseContent;

	useEffect(() => {
		dispatch(fetchCourseContent(match.params.id));
	}, [dispatch, match.params.id])

	return <LearnLayout title={course.title}>
		<Row className="m-0">
			<Col md={3} className="vh-100 bg-light border-end p-0 position-fixed">
				<Accordion>
					{course.chapters && course.chapters.map(chapter =>
						<Card key={chapter.id}>
							<Card.Header className="bg-white">
								<Accordion.Toggle eventKey={chapter.id} as="div" className="btn d-flex text-start align-items-center">
									<span className="me-3 d-inline-block text-end" style={{width: "1.4rem"}}>{chapter.number}.</span>
									<span className="flex-fill">{chapter.title}</span>
									<i className="fas fa-chevron-down"/>
								</Accordion.Toggle>
							</Card.Header>
							<Accordion.Collapse eventKey={chapter.id}>
								<Card.Body>
									{chapter.lectures && chapter.lectures.map(lecture =>
										<div key={lecture.id}>
											<Link to={{pathname: `/learn/${course.id}/${lecture.id}`, state: lecture}} className="text-reset text-decoration-none d-block ps-5">
												<span className="me-2">{chapter.number}.{lecture.number}.</span>
												{lecture.title}
											</Link>
										</div>
									)}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					)}
				</Accordion>
			</Col>
			<Col md={4}/>
			<Col md={7} className="p-5">
				<Route path="/learn/:course_id/:lecture_id" component={LearnLecture} />
			</Col>
		</Row>
	</LearnLayout>
}

export default LearnPage;
