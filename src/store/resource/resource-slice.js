import {createSlice} from "@reduxjs/toolkit";

const initialState = {
	resourceCreate: {},
	resourceUpdate: {},
	resourceDelete: {},
}

const resourceSlice = createSlice({
	name: 'resource',
	initialState,
	reducers: {
		resource_create_reset(state) {state.resourceCreate = {}},
		resource_create_request(state) {state.resourceCreate = {loading: true}},
		resource_create_success(state, action) {state.resourceCreate = {resource: action.payload}},
		resource_create_fail(state, action) {state.resourceCreate = {error: action.payload}},

		resource_update_reset(state) {state.resourceUpdate = {}},
		resource_update_request(state) {state.resourceUpdate = {loading: true}},
		resource_update_success(state, action) {state.resourceUpdate = {resource: action.payload}},
		resource_update_fail(state, action) {state.resourceUpdate = {error: action.payload}},


		resource_delete_reset(state) {state.resourceDelete = {}},
		resource_delete_request(state) {state.resourceDelete = {loading: true}},
		resource_delete_success(state, action) {state.resourceDelete = {resource: action.payload}},
		resource_delete_fail(state, action) {state.resourceDelete = {error: action.payload}},
	}
})

export const resourceActions = resourceSlice.actions;
export default resourceSlice;
