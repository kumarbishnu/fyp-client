import {authActions} from "./auth-slice";
import axios from "axios";
import api from "../../api";

const config = {headers: {'Content-type': 'application/json'}};

export const login = (username, password) => {
	return async dispatch => {
		dispatch(authActions.login_request());
		try {
			const {data} = await axios.post(api.login, {username, password}, config);
			dispatch(authActions.login_success(data));
		} catch (error) {
			const payload = error.response && error.response.data.detail
				? error.response.data.detail
				: error.message;
			dispatch(authActions.login_fail(payload));
		}
	}
}

export const register = user => {
	return async dispatch => {
		dispatch(authActions.register_request());
		try {
			const {data} = await axios.post(api.register, user, config);
			dispatch(authActions.register_success());
			dispatch(authActions.login_success(data));
		} catch (error) {
			const payload = error.response && error.response.data.detail
				? error.response.data.detail
				: error.message;
			dispatch(authActions.register_fail(payload));
		}
	}
}
