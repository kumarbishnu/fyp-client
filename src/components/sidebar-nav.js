import {Dropdown, Nav, Navbar} from "react-bootstrap";

const SidebarNav = props => {

	// const {image} = props;

	return <Navbar className="py-0 px-2">
		<Nav className="ms-auto">
			<Nav.Item className="dropdown">
				<Nav.Link className="dropdown-toggle" id="navbarDropdown" role="button"
				   data-bs-toggle="dropdown" aria-expanded="false">
					<img src={"/images/user.png"} alt="" className="rounded-circle" width="36px" height="36px" />
				</Nav.Link>
				<ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{transform: "translateX(-100px)"}}>
					<Dropdown.Item>Profile</Dropdown.Item>
					<Dropdown.Item>Logout</Dropdown.Item>
				</ul>
			</Nav.Item>
		</Nav>
	</Navbar>
}

export default SidebarNav;
