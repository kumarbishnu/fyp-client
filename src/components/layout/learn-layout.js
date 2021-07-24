import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import LearnNav from "../learn/learn-nav";
import {Fragment} from "react";

const LearnLayout = props => {

	const dispatch = useDispatch();
	const history = useHistory();

	const userInfo = useSelector(state => state.auth.userInfo);

	if (!userInfo) {
		history.replace('/login');
		return <p>Redirecting...</p>
	}

	return <Fragment>
		<LearnNav title={props.title} />
		{props.children}
	</Fragment>

}

export default LearnLayout;
