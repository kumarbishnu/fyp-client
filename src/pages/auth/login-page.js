import LoginLayout from "../../components/layout/login-layout";
import {Alert, Button, Form, Spinner} from "react-bootstrap";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import {login} from "../../store/auth/auth-actions";

const LoginPage = props => {

	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.auth.userInfo);
	const userLogin = useSelector(state => state.auth.userLogin);
	const {loading, error} = userLogin;

	useEffect(() => {
		if (userInfo) {
			props.history.replace('/dashboard');
		}
	}, [userInfo, props.history])

	const emailRef = useRef();
	const passwordRef = useRef();

	const submitHandler = event => {
		event.preventDefault();
		const username = emailRef.current.value;
		const password = passwordRef.current.value;
		dispatch(login(username, password));
	}

	return <LoginLayout>
		<Form className="w-75" onSubmit={submitHandler}>
			<div className="mb-4">
				Don't have an account?
				<Link to="/register" className="ms-1 text-success" style={{fontWeight: "500"}}>Register</Link>.
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="email" id="email" placeholder="E-mail" required ref={emailRef} />
				<label htmlFor="email">Email Address</label>
			</div>
			<div className="form-floating mb-4">
				<Form.Control type="password" id="password" placeholder="Password" required ref={passwordRef} />
				<label htmlFor="password">Password</label>
			</div>
			<Button variant="success" size="lg" className="w-100" type="submit">Login {loading && <Spinner animation="border" size="sm" />}</Button>
			{error && <Alert variant="danger" className="mt-3">{error}</Alert> }
		</Form>
	</LoginLayout>
}

export default LoginPage;
