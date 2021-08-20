import {resourceActions} from "./resource-slice";
import {createConfig, createPayload} from "../helpers";
import axios from "axios";
import api from "../../api";

export const createResource = resource => {
	return async (dispatch, getState) => {
		dispatch(resourceActions.resource_create_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.post(api.resourceCreate, resource, config);
			dispatch(resourceActions.resource_create_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(resourceActions.resource_create_fail(payload));
		}
		// setTimeout(() => dispatch(resourceActions.resource_create_reset()),3000);
	}
}

export const updateResource = resource => {
	return async (dispatch, getState) => {
		dispatch(resourceActions.resource_update_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.put(api.resourceCreate, resource, config);
			dispatch(resourceActions.resource_update_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(resourceActions.resource_update_fail(payload));
		}
		setTimeout(() => dispatch(resourceActions.resource_update_reset()),3000);
	}
}

export const deleteResource = id => {
	return async (dispatch, getState) => {
		dispatch(resourceActions.resource_delete_request);
		try {
			const config = createConfig(getState);
			const {data} = await axios.delete(api.resourceDelete(id), config);
			dispatch(resourceActions.resource_delete_success(data));
		} catch (error) {
			const payload = createPayload(error);
			dispatch(resourceActions.resource_delete_fail(payload));
		}
		setTimeout(() => dispatch(resourceActions.resource_delete_reset()),3000);
	}
}
