import {courseActions} from "./courses-slice";
import axios from "axios";
import api from "./api";

export const fetchCourses = () => {
	return async (dispatch) => {
		const {data} = await axios.get(api.courses);
		dispatch(courseActions.get_all(data));
	}
}
