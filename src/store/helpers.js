export const createPayload = error => {
	return error.response && error.response.data.detail
		? error.response.data.detail
		: error.message;
}

export const createConfig = getState => {
	const {auth: {userInfo}} = getState();
	return {
		headers: {
			'Content-type': 'application/json',
			Authorization: `Bearer ${userInfo && userInfo.token}`,
		},
	}
}

export const createFormConfig = getState => {
	const {auth: {userInfo}} = getState();
	return {
		headers: {
			'Content-type': 'multipart/form-data',
			Authorization: `Bearer ${userInfo && userInfo.token}`,
		},
	}
}
