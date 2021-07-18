import MainLayout from "../components/layout/main-layout";
import banner from "../assets/homepage-banner.png";
import {Card, Container} from "react-bootstrap";
import CourseList from "../components/course-list";
import courses from "../courses";
import {Link} from "react-router-dom";

const Homepage = () => {
	return <MainLayout>
		<Container>
			<Card className="border-0">
				<Card.Img src={banner} alt="" className=" img-fluid"/>
				<Card.ImgOverlay className="d-flex">
					<div className="align-self-center">
						<h1>Anytime, Anywhere,<br/>Learn on your schedule <br/>from any device.</h1>
						<blockquote className="blockquote">
							<p>We believe everyone has the capacity to be creative.<br/>CourseDeck is a place where people
								develop their <br/> own potential.</p>
						</blockquote>
					</div>
				</Card.ImgOverlay>
			</Card>
		</Container>
		<div className="bg-light mb-5">
		<Container className="py-5">
			<div className="d-flex justify-content-between align-items-center mb-5">
				<h2>Our Most Popular Courses</h2>
				<Link to="/courses" className="btn btn-outline-success" style={{fontWeight: "600"}}>View All Courses</Link>
			</div>
			<CourseList courses={courses} />
		</Container>
		</div>
		<Container className="p-5 bg-dark text-light rounded-3 w-50 d-flex justify-content-between align-items-center">
			<h2>Ready to Join...?</h2>
			<Link to="/register" className="btn btn-lg btn-success" style={{fontWeight: "600"}}>Register Now</Link>
		</Container>
	</MainLayout>
}

export default Homepage;
