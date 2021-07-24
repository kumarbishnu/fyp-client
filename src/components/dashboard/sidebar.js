import {Button, Card, Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";
import {LinkContainer} from "react-router-bootstrap";

const Sidebar = props => {

	const {user} = props;

	return <Navbar className="p-3 vh-100 d-flex flex-column justify-content-between align-items-stretch border-end" id="sidebar" style={{width: "20rem"}}>
		<div>
			<Link to="/" className="navbar-brand">CourseDeck</Link>
			<Link to="/dashboard/profile/" className="text-reset text-decoration-none">
				<Card bg="light" border="0" className="my-4" style={{borderRadius: ".8rem"}} >
					<Card.Body className="d-flex p-3">
						<Card.Img src={user.image ? user.image : '/images/user.png'} style={{width: "48px", aspectRatio: "1/1", objectFit: "cover"}} className="p-1 rounded-circle" />
						<div className="ms-2">
							<Card.Text className="mb-0" style={{fontWeight: "500"}}>{user.name}</Card.Text>
							<small className="text-muted">{user.is_tutor ? "Tutor" : "Student"}</small>
						</div>
					</Card.Body>
				</Card>
			</Link>
			<Nav className="flex-column text-secondary">
				{/*<LinkContainer to="/dashboard/" exact>*/}
				{/*	<Nav.Item className="p-3"><i className="fas fa-bars me-3"/>Dashboard</Nav.Item>*/}
				{/*</LinkContainer>*/}
				<LinkContainer to="/dashboard/courses/">
					<Nav.Item className="p-3"><i className="fas fa-book me-3"/>Courses</Nav.Item>
				</LinkContainer>
				<LinkContainer to="/dashboard/profile/">
					<Nav.Item className="p-3"><i className="fas fa-user me-3"/>Profile</Nav.Item>
				</LinkContainer>
			</Nav>
		</div>
		<Button variant="danger" className="fw-bold" onClick={props.onLogout}><i className="fas fa-sign-out-alt"/> Logout</Button>
	</Navbar>
}

export default Sidebar;
