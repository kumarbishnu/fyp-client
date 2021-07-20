import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth-slice";

const MainNav = () => {

	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.auth.userInfo);

	const logoutHandler = event => {
		dispatch(authActions.logout());
	}

	return <Navbar style={{fontWeight: "600"}} >
		<Container>
			<Link to="/" className="navbar-brand">CourseDeck</Link>
			<Navbar.Toggle aria-controls="main-nav" />
			<Navbar.Collapse id="main-nav">
				<Nav className="mx-auto">
					<LinkContainer to="/" exact>
						<Nav.Link>Home</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/courses">
						<Nav.Link>All Courses</Nav.Link>
					</LinkContainer>
					<LinkContainer to="/contact">
						<Nav.Link>Contact</Nav.Link>
					</LinkContainer>
				</Nav>
				{!userInfo &&
					<Nav>
						<LinkContainer to="/login">
							<Nav.Link className="text-success me-3">Login</Nav.Link>
						</LinkContainer>
						<Link to="/register" className="btn btn-outline-success" style={{fontWeight: "600"}}>Register</Link>
					</Nav>
				}
				{userInfo &&
					<Nav>
						<LinkContainer to="/dashboard">
							<Nav.Link className="text-success me-3">{userInfo.name}</Nav.Link>
						</LinkContainer>
						<Button variant="outline-danger" onClick={logoutHandler}>Logout</Button>
					</Nav>
				}
			</Navbar.Collapse>
		</Container>
	</Navbar>
}

export default MainNav;
