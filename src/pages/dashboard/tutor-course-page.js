import DashboardLayout from "../../components/layout/dashboard-layout";
import {useEffect, useState} from "react";
import {Tab, Tabs} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchCourseContent} from "../../store/course/course-actions";
import EditCourse from "../../components/dashboard/edit-course";
import EditCourseContent from "../../components/dashboard/edit-course-content";

const TutorCoursePage = ({match}) => {

	const dispatch = useDispatch();
	const courseContent = useSelector(state => state.courses.courseContent);
	const {course} = courseContent;

	const [courseDetails, setCourseDetails] = useState();

	useEffect(() => {
		dispatch(fetchCourseContent(match.params.id));
	}, [dispatch, match.params.id])

	useEffect(() => {
		const {chapters: x, ...y} = course;
		setCourseDetails(y);
	}, [course])

	return <DashboardLayout>
		<h4 className="mb-4">{course && course.title}</h4>
		<Tabs defaultActiveKey="overview" className="mb-3">
			<Tab title="Overview" eventKey="overview">
				{courseDetails && <EditCourse course={courseDetails} />}
			</Tab>
			<Tab title="Contents" eventKey="contents">
				{course && <EditCourseContent course={course} />}
			</Tab>
		</Tabs>
	</DashboardLayout>
}

export default TutorCoursePage;
