import {Link} from "react-router-dom";
import {Container, Image} from "react-bootstrap";
import banner from "../../assets/login.jpg";

const LoginLayout = props => {
	return <Container className="vh-100 row mx-auto">
		<div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
			<Image src={banner} alt="" className="img-fluid"/>
			<h2>CourseDeck</h2>
			<Link to="/" className="btn p-0" style={{fontWeight: "600"}}>Return to Homepage</Link>
		</div>
		<div className="col-md-6 d-flex flex-column justify-content-center p-5 align-items-start">
			<h3>Let's Get Started.</h3>
			{props.children}
		</div>
	</Container>
}

export default LoginLayout;
