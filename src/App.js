import {BrowserRouter as Router, Route} from "react-router-dom";
import AllCourses from "./pages/all-courses";
import ContactPage from "./pages/contact-page";
import CoursePage from "./pages/course-page";
import Dashboard from "./pages/dashboard";
import Homepage from "./pages/homepage";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import UserProfile from "./pages/user-profile";
import UserCourses from "./pages/user-courses";

const App = () => {
	return <Router>
		<Route path="/" component={Homepage} exact />
		<Route path="/courses" component={AllCourses} exact />
		<Route path="/courses/:id" component={CoursePage} exact />
		<Route path="/dashboard" component={Dashboard} exact />
		<Route path="/dashboard/courses" component={UserCourses} />
		<Route path="/dashboard/profile" component={UserProfile} />
		<Route path="/login" component={LoginPage} />
		<Route path="/register" component={RegisterPage} />
		<Route path="/contact" component={ContactPage} />
	</Router>
}

export default App;
