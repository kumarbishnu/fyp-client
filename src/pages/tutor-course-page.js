import DashboardLayout from "../components/layout/dashboard-layout";
import {useState} from "react";
import {Accordion, Button, Card, Col, Row} from "react-bootstrap";
import {Link} from "react-router-dom";

const dummy_chapters = [
	{id: 6, number: 1, title: 'Chapter One', lectures: [{number: 1, title: 'Hello World'}, {number: 2, title: 'Hello World 2'},]},
	{id: 1, number: 2, title: 'Chapter Two', lectures: [{number: 1, title: 'Hello World'}, {number: 2, title: 'Hello World 2'},]},
	{id: 2, number: 3, title: 'Chapter Three', lectures: [{number: 1, title: 'Hello World'}, {number: 2, title: 'Hello World 2'},]},
	{id: 3, number: 4, title: 'Chapter Four', lectures: [{number: 1, title: 'Hello World'}, {number: 2, title: 'Hello World 2'},]},
	{id: 4, number: 5, title: 'Chapter Five', lectures: []},
	{id: 5, number: 6, title: 'Chapter Six', lectures: [{number: 1, title: 'Hello World'}]},
]

const TutorCoursePage = props => {

	const [chapters] = useState(dummy_chapters);

	return <DashboardLayout>
		<h4 className="mb-4">Course Title</h4>
		<Row>
			<Col md={4}>
				<Accordion>
					<Card>
						<Card.Header className="p-1">
							<Button variant="link"><i className="fas fa-edit me-2"/>Edit Course</Button>
							<Button variant="link"><i className="fas fa-plus me-2"/>Add Chapter</Button>
						</Card.Header>
					</Card>
					{chapters.map(chapter =>
						<Card>
							<Card.Header className="d-flex justify-content-between align-items-center">
								<Accordion.Toggle eventKey={chapter.id} as="div" className="p-1 btn flex-fill text-start">{chapter.number}. {chapter.title}</Accordion.Toggle>
								<div>
									<Link to={`/dashboard/courses/${chapter.id}/edit`} class="text-info text-decoration-none me-3"><i className="fas fa-edit"/></Link>
									<Link to="/" class="text-danger text-decoration-none"><i className="fas fa-trash-alt"/></Link>
								</div>
							</Card.Header>
							<Accordion.Collapse eventKey={chapter.id}>
								<Card.Body className="py-2">
									<Link className="text-decoration-none text-success my-2"><i className="fas fa-plus me-2"/>Add Lecture</Link>
									{chapter.lectures && chapter.lectures.map(lecture =>
										<div className="d-flex justify-content-between align-content-center">
											<Card.Text className="mb-0">{lecture.number}. {lecture.title}</Card.Text>
											<div>
												<Link to={`/dashboard/courses/${chapter.id}/edit`} class="text-info text-decoration-none me-3"><i className="fas fa-edit"/></Link>
												<Link to="/" class="text-danger text-decoration-none"><i className="fas fa-trash-alt"/></Link>
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
	</DashboardLayout>
}

export default TutorCoursePage;
