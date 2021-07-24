import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	lectureCreate: {},
	lectureUpdate: {},
	lectureDelete: {},
	lectureUpload: {},
}

const lectureSlice = createSlice({
	name: 'lecture',
	initialState,
	reducers: {
		lecture_create_reset(state) {state.lectureCreate = {}},
		lecture_create_request(state) {state.lectureCreate = {loading: true}},
		lecture_create_success(state, action) {state.lectureCreate = {lecture: action.payload}},
		lecture_create_fail(state, action) {state.lectureCreate = {error: action.payload}},

		lecture_update_reset(state) {state.lectureUpdate = {}},
		lecture_update_request(state) {state.lectureUpdate = {loading: true}},
		lecture_update_success(state, action) {state.lectureUpdate = {lecture: action.payload}},
		lecture_update_fail(state, action) {state.lectureUpdate = {error: action.payload}},

		lecture_upload_reset(state) {state.lectureUpload = {}},
		lecture_upload_request(state) {state.lectureUpload = {loading: true}},
		lecture_upload_success(state) {state.lectureUpload = {success: true}},
		lecture_upload_fail(state, action) {state.lectureUpload = {error: action.payload}},

		lecture_delete_reset(state) {state.lectureDelete = {}},
		lecture_delete_request(state) {state.lectureDelete = {loading: true}},
		lecture_delete_success(state) {state.lectureDelete = {success: true}},
		lecture_delete_fail(state, action) {state.lectureDelete = {error: action.payload}},
	}
})

export const lectureActions = lectureSlice.actions;
export default lectureSlice;
