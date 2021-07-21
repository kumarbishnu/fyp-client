import DashboardLayout from "../components/layout/dashboard-layout";
import {useDispatch, useSelector} from "react-redux";
import {get_profile, update_profile} from "../store/user-actions";
import {Card, Col, Image, Row, Form, Button, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import {useEffect, useState} from "react";
import Notification from "../components/ui/notification";
import {userActions} from "../store/user-slice";

const UserProfile = () => {

	const dispatch = useDispatch();
	const userProfile = useSelector(state => state.user.userProfile);
	const {loading, error, profile} = userProfile;

	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [phone, setPhone] = useState('');
	const [address, setAddress] = useState('');
	const [gender, setGender] = useState('');
	const [dob, setDob] = useState('');

	const updateProfile = useSelector(state => state.user.updateProfile);
	const {loading: updating, error: updateError, success: updated} = updateProfile;

	useEffect(() => {
		if (!profile) {dispatch(get_profile())}
		else {
			setName(profile.name);
			setEmail(profile.email);
			setPhone(profile.phone);
			setAddress(profile.address);
			setGender(profile.gender);
			setDob(profile.dob);
		}
	}, [dispatch, profile])


	const submitHandler = event => {
		event.preventDefault();

		dispatch(update_profile({name, email, phone, address, gender, dob}));
	}

	return <DashboardLayout>
		<h4>Profile</h4>
		{loading && <p>Loading</p>}
		{error && <p>{error}</p>}
		{profile &&
			<div className="mt-5 justify-content-center">
				<Row>
					<Col md={4}>
						<Card border="0" className="shadow p-5 align-items-center justify-content-center" style={{minHeight: "400px"}}>
							<Image src={profile.image} className="rounded-circle border border-1 p-2" style={{width: "200px", height: "200px", objectFit: "cover"}} />
							Upload New Image
						</Card>
					</Col>
					<Col md={8}>
						<Form className="card border-0 shadow p-5" onSubmit={submitHandler}>
							<div className="d-flex mb-4">
								<div className="form-floating flex-fill">
									<Form.Control type="text" id="name" required value={name} onChange={e => setName(e.target.value)} />
									<label htmlFor="name">Full Name</label>
								</div>
								<div className="mx-3" />
								<div className="form-floating flex-fill">
									<Form.Control type="email" id="email" required disabled value={email} />
									<label htmlFor="email">Email</label>
								</div>
							</div>
							<div className="d-flex mb-4">
								<div className="form-floating flex-fill">
									<Form.Control type="text" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
									<label htmlFor="phone">Phone</label>
								</div>
								<div className="mx-3" />
								<div className="form-floating flex-fill">
									<Form.Control type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} />
									<label htmlFor="address">Address</label>
								</div>
							</div>
							<div className="d-flex mb-4">
								<div className="form-floating flex-fill">
									<ToggleButtonGroup name="role" type="radio" className="w-100 h-100 align-items-center" value={gender}>
										<ToggleButton variant="outline-secondary" value="Male" onChange={e => setGender(e.target.value)}>Male</ToggleButton>
										<ToggleButton variant="outline-secondary" value="Female" onChange={e => setGender(e.target.value)}>Female</ToggleButton>
									</ToggleButtonGroup>
								</div>
								<div className="mx-3" />
								<div className="form-floating flex-fill">
									<Form.Control type="date" id="address" value={dob} onChange={e => setDob(e.target.value)} />
									<label htmlFor="address">Address</label>
								</div>
							</div>
							<div className="ms-auto">
								<Button variant="success" type="submit">Save Changes</Button>
								{updating && <Notification variant="info" title="Info" message="Updating Profile" />}
								{updateError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
								{updated && <Notification variant="success" title="Success" message="Profile successfully updated!" />}
							</div>
						</Form>
					</Col>
				</Row>
			</div>
		}
	</DashboardLayout>
}

export default UserProfile;
