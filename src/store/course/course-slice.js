import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	courses: [],
	courseDetails: {},
	categories: [],
	courseCreate: {},
	imageUpload: {},
}

const courseSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		get_all(state, action) {state.courses = action.payload},
		get_course(state, action) {state.courseDetails.course = action.payload},
		get_course_error(state, action) {state.courseDetails.error = action.payload},
		set_categories(state, action) {state.categories = action.payload},
		course_create_reset(state) {state.courseCreate = {}},
		course_create_request(state) {state.courseCreate = {loading: true}},
		course_create_fail(state, action) {state.courseCreate = {error: action.payload}},
		course_create_success(state, action) {state.courseCreate = {course: action.payload}},
		image_upload_reset(state) {state.imageUpload = {}},
		image_upload_request(state) {state.imageUpload = {loading: true}},
		image_upload_fail(state, action) {state.imageUpload = {error: action.payload}},
		image_upload_success(state, action) {state.imageUpload = {image: action.payload}},
		// image_update(state, action)
	}
});

export const courseActions = courseSlice.actions;
export default courseSlice;
