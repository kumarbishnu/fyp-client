import {Fragment} from "react";
import MainNav from "./main-nav";
import Footer from "./footer";

const MainLayout = props => {
	return <Fragment>
		<MainNav />
		{props.children}
		<Footer />
	</Fragment>
}

export default MainLayout;
