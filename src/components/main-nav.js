import {Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";

const MainNav = () => {
	return <Navbar style={{fontWeight: "600"}} >
		<Container>
			<Navbar.Brand href="/">CourseDeck</Navbar.Brand>
			<Navbar.Toggle aria-controls="main-nav" />
			<Navbar.Collapse id="main-nav">
				<Nav className="mx-auto">
					<LinkContainer to="/">
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/courses">
						<Nav.Link>All Courses</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/contact">
						<Nav.Link>Contact</Nav.Link>
					</LinkContainer>
				</Nav>
				<Nav>
					<LinkContainer to="/login">
						<Nav.Link className="text-success me-3">Login</Nav.Link>
					</LinkContainer>
					<Link to="/register" className="btn btn-outline-success" style={{fontWeight: "600"}}>Register</Link>
				</Nav>
			</Navbar.Collapse>
		</Container>
	</Navbar>
}

export default MainNav;
