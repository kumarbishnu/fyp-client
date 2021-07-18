import {createSlice} from "@reduxjs/toolkit";

const coursesSlice = createSlice({
	name: 'courses',
	initialState: {courses: []},
	reducers: {
		get_all(state, action) {
			state.courses = action.payload;
		},
	}
});

export const courseActions = coursesSlice.actions;
export default coursesSlice;
