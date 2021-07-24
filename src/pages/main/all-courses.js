import MainLayout from "../../components/layout/main-layout";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import {useEffect} from "react";
import CourseList from "../../components/course-list";
import {fetchCourses} from "../../store/course/course-actions";
import SearchBox from "../../components/searchbox";
import {useHistory} from "react-router-dom";

const AllCourses = () => {

	const dispatch = useDispatch();
	const history = useHistory();

	const courses = useSelector(state => state.courses.courses);

	useEffect(() => {
		const query = history.location.search;
		dispatch(fetchCourses(query));
	}, [dispatch, history.location.search])

	return <MainLayout>
		<Container>
			<div className="mt-5 w-50 mx-auto">
				<SearchBox />
			</div>
			<h2 className="my-5">All Courses</h2>
			<CourseList courses={courses} />
		</Container>
	</MainLayout>

}

export default AllCourses;
