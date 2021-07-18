import LoginLayout from "../components/layout/login-layout";
import {Button, Form} from "react-bootstrap";
import {Link} from "react-router-dom";

const LoginPage = () => {
	return <LoginLayout>
		<Form action="" className="w-75">
			<div className="mb-4">
				Don't have an account?
				<Link to="/register" className="ms-1 text-success" style={{fontWeight: "500"}}>Register</Link>.
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="email" id="email" required />
				<label htmlFor="email">Email Address</label>
			</div>
			<div className="form-floating mb-4">
				<Form.Control type="password" id="password" required />
				<label htmlFor="password">Password</label>
			</div>
			<Button variant="success" size="lg" className="w-100" type="submit">Login</Button>
		</Form>
	</LoginLayout>
}

export default LoginPage;
