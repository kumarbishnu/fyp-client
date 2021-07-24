import DashboardLayout from "../../components/layout/dashboard-layout";
import {useDispatch, useSelector} from "react-redux";
import {get_profile, update_profile} from "../../store/user/user-actions";
import {Card, Col, Row, Form, Button, ToggleButtonGroup, ToggleButton} from "react-bootstrap";
import {useEffect, useState} from "react";
import Notification from "../../components/ui/notification";

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
	const [image, setImage] = useState('');
	const [imageFile, setImageFile] = useState('');

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
			setImage(profile.image);
		}
	}, [dispatch, profile])


	const submitHandler = event => {
		event.preventDefault();

		dispatch(update_profile({name, email, phone, address, gender, dob}, imageFile));
	}

	const changeImage = event => {
		let img = event.target.files[0];
		let url = URL.createObjectURL(img);
		setImageFile(img);
		setImage(url);
	}

	return <DashboardLayout>
		<h4>Profile</h4>
		{loading && <p>Loading</p>}
		{error && <p>{error}</p>}
		{profile &&
			<Form className="mt-5 shadow p-5 justify-content-center" onSubmit={submitHandler}>
				<Row>
					<Col md={4} className="p-5">
						<Card.Img src={image ?  image : '/images/user.png'} className="rounded-circle border p-2" style={{aspectRatio: "1/1", objectFit: "cover"}} />
						<div className="mt-3">
							<label htmlFor="image">Upload New Image</label>
							<input type="file" id="image" className={`form-control mt-2`} onChange={changeImage}/>
						</div>
					</Col>
					<Col md={8} className="p-5">
						<div className="d-flex mb-4">
							<div className="form-floating flex-fill">
								<Form.Control type="text" id="name" placeholder="Full Name" required value={name} onChange={e => setName(e.target.value)} />
								<label htmlFor="name">Full Name</label>
							</div>
							<div className="mx-3" />
							<div className="form-floating flex-fill">
								<Form.Control type="email" id="email" placeholder="E-mail" required disabled value={email} />
								<label htmlFor="email">Email</label>
							</div>
						</div>
						<div className="d-flex mb-4">
							<div className="form-floating flex-fill">
								<Form.Control type="text" id="phone" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} />
								<label htmlFor="phone">Phone</label>
							</div>
							<div className="mx-3" />
							<div className="form-floating flex-fill">
								<Form.Control type="text" id="address" placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} />
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
								<Form.Control type="date" id="address" placeholder="Date of Birth" value={dob} onChange={e => setDob(e.target.value)} />
								<label htmlFor="address">Date of Birth</label>
							</div>
						</div>
						<div className="ms-auto">
							<Button variant="success" type="submit">Save Changes</Button>
						</div>
						{updating && <Notification variant="info" title="Info" message="Updating Profile" />}
						{updateError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
						{updated && <Notification variant="success" title="Success" message="Profile successfully updated!" />}
					</Col>
				</Row>
			</Form>
		}
	</DashboardLayout>
}

export default UserProfile;
