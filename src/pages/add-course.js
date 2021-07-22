import {Button, Form} from "react-bootstrap";

const AddCourse = () => {

	const submitHandler = event => {
		event.preventDefault();
	};

	return <Form onSubmit={submitHandler} className="card p-5 shadow">
		<div className="form-floating mb-3">
			<Form.Control type="text" id="title" placeholder="Title" required />
			<label htmlFor="title">Title</label>
		</div>
		<div className="form-floating mb-3">
			<Form.Control as="textarea" style={{height: "6rem"}} id="description" placeholder="Description" />
			<label htmlFor="description">Description</label>
		</div>
		<div className="form-floating mb-3">
			<select name="category" id="category" className="form-select">
				<option selected>Select Category</option>
				<option value="All Levels">All Levels</option>
				<option value="Beginner">Beginner</option>
				<option value="Intermediate">Intermediate</option>
				<option value="Advanced">Advanced</option>
			</select>
			<label htmlFor="level">Category</label>
		</div>
		<div className="form-floating mb-3">
			<select name="level" id="level" className="form-select">
				<option selected>Select Level</option>
				<option value="All Levels">All Levels</option>
				<option value="Beginner">Beginner</option>
				<option value="Intermediate">Intermediate</option>
				<option value="Advanced">Advanced</option>
			</select>
			<label htmlFor="level">Level</label>
		</div>
		<div>
			<Button type="submit" variant="success">Create</Button>
		</div>
	</Form>
}

export default AddCourse;
