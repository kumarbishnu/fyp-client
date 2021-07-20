import Sidebar from "../sidebar";
import SidebarNav from "../sidebar-nav";

const DashboardLayout = props => {
	return <div className="vh-100 d-flex" style={{maxWidth: "100vw", maxHeight: "100vh"}}>
		<Sidebar user={props.user} />
		<div className="p-3 w-100">
			<SidebarNav />
			<h2>Dashboard</h2>
			{props.children}
		</div>
	</div>
}

export default DashboardLayout;
