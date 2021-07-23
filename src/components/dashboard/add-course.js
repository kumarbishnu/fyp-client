import {Alert, Button, Form, Modal} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import {fetchCategories, pushCourse} from "../../store/course/course-actions";
import Notification from "../ui/notification";
import {useHistory} from "react-router-dom";

const AddCourse = ({show, onClose}) => {

	const history = useHistory();
	const dispatch = useDispatch();
	const categories = useSelector(state => state.courses.categories);

	const courseCreate = useSelector(state => state.courses.courseCreate);
	const {course: createSuccess, loading: createLoading, error: createError} = courseCreate;

	const imageUpload = useSelector(state => state.courses.imageUpload);
	const {image: uploadSuccess, loading: uploadLoading, error: uploadError} = imageUpload;

	const titleRef = useRef();
	const descriptionRef = useRef();
	const categoryRef = useRef();
	const levelRef = useRef();
	const imageRef = useRef();

	const [validity, setValidity] = useState({
		titleIsInvalid: false,
		categoryIsInvalid: false,
		levelIsInvalid: false,
		imageIsInvalid: false,
		formIsInvalid: false,
	})

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch])

	const submitHandler = event => {
		event.preventDefault();

		const title = titleRef.current.value;
		const description = descriptionRef.current.value;
		const category = categoryRef.current.value;
		const level = levelRef.current.value;
		const image = imageRef.current.files[0];

		let titleIsInvalid = false;
		let categoryIsInvalid = false;
		let levelIsInvalid = false;
		let imageIsInvalid = false;
		let formIsInvalid = false;

		if (!title) {titleIsInvalid = true}
		if (category === "-1") {categoryIsInvalid = true}
		if (level === "-1") {levelIsInvalid = true}
		if (!image) {imageIsInvalid = true}
		if (titleIsInvalid || categoryIsInvalid || levelIsInvalid || imageIsInvalid) {
			formIsInvalid = true;
		} else {
			dispatch(pushCourse({title, description, category, level}, image));
		}
		setValidity({titleIsInvalid, categoryIsInvalid, levelIsInvalid, imageIsInvalid, formIsInvalid})
	};

	useEffect(() => {
		if (createSuccess && uploadSuccess) {history.push(`/dashboard/courses/${createSuccess.id}`)}
	}, [createSuccess, uploadSuccess, history])

	return <Modal show={show} onHide={onClose}>
		{createLoading && <Notification variant="info" title="Info" message="Creating Course..." />}
		{uploadLoading && <Notification variant="info" title="Info" message="Uploading Image..." />}
		{uploadError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{uploadSuccess && <Notification variant="success" title="Success" message="Image Uploaded!" />}
		{createError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{createSuccess && <Notification variant="success" title="Success" message="Course Created!" />}
		<Modal.Body className="p-5">
			<h4>Create New Course</h4>
			<Form onSubmit={submitHandler} className="mt-4">
				<div className="form-floating mb-3">
					<Form.Control type="text" id="title" placeholder="Title" required ref={titleRef} isInvalid={validity.titleIsInvalid} />
					<label htmlFor="title">Title</label>
				</div>
				<div className="form-floating mb-3">
					<Form.Control as="textarea" style={{height: "8rem"}} id="description" placeholder="Description" ref={descriptionRef} />
					<label htmlFor="description">Description</label>
				</div>
				<div className="form-floating mb-3">
					<select name="category" id="category" className={`form-select ${validity.categoryIsInvalid && 'is-invalid'}`} ref={categoryRef}>
						<option value="-1">Select Category</option>
						{categories.map(category =>
							<option key={category.id} value={category.id}>{category.name}</option>
						)}
					</select>
					<label htmlFor="level">Category</label>
				</div>
				<div className="form-floating mb-3">
					<select name="level" id="level" className={`form-select ${validity.levelIsInvalid && 'is-invalid'}`} ref={levelRef}>
						<option value="-1">Select Level</option>
						<option value="All Levels">All Levels</option>
						<option value="Beginner">Beginner</option>
						<option value="Intermediate">Intermediate</option>
						<option value="Advanced">Advanced</option>
					</select>
					<label htmlFor="level">Level</label>
				</div>
				<div className="mb-3">
					<label htmlFor="image">Image</label>
					<input type="file" id="image" className={`form-control ${validity.imageIsInvalid && 'is-invalid'} mt-1`} ref={imageRef}/>
				</div>
				<div className="text-end">
					<Button type="submit" variant="danger" onClick={onClose}>Cancel</Button>
					<Button type="submit" variant="success" className="ms-2">Create</Button>
				</div>
				{validity.formIsInvalid && <Alert variant="danger" className="mt-3">Highlighted fields are required</Alert> }
			</Form>
		</Modal.Body>
	</Modal>
}

export default AddCourse;
