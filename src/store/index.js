import {configureStore} from "@reduxjs/toolkit";
import coursesSlice from "./courses-slice";
import authSlice from "./auth-slice";

const store = configureStore({
	reducer: {
		courses: coursesSlice.reducer,
		auth: authSlice.reducer,
	}
});

export default store;
