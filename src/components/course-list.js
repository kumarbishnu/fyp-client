import CourseItem from "./course-item";

const CourseList = props => {
	return <div className="row">
		{props.courses.map(course =>
			<CourseItem key={course.id} course={course} />
		)}
	</div>
}

export default CourseList;
