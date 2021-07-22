import {courseActions} from "./course-slice";
import axios from "axios";
import api from "../../api";

const get_payload = error => {
	return error.response && error.response.data.detail
		? error.response.data.detail
		: error.message;
}

export const fetchCourses = () => {
	return async dispatch => {
		const {data} = await axios.get(api.courses);
		dispatch(courseActions.get_all(data));
	}
}

export const fetchCourseDetails = id => {
	return async dispatch => {
		try {
			const {data} = await axios.get(`${api.courses}${id}`);
			dispatch(courseActions.get_course(data));
		} catch (error) {
			const payload = get_payload(error);
			dispatch(courseActions.get_course_error(payload));
		}
	}
}
