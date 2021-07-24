import {lectureActions} from "./lecture-slice";
import {createConfig, createPayload} from "../helpers";
import axios from "axios";
import api from "../../api";

export const createLecture = (lecture, file) => {
	return async (dispatch, getState) => {
		dispatch(lectureActions.lecture_create_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.post(api.lectureCreate, lecture, config);
			if (file) {
				dispatch(uploadLecture(data.id, file));
			}
			dispatch(lectureActions.lecture_create_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(lectureActions.lecture_create_fail(payload));
		}
		setTimeout(() => dispatch(lectureActions.lecture_create_reset()),3000);
	}
}


export const updateLecture = (lecture, file) => {
	return async (dispatch, getState) => {
		dispatch(lectureActions.lecture_update_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.put(api.lectureUpdate, lecture, config);
			if (file) {
				dispatch(uploadLecture(data.id, file));
			}
			dispatch(lectureActions.lecture_update_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(lectureActions.lecture_update_fail(payload));
		}
		setTimeout(() => dispatch(lectureActions.lecture_update_reset()),3000);
	}
}


export const deleteLecture = id => {
	return async (dispatch, getState) => {
		dispatch(lectureActions.lecture_delete_request());
		try {
			const config = createConfig(getState);
			await axios.delete(api.lectureDelete(id), config);
			dispatch(lectureActions.lecture_delete_success());
		} catch (error) {
			const payload = createPayload(error);
			dispatch(lectureActions.lecture_delete_fail(payload));
		}
		setTimeout(() => dispatch(lectureActions.lecture_delete_reset()),3000);
	}
}


export const uploadLecture = (id, file) => {
	return async (dispatch, getState) => {
		const fileData = new FormData();
		fileData.append('file', file);
		fileData.append('lecture', id);
		dispatch(lectureActions.lecture_upload_request());
		try {
			const config = createConfig(getState);
			await axios.post(api.lectureUpload, fileData, config);
			dispatch(lectureActions.lecture_upload_success());
		} catch (error) {
			const payload = createPayload(error);
			dispatch(lectureActions.lecture_upload_fail(payload));
		}
		setTimeout(() => dispatch(lectureActions.lecture_upload_reset()),3000);
	}
}
