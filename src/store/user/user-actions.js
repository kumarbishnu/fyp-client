import {userActions} from "./user-slice";
import axios from "axios";
import api from "../../api";
import {createConfig, createPayload} from "../helpers";

export const get_profile = () => {
	return async (dispatch, getState) => {
		dispatch(userActions.profile_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.get(api.profile, config);
			dispatch(userActions.profile_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(userActions.profile_fail(payload));
		}
	}
}

export const update_profile = profile => {
	return async (dispatch, getState) => {
		dispatch(userActions.update_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.put(api.profileUpdate, profile, config);
			dispatch(userActions.update_success());
			dispatch(userActions.profile_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(userActions.update_fail(payload));
		}
		setTimeout(() => dispatch(userActions.update_reset()), 3000)
	}
}

export const fetchUserCourses = () => {
	return async (dispatch, getState) => {
		try {
			const config = createConfig(getState);
			const {data} = await axios.get(api.userCourses, config);
			dispatch(userActions.get_courses(data));
		} catch (error) {
			createPayload(error);
		}
	}
}
