import {chapterActions} from "./chapter-slice";
import {createConfig, createPayload} from "../helpers";
import axios from "axios";
import api from "../../api";

export const createChapter = chapter => {
	return async (dispatch, getState) => {
		dispatch(chapterActions.chapter_create_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.post(api.chapterCreate, chapter, config);
			dispatch(chapterActions.chapter_create_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(chapterActions.chapter_create_fail(payload));
		}
		setTimeout(() => dispatch(chapterActions.chapter_create_reset()),3000);
	}
}


export const updateChapter = chapter => {
	return async (dispatch, getState) => {
		dispatch(chapterActions.chapter_update_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.put(api.chapterUpdate, chapter, config);
			dispatch(chapterActions.chapter_update_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(chapterActions.chapter_update_fail(payload));
		}
		setTimeout(() => dispatch(chapterActions.chapter_update_reset()),3000);
	}
}


export const deleteChapter = id => {
	return async (dispatch, getState) => {
		dispatch(chapterActions.chapter_delete_request());
		try {
			const config = createConfig(getState);
			await axios.delete(api.chapterDelete(id), config);
			dispatch(chapterActions.chapter_delete_success());
		} catch (error) {
			const payload = createPayload(error);
			dispatch(chapterActions.chapter_delete_fail(payload));
		}
		setTimeout(() => dispatch(chapterActions.chapter_delete_reset()),3000);
	}
}
