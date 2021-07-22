import {userActions} from "./user-slice";
import axios from "axios";
import api from "./api";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));
const config = {
	headers: {
		'Content-type': 'application/json',
		Authorization: 'Bearer ' + userInfo.token,
	},
};

const get_payload = error => {
	return error.response && error.response.data.detail
		? error.response.data.detail
		: error.message;
}

export const get_profile = () => {
	return async dispatch => {
		dispatch(userActions.profile_request);
		try {
			const {data} = await axios.get(api.profile, config);
			dispatch(userActions.profile_success(data));
		} catch (error) {
			const payload = get_payload(error);
			dispatch(userActions.profile_fail(payload));
		}
	}
}

export const update_profile = profile => {
	return async dispatch => {
		dispatch(userActions.update_request);
		try {
			const {data} = await axios.put(api.profileUpdate, profile, config);
			dispatch(userActions.update_success());
			dispatch(userActions.profile_success(data));
		} catch (error) {
			const payload = get_payload(error);
			dispatch(userActions.update_fail(payload));
		}
		setTimeout(() => dispatch(userActions.update_reset()), 3000)
	}
}

export const fetchUserCourses = () => {
	return async dispatch => {
		try {
			const {data} = await axios.get(api.userCourses, config);
			dispatch(userActions.get_courses(data));
		} catch (error) {
			const payload = get_payload(error);
		}
	}
}
