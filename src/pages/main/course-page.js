import MainLayout from "../../components/layout/main-layout";
import {Alert, Button, Card, Col, Container, Row} from "react-bootstrap";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {fetchCourseDetails} from "../../store/course/course-actions";

const CoursePage = ({match}) => {

	const dispatch = useDispatch();
	const courseDetails = useSelector(state => state.courses.courseDetails);
	const {course, error} = courseDetails;

	useEffect(() => {
		dispatch(fetchCourseDetails(match.params.id));
	}, [dispatch, match.params.id])


	return <MainLayout>
		<Container className="my-5">
			{error && <Alert variant="danger">Course Not Found.</Alert> }
			{course &&
				<Card className="shadow p-5">
					<Row>
						<Col md={4}>
							<Card.Img src={course.image} />
						</Col>
						<Col md={8}>
							<Card.Title>{course.title}</Card.Title>
							<Card.Subtitle>By {course.tutor.name}</Card.Subtitle>
							<Card.Text className="text-justify">{course.description}</Card.Text>
							<Button variant="success">Enroll</Button>
						</Col>
					</Row>
				</Card>
			}
		</Container>
	</MainLayout>
}

export default CoursePage;
