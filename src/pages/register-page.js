import LoginLayout from "../components/layout/login-layout";
import {Link} from "react-router-dom";
import {Alert, Button, Form, Spinner, ToggleButton, ToggleButtonGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {register} from "../store/auth-actions";

const RegisterPage = props => {

	const nameRef = useRef();
	const emailRef = useRef();
	const passwordRef = useRef();
	const password2Ref = useRef();
	const [role, setRole] = useState();

	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.auth.userInfo);
	const {loading, error} = useSelector(state => state.auth.userRegister);

	useEffect(() => {
		if (userInfo) {
			props.history.replace('/dashboard');
		}
	}, [userInfo, props.history])

	const [formErrors, setFormErrors] = useState([]);
	const submitHandler = event => {
		event.preventDefault();
		let errors = [];
		const name = nameRef.current.value;
		const email = emailRef.current.value;
		const password = passwordRef.current.value;
		const password2 = password2Ref.current.value;

		if (name.trim() === '') {
			errors.push(<li>Name is required!</li>)
		}
		if (!email.includes('@')) {
			errors.push(<li>Email is invalid!</li>)
		}
		if (password.length < 5 || password !== password2) {
			errors.push(<li>Passwords does not match!</li>)
		}
		if (!role) {
			errors.push(<li>No role selected!</li>)
		}
		if (errors.length > 0) {
			setFormErrors(errors);
			return;
		}
		dispatch(register({name, email, password, role}))
	}

	return <LoginLayout>
		<Form className="w-75" onSubmit={submitHandler}>
			<div className="mb-4">
				Already have an account?
				<Link to="/login" className="ms-1 text-success" style={{fontWeight: "500"}}>Login</Link>.
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="text" id="name" required ref={nameRef} />
				<label htmlFor="name">Full Name</label>
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="email" id="email" required ref={emailRef} />
				<label htmlFor="email">Email Address</label>
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="password" id="password" required ref={passwordRef} />
				<label htmlFor="password">Password</label>
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="password" id="password1" required ref={password2Ref} />
				<label htmlFor="password1">Confirm Password</label>
			</div>
			<ToggleButtonGroup name="role" type="radio" className="w-100 mb-4">
				<ToggleButton variant="outline-secondary" value="Student" onChange={e => setRole(e.target.value)}>I am a Student</ToggleButton>
				<ToggleButton variant="outline-secondary" value="Tutor"  onChange={e => setRole(e.target.value)}>I am a Tutor</ToggleButton>
			</ToggleButtonGroup>
			<Button variant="success" size="lg" className="w-100" type="submit">Register {loading && <Spinner animation="border" size="sm" />}</Button>
			{formErrors.length > 0 &&
				<Alert variant="danger" className="mt-3">
					{formErrors.map(error => error)}
				</Alert>
			}
			{error && <Alert variant="danger" className="mt-3">{error}</Alert> }
		</Form>
	</LoginLayout>
}

export default RegisterPage;
