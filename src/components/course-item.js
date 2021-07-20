import {Card} from "react-bootstrap";
import Badge from "./ui/badge";
import {Link} from "react-router-dom";

const CourseItem = (props) => {
	const {course} = props;
	return <div className="col-md-3 mb-4">
		<Link to={`/courses/${course.id}`} className="text-decoration-none text-reset">
		<Card className="p-2 border-0 shadow h-100" style={{borderRadius: ".7rem"}}>
			<Card.Img src={course.image} alt="" className="card-img-top" style={{borderRadius: ".6rem .6rem .2rem .2rem"}} />
			<Card.Body className="p-2 pb-0">
				<Badge variant="secondary">{course.category}</Badge>
				<Card.Title className="mt-2 mb-0">{course.title}</Card.Title>
			</Card.Body>
			<Card.Footer className="bg-white p-2 border-0">
				<div className="d-flex justify-content-between">
					<Card.Text className="text-muted mb-1">
						<span className="text-warning">{course.rating}<i className="fas fa-star mx-2" /></span>
						<span>({course.review_count})</span>
					</Card.Text>
					<Card.Text>{course.student_count} <span className="text-muted">Student</span></Card.Text>
				</div>
				<div className="d-flex justify-content-between">
					<Card.Text className="mb-0"><i className="fas fa-book text-warning me-2" />{course.lecture_count} lectures</Card.Text>
					<Card.Text><i className="fas fa-brain text-success me-2" />{course.level}</Card.Text>
				</div>
				<hr/>
				<div className="d-flex justify-content-between" style={{fontWeight: "500"}}>
					<Card.Text className="mb-0">{course.tutor.name}</Card.Text>
					{/*<Card.Text className="text-danger">FREE</Card.Text>*/}
				</div>
			</Card.Footer>
		</Card>
		</Link>
	</div>
}

export default CourseItem;
