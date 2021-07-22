import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth/auth-slice";

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
					{/*<LinkContainer to="/contact">*/}
					{/*	<Nav.Link>Contact</Nav.Link>*/}
					{/*</LinkContainer>*/}
				</Nav>
				{!userInfo &&
					<Nav>
						<Link to="/register" className="btn text-success">Register</Link>
						<Link to="/login" className="btn btn-success">Login</Link>
					</Nav>
				}
				{userInfo &&
					<Nav>
						<Link to="/dashboard" className="btn text-success">{userInfo.name}</Link>
						<Button variant="danger" onClick={logoutHandler}>Logout</Button>
					</Nav>
				}
			</Navbar.Collapse>
		</Container>
	</Navbar>
}

export default MainNav;
