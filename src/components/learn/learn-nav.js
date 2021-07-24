import {Nav, Navbar} from "react-bootstrap";
import {Link} from "react-router-dom";

const LearnNav = props => {
	return <Navbar className="px-4" variant="dark" bg="dark" sticky="top">
		<p className="navbar-brand mb-0">{props.title}</p>
		<Navbar.Toggle aria-controls="learn-nav"/>
		<Navbar.Collapse id="learn-nav">
			<Nav className="ms-auto">
				<Link to="/" className="nav-link"><i className="fas fa-home"/> Home</Link>
				<Link to="/dashboard/courses" className="nav-link"><i className="fas fa-bars"/> Dashboard</Link>
				<Link to="/" className="nav-link"><i className="fas fa-sign-out-alt"/> Exit</Link>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
}

export default LearnNav;
