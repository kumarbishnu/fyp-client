import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	courses: [],
	courseDetails: {},
}

const courseSlice = createSlice({
	name: 'courses',
	initialState,
	reducers: {
		get_all(state, action) {state.courses = action.payload;},
		get_course(state, action) {state.courseDetails.course = action.payload;},
		get_course_error(state, action) {state.courseDetails.error = action.payload;}
	}
});

export const courseActions = courseSlice.actions;
export default courseSlice;
