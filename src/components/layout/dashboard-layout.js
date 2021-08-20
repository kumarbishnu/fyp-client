import Sidebar from "../dashboard/sidebar";
import DashboardNav from "../dashboard/dashboard-nav";
import {useDispatch, useSelector} from "react-redux";
import {get_profile} from "../../store/user/user-actions";
import {Fragment, useEffect} from "react";
import {Container} from "react-bootstrap";
import {useHistory} from "react-router-dom";
import {authActions} from "../../store/auth/auth-slice";
import {userActions} from "../../store/user/user-slice";

const DashboardLayout = props => {

	const dispatch = useDispatch();
	const history = useHistory();

	const userInfo = useSelector(state => state.auth.userInfo);
	const userProfile = useSelector(state => state.user.userProfile);
	const {profile} = userProfile;

	useEffect(() => {
		dispatch(get_profile())
	}, [dispatch])

	if (!userInfo) {
		history.replace('/login');
		return <p>Redirecting...</p>
	}

	const logoutHandler = () => {
		dispatch(authActions.logout());
		dispatch(userActions.profile_reset());
		history.push('/');
	}

	return <div className="vh-100 d-flex" style={{maxWidth: "100vw", maxHeight: "100vh"}}>
		{profile && <Fragment>
			<Sidebar user={profile} onLogout={logoutHandler} />
			<div className="ms-auto pb-5" style={{width: "85%"}}>
				<DashboardNav image={profile.image} onLogout={logoutHandler} />
				<Container>
					{props.children}
				</Container>
			</div>
		</Fragment>}
	</div>
}

export default DashboardLayout;
