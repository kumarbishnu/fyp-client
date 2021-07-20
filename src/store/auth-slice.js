import {createSlice} from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("userInfo");
const initialUserState = {
	userInfo: userInfo ? JSON.parse(userInfo) : null,
	userLogin: {loading: false, error: null},
}

const authSlice = createSlice({
	name: 'authentication',
	initialState: initialUserState,
	reducers: {
		login_request(state) {
			state.userLogin.loading = true;
		},
		login_success(state, action) {
			state.userInfo = action.payload;
			state.userLogin.loading = false;
			localStorage.setItem("userInfo", JSON.stringify(action.payload));
		},
		login_fail(state, action) {
			state.userLogin.loading = false;
			state.userLogin.error = action.payload;
		},
		logout(state) {
			state.userInfo = null;
			localStorage.clear();
		},
	}
});

export const authActions = authSlice.actions;
export default authSlice;
