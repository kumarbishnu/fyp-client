import {createSlice} from "@reduxjs/toolkit";

const userInfo = localStorage.getItem("userInfo");
const initialUserState = {
	userInfo: userInfo ? JSON.parse(userInfo) : null,
	userLogin: {loading: false, error: null},
	userRegister: {loading: false, error: null},
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
		register_request(state) {state.userRegister.loading = true;},
		register_success(state) {state.userRegister.loading = false;},
		register_fail(state, action) {
			state.userRegister.loading = false;
			state.userRegister.error = action.payload;
		}
	}
});

export const authActions = authSlice.actions;
export default authSlice;
