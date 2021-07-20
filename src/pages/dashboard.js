import DashboardLayout from "../components/layout/dashboard-layout";
import {useSelector} from "react-redux";

const Dashboard = props => {

	const userInfo = useSelector(state => state.auth.userInfo);
	if (!userInfo) {
		props.history.replace('/login');
		return <p>Redirecting...</p>
	}

	return <DashboardLayout user={userInfo}>Dashboard</DashboardLayout>
}

export default Dashboard;
