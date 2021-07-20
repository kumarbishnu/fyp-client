export const url = 'http://127.0.0.1:8000';
const api_url = url + '/api';

const api = {
	categories: `${api_url}/categories/`,
	courses: `${api_url}/courses/`,
	login: `${api_url}/user/login/`,
}

export default api;
