import {configureStore} from "@reduxjs/toolkit";
import coursesSlice from "./courses-slice";
import authSlice from "./auth-slice";
import userSlice from "./user-slice";

const store = configureStore({
	reducer: {
		courses: coursesSlice.reducer,
		auth: authSlice.reducer,
		user: userSlice.reducer,
	}
});

export default store;
