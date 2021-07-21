import {Dropdown, Nav, Navbar} from "react-bootstrap";

const SidebarNav = props => {

	return <Navbar className="py-3 px-5 mb-5">
		<Nav className="ms-auto">
			<Nav.Item className="dropdown">
				<Nav.Link className="dropdown-toggle" id="navbarDropdown" role="button"
				   data-bs-toggle="dropdown" aria-expanded="false">
					<img src={props.image} alt="User" className="rounded-circle" style={{width: "36px", aspectRatio: "1/1", objectFit: "cover"}} />
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
