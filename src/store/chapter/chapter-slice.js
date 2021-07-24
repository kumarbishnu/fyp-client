import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	chapterCreate: {},
	chapterUpdate: {},
	chapterDelete: {},
}

const chapterSlice = createSlice({
	name: 'chapter',
	initialState,
	reducers: {
		chapter_create_reset(state) {state.chapterCreate = {}},
		chapter_create_request(state) {state.chapterCreate = {loading: true}},
		chapter_create_success(state, action) {state.chapterCreate = {chapter: action.payload}},
		chapter_create_fail(state, action) {state.chapterCreate = {error: action.payload}},

		chapter_update_reset(state) {state.chapterUpdate = {}},
		chapter_update_request(state) {state.chapterUpdate = {loading: true}},
		chapter_update_success(state, action) {state.chapterUpdate = {chapter: action.payload}},
		chapter_update_fail(state, action) {state.chapterUpdate = {error: action.payload}},

		chapter_delete_reset(state) {state.chapterDelete = {}},
		chapter_delete_request(state) {state.chapterDelete = {loading: true}},
		chapter_delete_success(state) {state.chapterDelete = {success: true}},
		chapter_delete_fail(state, action) {state.chapterDelete = {error: action.payload}},
	}
})

export const chapterActions = chapterSlice.actions;
export default chapterSlice;
