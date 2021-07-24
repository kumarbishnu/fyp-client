import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	userProfile: {profile: null},
	updateProfile: {},
	courses: [],
	imageUpload: {},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		profile_reset(state) {state.userProfile.profile = null},
		profile_request(state) {state.userProfile.loading = true},
		profile_success(state, action) {state.userProfile = {profile: action.payload}},
		profile_fail(state, action) {state.userProfile = {profile: null, error: action.payload}},

		update_request(state) {state.updateProfile.loading = true;},
		update_success(state) {
			state.updateProfile.loading = false;
			state.updateProfile.success = true;
		},
		update_fail(state, action) {
			state.updateProfile.loading = false;
			state.updateProfile.error = action.payload;
		},
		update_reset(state) {state.updateProfile = {}},
		get_courses(state, action) {state.courses = action.payload},


		image_upload_reset(state) {state.imageUpload = {}},
		image_upload_request(state) {state.imageUpload = {loading: true}},
		image_upload_fail(state, action) {state.imageUpload = {error: action.payload}},
		image_upload_success(state) {state.imageUpload = {success: true}},
	}
});

export const userActions = userSlice.actions;
export default userSlice;
