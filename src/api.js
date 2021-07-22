const api_url = '/api';
const user_api = `${api_url}/user`;
const course_api = `${api_url}/courses`;

const api = {
	login: `${user_api}/login/`,
	register: `${user_api}/register/`,

	profile: `${user_api}/profile/`,
	profileUpdate: `${user_api}/profile/update/`,
	userCourses: `${user_api}/courses/`,

	categories: `${api_url}/categories/`,

	courses: `${course_api}/`,

	courseCreate: `${course_api}/create/`,
	courseDelete: `${course_api}/delete/`,
	courseUpdate: `${course_api}/update/`,
	courseUpload: `${course_api}/upload/`,
}

export default api;
