import DashboardLayout from "../../components/layout/dashboard-layout";
import AddCourse from "../../components/dashboard/add-course";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {fetchUserCourses} from "../../store/user/user-actions";
import TutorCourses from "../../components/dashboard/tutor-courses";
import {Button} from "react-bootstrap";

const UserCourses = () => {

	const dispatch = useDispatch();
	const courses = useSelector(state => state.user.courses);

	const [showAddCourse, setShowAddCourse] = useState(false);
	const handleShow = () => {setShowAddCourse(true)}
	const handleClose = () => {setShowAddCourse(false)}

	useEffect(() => {
		dispatch(fetchUserCourses());
	}, [dispatch])

	return <DashboardLayout>
		<div className="d-flex mb-4 justify-content-between">
			<h4>User Courses</h4>
			<Button variant="success" onClick={handleShow}><i className="fas fa-plus me-2" />Create Course</Button>
		</div>
		<TutorCourses courses={courses} />
		<AddCourse show={showAddCourse} onClose={handleClose} />
	</DashboardLayout>
}

export default UserCourses;
