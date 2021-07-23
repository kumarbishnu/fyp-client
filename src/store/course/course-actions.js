import {courseActions} from "./course-slice";
import axios from "axios";
import api from "../../api";
import {createConfig, createFormConfig, createPayload} from "../helpers";

export const fetchCourses = () => {
	return async dispatch => {
		const {data} = await axios.get(api.courses);
		dispatch(courseActions.get_all(data));
	}
}

export const fetchCourseDetails = id => {
	return async dispatch => {
		try {
			const {data} = await axios.get(api.courseById(id));
			dispatch(courseActions.get_course(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(courseActions.get_course_error(payload));
		}
	}
}

export const fetchCategories = () => {
	return async dispatch => {
		const {data} = await axios.get(api.categories);
		dispatch(courseActions.set_categories(data));
	}
}

export const fetchCourseContent = id => {
	return async (dispatch, getState) => {
		const config = createConfig(getState);
		const {data} = await axios.get(api.courseContent(id), config);
		dispatch(courseActions.course_content_success(data));
	}
}

export const uploadImage = (id, image) => {
	return async (dispatch, getState) => {
		const imageData = new FormData();
		imageData.append('image', image)
		imageData.append('course', id)
		dispatch(courseActions.image_upload_request());
		try {
			const config = createFormConfig(getState);
			const {data} = await axios.post(api.courseUpload, imageData, config);
			dispatch(courseActions.image_upload_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(courseActions.image_upload_fail(payload));
		}
		setTimeout(() => dispatch(courseActions.image_upload_reset()), 3000);
	}
}


export const pushCourse = (course, image) => {
	return async (dispatch, getState) => {
		dispatch(courseActions.course_create_request());
		try {
			const config = createConfig(getState);
			const {data} = await axios.post(api.courseCreate, course, config);
			if (image) {
				dispatch(uploadImage(data.id, image));
			}
			dispatch(courseActions.course_create_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(courseActions.course_create_fail(payload));
		}
		setTimeout(() => dispatch(courseActions.course_create_reset()), 3000);
	}
}

export const updateCourse = (course, image) => {
	return async (dispatch, getState) => {
		dispatch(courseActions.course_update_request());
		try {
			const config = createConfig(getState);
			const {data} = await axios.put(api.courseUpdate, course, config);
			if (image) {
				dispatch(uploadImage(data.id, image));
			}
			dispatch(courseActions.course_update_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(courseActions.course_update_fail(payload));
		}
		setTimeout(() => dispatch(courseActions.course_update_reset()), 3000);
	}
}
