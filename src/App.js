import {BrowserRouter as Router, Route} from "react-router-dom";
import AllCourses from "./pages/main/all-courses";
import ContactPage from "./pages/main/contact-page";
import CoursePage from "./pages/main/course-page";
import Dashboard from "./pages/dashboard/dashboard";
import Homepage from "./pages/main/homepage";
import LoginPage from "./pages/auth/login-page";
import RegisterPage from "./pages/auth/register-page";
import UserProfile from "./pages/dashboard/user-profile";
import UserCourses from "./pages/dashboard/user-courses";
import TutorCoursePage from "./pages/dashboard/tutor-course-page";

const App = () => {
	return <Router>
		<Route path="/" component={Homepage} exact />
		<Route path="/courses" component={AllCourses} exact />
		<Route path="/courses/:id" component={CoursePage} exact />
		<Route path="/dashboard" component={Dashboard} exact />
		<Route path="/dashboard/courses" component={UserCourses} exact />
		<Route path="/dashboard/courses/:id" component={TutorCoursePage} />
		<Route path="/dashboard/profile" component={UserProfile} />
		<Route path="/login" component={LoginPage} />
		<Route path="/register" component={RegisterPage} />
		<Route path="/contact" component={ContactPage} />
	</Router>
}

export default App;
