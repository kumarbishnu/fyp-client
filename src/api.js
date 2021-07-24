const api_url = '/api';
const user_api = `${api_url}/user`;
const course_api = `${api_url}/courses`;

const api = {
	login: `${user_api}/login/`,
	register: `${user_api}/register/`,

	profile: `${user_api}/profile/`,
	profileUpdate: `${user_api}/profile/update/`,
	profileUpload: `${user_api}/profile/upload/`,
	userCourses: `${user_api}/courses/`,

	categories: `${api_url}/categories/`,

	courses: `${course_api}/`,
	courseById: id => `${course_api}/${id}`,
	courseContent: id => `${course_api}/${id}/content/`,

	courseCreate: `${course_api}/create/`,
	courseDelete: id => `${course_api}/delete/${id}`,
	courseUpdate: `${course_api}/update/`,
	courseUpload: `${course_api}/upload/`,

	chapterCreate: `${course_api}/chapter/create/`,
	chapterDelete: id => `${course_api}/chapter/delete/${id}`,
	chapterUpdate: `${course_api}/chapter/update/`,

	lectureCreate: `${course_api}/lecture/create/`,
	lectureDelete: id => `${course_api}/lecture/delete/${id}`,
	lectureUpdate: `${course_api}/lecture/update/`,
	lectureUpload: `${course_api}/lecture/upload/`,

	resourceCreate: `${course_api}/resource/create/`,
	resourceDelete: id => `${course_api}/resource/delete/${id}`,
	resourceUpdate: `${course_api}/resource/update/`,

	enroll: id =>`${course_api}/${id}/enroll/`,
}

export default api;
