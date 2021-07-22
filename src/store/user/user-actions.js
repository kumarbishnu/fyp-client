import {userActions} from "./user-slice";
import axios from "axios";
import api from "../../api";

const getConfig = getState => {
	const {auth: {userInfo}} = getState();
	return {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${userInfo && userInfo.token}`,
		},
	}
}

const get_payload = error => {
	return error.response && error.response.data.detail
		? error.response.data.detail
		: error.message;
}

export const get_profile = () => {
	return async (dispatch, getState) => {
		dispatch(userActions.profile_request);
		try {
			const config = getConfig(getState);
			const {data} = await axios.get(api.profile, config);
			dispatch(userActions.profile_success(data));
		} catch (error) {
			const payload = get_payload(error);
			dispatch(userActions.profile_fail(payload));
		}
	}
}

export const update_profile = profile => {
	return async (dispatch, getState) => {
		dispatch(userActions.update_request);
		try {
			const config = getConfig(getState);
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
	return async (dispatch, getState) => {
		try {
			const config = getConfig(getState);
			const {data} = await axios.get(api.userCourses, config);
			dispatch(userActions.get_courses(data));
		} catch (error) {
			get_payload(error);
		}
	}
}
