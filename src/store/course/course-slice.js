import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	courses: [],
	courseDetails: {course: {}},
	categories: [],
	courseCreate: {},
	imageUpload: {},
	courseContent: {course: {}},
	courseUpdate: {},
	courseDelete: {},
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

		course_content_success(state, action) {state.courseContent.course = action.payload},

		course_update_reset(state) {state.courseUpdate = {}},
		course_update_request(state) {state.courseUpdate = {loading: true}},
		course_update_fail(state, action) {state.courseUpdate = {error: action.payload}},
		course_update_success(state, action) {state.courseUpdate = {course: action.payload}},

		course_delete_reset(state) {state.courseDelete = {}},
		course_delete_request(state) {state.courseDelete = {loading: true}},
		course_delete_fail(state, action) {state.courseDelete = {error: action.payload}},
		course_delete_success(state) {state.courseDelete = {success: true}},
	}
});

export const courseActions = courseSlice.actions;
export default courseSlice;
