import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	userProfile: {profile: null},
	updateProfile: {},
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		profile_request(state) {state.userProfile.loading = true;},
		profile_success(state, action) {
			state.userProfile.loading = false;
			state.userProfile.profile = action.payload;
		},
		profile_fail(state, action) {
			state.userProfile.loading = false;
			state.userProfile.error = action.payload;
		},
		update_request(state) {state.updateProfile.loading = true;},
		update_success(state) {
			state.updateProfile.loading = false;
			state.updateProfile.success = true;
		},
		update_fail(state, action) {
			state.updateProfile.loading = false;
			state.updateProfile.error = action.payload;
		},
		update_reset(state) {state.updateProfile = {}}
	}
});

export const userActions = userSlice.actions;
export default userSlice;
