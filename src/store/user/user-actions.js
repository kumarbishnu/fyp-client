import {userActions} from "./user-slice";
import axios from "axios";
import api from "../../api";
import {createConfig, createFormConfig, createPayload} from "../helpers";

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

export const updateProfileImage = image => {
	return async (dispatch, getState) => {
		const imageData = new FormData();
		imageData.append('image', image);
		dispatch(userActions.image_upload_request());
		try {
			const config = createFormConfig(getState);
			await axios.post(api.profileUpload, imageData, config)
			dispatch(userActions.image_upload_success());
		} catch (error) {
			const payload = createPayload(error);
			dispatch(userActions.image_upload_fail(payload))
		}
	}
}

export const update_profile = (profile, image) => {
	return async (dispatch, getState) => {
		dispatch(userActions.update_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.put(api.profileUpdate, profile, config);
			if (image) {
				// dispatch()
			}
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
