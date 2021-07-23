import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const EditCourseContent = props => {

	const {chapters} = props;

	return <Row>
		<Col md={4}>
			<Accordion>
				<Card>
					<Card.Header className="p-1">
						<Button variant="link"><i className="fas fa-edit me-2"/>Edit Course</Button>
						<Button variant="link"><i className="fas fa-plus me-2"/>Add Chapter</Button>
					</Card.Header>
				</Card>
				{chapters && chapters.map(chapter =>
					<Card key={chapter.id}>
						<Card.Header className="d-flex justify-content-between align-items-center">
							<Accordion.Toggle eventKey={chapter.id} as="div" className="p-1 btn flex-fill text-start">{chapter.number}. {chapter.title}</Accordion.Toggle>
							<div>
								<Link to={`/dashboard/courses/${chapter.id}/edit`} className="text-info text-decoration-none me-3"><i className="fas fa-edit"/></Link>
								<Link to="/" className="text-danger text-decoration-none"><i className="fas fa-trash-alt"/></Link>
							</div>
						</Card.Header>
						<Accordion.Collapse eventKey={chapter.id}>
							<Card.Body className="py-2">
								<Link to="/" className="text-decoration-none text-success my-2"><i className="fas fa-plus me-2"/>Add Lecture</Link>
								{chapter.lectures && chapter.lectures.map(lecture =>
									<div key={lecture.id} className="d-flex justify-content-between align-content-center">
										<Card.Text className="mb-0">{lecture.number}. {lecture.title}</Card.Text>
										<div>
											<Link to={`/dashboard/courses/${chapter.id}/edit`} className="text-info text-decoration-none me-3"><i className="fas fa-edit"/></Link>
											<Link to="/" className="text-danger text-decoration-none"><i className="fas fa-trash-alt"/></Link>
										</div>
									</div>
								)}
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				)}
			</Accordion>
		</Col>
	</Row>

}

export default EditCourseContent;