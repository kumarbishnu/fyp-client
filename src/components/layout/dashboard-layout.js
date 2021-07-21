import Sidebar from "../sidebar";
import SidebarNav from "../sidebar-nav";
import {useDispatch, useSelector} from "react-redux";
import {get_profile} from "../../store/user-actions";
import {Fragment} from "react";
import {Container} from "react-bootstrap";

const DashboardLayout = props => {

	const dispatch = useDispatch();
	const userInfo = useSelector(state => state.auth.userInfo);
	const userProfile = useSelector(state => state.user.userProfile);

	if (!userInfo) {
		props.history.replace('/login');
		return <p>Redirecting...</p>
	}

	const {loading, error, profile} = userProfile;
	if (!profile) {
		dispatch(get_profile());
	}
	return <div className="vh-100 d-flex" style={{maxWidth: "100vw", maxHeight: "100vh"}}>
		{profile && <Fragment>
			<Sidebar user={profile} />
			<div className="w-100">
				<SidebarNav image={profile.image} />
				<Container>
					{props.children}
				</Container>
			</div>
		</Fragment>}
	</div>
}

export default DashboardLayout;
