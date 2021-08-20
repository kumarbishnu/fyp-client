import {Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";
import Badge from "../ui/badge";

const StudentCourses = props => {

	return <Row>
		{props.courses.map(course =>
			<Col md={6} className="mb-3">
				<Link to={`/learn/${course.id}`} className="text-decoration-none text-reset">
					<Card className="h-100 p-3 shadow-sm">
						<Row className="g-3">
							<Col md={5}>
								<Card.Img src={course.image} style={{aspectRatio: "4/3", objectFit: "cover"}} />
							</Col>
							<Col md={7}>
								<h6>{course.title}</h6>
								<Badge variant="secondary">{course.category}</Badge>
								{/*<Card.Text className="text-muted mt-1 mb-0">*/}
								{/*	<span className="text-warning">{course.rating}<i className="fas fa-star mx-2" /></span>*/}
								{/*	<span>({course.review_count})</span>*/}
								{/*</Card.Text>*/}
								<Card.Text className="mb-0">{course.student_count} <span className="text-muted">Student</span></Card.Text>
								<Card.Text className="mb-0"><i className="fas fa-book text-warning me-2" />{course.lecture_count} lectures</Card.Text>
								<Card.Text className="mb-0"><i className="fas fa-brain text-success me-2" />{course.level}</Card.Text>
							</Col>
						</Row>
					</Card>
				</Link>
			</Col>
		)}
	</Row>
}

export default StudentCourses;
