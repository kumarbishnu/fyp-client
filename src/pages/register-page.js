import LoginLayout from "../components/layout/login-layout";
import {Link} from "react-router-dom";
import {Button, Form, ToggleButton, ToggleButtonGroup} from "react-bootstrap";

const RegisterPage = () => {
	return <LoginLayout>
		<Form action="" className="w-75">
			<div className="mb-4">
				Already have an account?
				<Link to="/login" className="ms-1 text-success" style={{fontWeight: "500"}}>Login</Link>.
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="email" id="email" required />
				<label htmlFor="email">Email Address</label>
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="password" id="password" required />
				<label htmlFor="password">Password</label>
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="password" id="password1" required />
				<label htmlFor="password1">Confirm Password</label>
			</div>
			<ToggleButtonGroup name="role" type="radio" className="w-100 mb-4">
				<ToggleButton variant="outline-secondary" value="Student">I am a Student</ToggleButton>
				<ToggleButton variant="outline-secondary" value="Tutor">I am a Tutor</ToggleButton>
			</ToggleButtonGroup>
			<Button variant="success" size="lg" className="w-100" type="submit">Register</Button>
		</Form>
	</LoginLayout>
}

export default RegisterPage;
