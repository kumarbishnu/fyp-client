import {Container} from "react-bootstrap";

const Footer = () => {
	return <footer className="bg-dark text-light mt-5">
		<Container className="py-5 d-flex justify-content-between align-items-end">
			<div>
				<h3>CourseDeck</h3>
				<h6>&copy; CourseDeck 2021</h6>
			</div>
			<h6 className="">Developed By: Bishnu Kumar Das</h6>
		</Container>
	</footer>
}

export default Footer;
