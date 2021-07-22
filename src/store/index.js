import {configureStore} from "@reduxjs/toolkit";
import courseSlice from "./course/course-slice";
import authSlice from "./auth/auth-slice";
import userSlice from "./user/user-slice";

const store = configureStore({
	reducer: {
		courses: courseSlice.reducer,
		auth: authSlice.reducer,
		user: userSlice.reducer,
	}
});

export default store;
