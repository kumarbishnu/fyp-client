import {configureStore} from "@reduxjs/toolkit";
import courseSlice from "./course/course-slice";
import authSlice from "./auth/auth-slice";
import userSlice from "./user/user-slice";
import chapterSlice from "./chapter/chapter-slice";
import lectureSlice from "./lecture/lecture-slice";
import resourceSlice from "./resource/resource-slice";

const store = configureStore({
	reducer: {
		courses: courseSlice.reducer,
		auth: authSlice.reducer,
		user: userSlice.reducer,
		chapter: chapterSlice.reducer,
		lecture: lectureSlice.reducer,
		resource: resourceSlice.reducer,
	}
});

export default store;
