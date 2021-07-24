import {Alert, Button, Card, Col, Form, Modal, Row, Spinner} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {deleteCourse, fetchCategories, updateCourse} from "../../store/course/course-actions";
import Notification from "../ui/notification";
import {useHistory} from "react-router-dom";

const EditCourse = props => {

	const dispatch = useDispatch();
	const history = useHistory();
	const categories = useSelector(state => state.courses.categories);

	const courseUpdate = useSelector(state => state.courses.courseUpdate);
	const {course: updateSuccess, loading: updateLoading, error: updateError} = courseUpdate;

	const imageUpload = useSelector(state => state.courses.imageUpload);
	const {image: uploadSuccess, loading: uploadLoading, error: uploadError} = imageUpload;

	const courseDelete = useSelector(state => state.courses.courseDelete);
	const {success: deleteSuccess, loading: deleteLoading, error: deleteError} = courseDelete;

	const [show, setShow] = useState(false);
	const [title, setTitle] = useState();
	const [description, setDescription] = useState();
	const [category, setCategory] = useState();
	const [level, setLevel] = useState();
	const [image, setImage] = useState();
	const [imageFile, setImageFile] = useState();
	const [validity, setValidity] = useState({
		titleIsInvalid: false,
		categoryIsInvalid: false,
		levelIsInvalid: false,
		formIsInvalid: false,
	})

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch])

	useEffect(() => {
		const {course} = props;
		setTitle(course.title);
		setDescription(course.description);
		setCategory(course.category_id);
		setLevel(course.level);
		setImage(course.image);
	}, [props])

	const changeImage = event => {
		let img = event.target.files[0];
		let url = URL.createObjectURL(img);
		setImageFile(img);
		setImage(url);
	}

	const submitHandler = event => {
		event.preventDefault();

		let titleIsInvalid = false;
		let categoryIsInvalid = false;
		let levelIsInvalid = false;
		let formIsInvalid = false;

		if (!title) {titleIsInvalid = true}
		if (category === "-1") {categoryIsInvalid = true}
		if (level === "-1") {levelIsInvalid = true}
		if (titleIsInvalid || categoryIsInvalid || levelIsInvalid) {
			formIsInvalid = true;
		} else {
			dispatch(updateCourse({id: props.course.id, title, description, category, level}, imageFile));
		}
		setValidity({titleIsInvalid, categoryIsInvalid, levelIsInvalid, formIsInvalid});
		setImageFile(null);
	}

	const showHandler = () => setShow(true);
	const hideHandler = () => setShow(false);
	const deleteHandler = () => {
		dispatch(deleteCourse(props.course.id));
	}
	const redirectHandler = () => history.replace('/dashboard/courses');
	const deleteModal = <Modal show={show} onHide={hideHandler} centered>
		<Modal.Body>
			<Modal.Title>{deleteSuccess ? 'Course Deleted!' : 'Are you sure you want to delete this course?'}</Modal.Title>
		</Modal.Body>
		{deleteSuccess
			? <Modal.Footer>
				<Button variant="secondary" onClick={redirectHandler}>Okay</Button>
			</Modal.Footer>
			: <Modal.Footer>
				<Button variant="danger" onClick={hideHandler}>Cancel</Button>
				<Button variant="success" onClick={deleteHandler}>Delete {deleteLoading && <Spinner animation="border" size="sm"/> }</Button>
				{deleteError && <Alert variant="danger">Something went wrong!</Alert>}
			</Modal.Footer>
		}
	</Modal>

	return <Form className="p-5 shadow rounded" onSubmit={submitHandler}>
		{deleteModal}
		{updateLoading && <Notification variant="info" title="Info" message="Updating Course..." />}
		{uploadLoading && <Notification variant="info" title="Info" message="Uploading Image..." />}
		{uploadError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{uploadSuccess && <Notification variant="success" title="Success" message="Image Uploaded!" />}
		{updateError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{updateSuccess && <Notification variant="success" title="Success" message="Course Updated!" />}
		<Row>
			<Col md={4}>
				<Card.Img src={image} style={{aspectRatio: "16/10", objectFit: "cover"}} />
				<div className="mt-3">
					<label htmlFor="image">Upload New Image</label>
					<input type="file" id="image" className={`form-control mt-2`} onChange={changeImage}/>
				</div>
			</Col>
			<Col md={8}>
				<div className="form-floating mb-3">
					<Form.Control type="text" id="title" placeholder="Title" required value={title} onChange={e => setTitle(e.target.value)} isInvalid={validity.titleIsInvalid} />
					<label htmlFor="title">Title</label>
				</div>
				<div className="form-floating mb-3">
					<Form.Control as="textarea" style={{height: "8rem"}} id="description" placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} />
					<label htmlFor="description">Description</label>
				</div>
				<div className="form-floating mb-3">
					<select name="category" id="category" className={`form-select ${validity.categoryIsInvalid && 'is-invalid'}`} value={category} onChange={e => setCategory(e.target.value)}>
						<option value="-1">Select Category</option>
						{categories.map(category =>
							<option key={category.id} value={category.id}>{category.name}</option>
						)}
					</select>
					<label htmlFor="level">Category</label>
				</div>
				<div className="form-floating mb-3">
					<select name="level" id="level" className={`form-select ${validity.levelIsInvalid && 'is-invalid'}`} value={level} onChange={e => setLevel(e.target.value)}>
						<option value="-1">Select Level</option>
						<option value="All Levels">All Levels</option>
						<option value="Beginner">Beginner</option>
						<option value="Intermediate">Intermediate</option>
						<option value="Advanced">Advanced</option>
					</select>
					<label htmlFor="level">Level</label>
				</div>
				<div className="text-end">
					<Button variant="danger" className="me-3" onClick={showHandler}>Delete Course</Button>
					<Button variant="success" type="submit">Update Course</Button>
				</div>
			</Col>
		</Row>
	</Form>
}

export default EditCourse;
