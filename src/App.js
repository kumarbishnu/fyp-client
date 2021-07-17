import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Homepage from "./pages/homepage";
import Dashboard from "./pages/dashboard";
import LoginPage from "./pages/login-page";
import RegisterPage from "./pages/register-page";
import AllCourses from "./pages/all-courses";

const App = () => {
	return <Router>
		<Route path="/" component={Homepage} exact />
		<Route path="/courses" component={AllCourses} exact />
		<Route path="/dashboard" component={Dashboard} />
		<Route path="/login" component={LoginPage} />
		<Route path="/register" component={RegisterPage} />
	</Router>
}

export default App;
