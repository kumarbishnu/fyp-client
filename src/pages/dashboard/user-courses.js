import DashboardLayout from "../../components/layout/dashboard-layout";
import AddCourse from "../../components/dashboard/add-course";
import {useDispatch, useSelector} from "react-redux";
import {Fragment, useEffect, useState} from "react";
import {fetchUserCourses} from "../../store/user/user-actions";
import TutorCourses from "../../components/dashboard/tutor-courses";
import {Button} from "react-bootstrap";
import StudentCourses from "../../components/dashboard/student-courses";

const UserCourses = () => {

	const dispatch = useDispatch();
	const user = useSelector(state => state.auth.userInfo);
	const courses = useSelector(state => state.user.courses);

	// const [user, setUser] = useState({});

	const [showAddCourse, setShowAddCourse] = useState(false);
	const handleShow = () => {setShowAddCourse(true)}
	const handleClose = () => {setShowAddCourse(false)}

	useEffect(() => {
		dispatch(fetchUserCourses());
	}, [dispatch])

	const tutorContent = <DashboardLayout>
		<div className="d-flex mb-4 justify-content-between">
			<h4>Created Courses</h4>
			<Button variant="success" onClick={handleShow}><i className="fas fa-plus me-2" />Create Course</Button>
		</div>
		<TutorCourses courses={courses} />
		<AddCourse show={showAddCourse} onClose={handleClose} />
	</DashboardLayout>

	const studentContent = <DashboardLayout>
		<div className="mb-4">
			<h4>Enrolled Courses</h4>
		</div>
		<StudentCourses courses={courses} />
	</DashboardLayout>

	return <Fragment>
		{user && user.is_tutor && tutorContent}
		{user && !user.is_tutor && studentContent}
	</Fragment>
}

export default UserCourses;
