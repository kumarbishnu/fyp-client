import DashboardLayout from "../../components/layout/dashboard-layout";
import {Link, Route} from "react-router-dom";
import AddCourse from "../add-course";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {fetchUserCourses} from "../../store/user/user-actions";
import TutorCourses from "../../components/dashboard/tutor-courses";

const UserCourses = () => {

	const dispatch = useDispatch();
	const courses = useSelector(state => state.user.courses);

	useEffect(() => {
		dispatch(fetchUserCourses());
	}, [dispatch])

	return <DashboardLayout>
		<div className="d-flex mb-4 justify-content-between">
			<h4>User Courses</h4>
			<Link to="/dashboard/courses/add/" className="btn btn-success"><i className="fas fa-plus me-2" />Create Course</Link>
		</div>
		<Route path="/dashboard/courses/add" component={AddCourse} />
		<TutorCourses courses={courses} />
	</DashboardLayout>
}

export default UserCourses;
