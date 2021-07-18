import MainLayout from "../components/layout/main-layout";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import {useEffect} from "react";
import CourseList from "../components/course-list";
import {fetchCourses} from "../store/course-actions";

const AllCourses = () => {

	const dispatch = useDispatch();
	const courses = useSelector(state => state.courses.courses);

	useEffect(() => {
		dispatch(fetchCourses());
	}, [dispatch])

	return <MainLayout>
		<Container>
			<h2 className="my-5">All Courses</h2>
			<CourseList courses={courses} />
		</Container>
	</MainLayout>

}

export default AllCourses;
