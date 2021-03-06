import {Button, Form, Table} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createLecture, updateLecture} from "../../store/lecture/lecture-actions";
import {fetchCourseContent} from "../../store/course/course-actions";
import Notification from "../../components/ui/notification";
import {createResource, deleteResource} from "../../store/resource/resource-actions";

const LecturePage = ({match, history}) => {

	const {state} = history.location;
	const dispatch = useDispatch();

	const lectureCreate = useSelector(state1 => state1.lecture.lectureCreate);
	const {lecture: createdLecture, loading: createLoading, error: createError} = lectureCreate;

	const lectureUpdate = useSelector(state1 => state1.lecture.lectureUpdate);
	const {lecture: updatedLecture, loading: updateLoading, error: updateError} = lectureUpdate;

	const lectureUpload = useSelector(state1 => state1.lecture.lectureUpload);
	const {success: uploadLecture, loading: uploadLoading, error: uploadError} = lectureUpload;

	const resourceCreate = useSelector(state1 => state1.resource.resourceCreate);
	const {resource} = resourceCreate;

	const [number, setNumber] = useState('');
	const [title, setTitle] = useState('');
	const [text_content, setText_content] = useState('');
	const [file_content, setFile_content] = useState();

	const [resources, setResources] = useState([]);
	const [displayName, setDisplayName] = useState('');
	const [url, setUrl] = useState('');

	useEffect(() => {
		if (state) {
			setNumber(state.number);
			setTitle(state.title);
			setText_content(state.text_content)
			setResources(state.resources);
		} else {
			setNumber('');
			setTitle('');
			setText_content('');
		}
	}, [state])

	useEffect(() => {
		if (resource) {
			let x = [...resources];
			x.push(resource)
			setResources(x);
		}
	}, [resource])

	const submitHandler = event => {
		event.preventDefault();
		if (state) {
			dispatch(updateLecture({id: state.id, number, title, text_content}, file_content));
		} else {
			dispatch(createLecture({chapter: match.params.chapter_id, number, title, text_content}, file_content))
		}
		dispatch(fetchCourseContent(match.params.course_id));
	}

	const addResourceHandler = () => {
		dispatch(createResource({lecture: state.id, display_name: displayName, url}))
		dispatch(fetchCourseContent(match.params.course_id))
		setUrl('');
		setDisplayName('');
	}

	const deleteResourceHandler = id => {
		dispatch(deleteResource(id));
		dispatch(fetchCourseContent(match.params.course_id))
		let x = [...resources];
		let index = x.findIndex(x => x.id === id);
		x.splice(index);
		setResources(x);
	}

	return <div className="p-5 shadow">
		{createLoading && <Notification variant="info" title="Info" message="Creating Lecture..." />}
		{updateLoading && <Notification variant="info" title="Info" message="Updating Lecture..." />}
		{uploadLoading && <Notification variant="info" title="Info" message="Uploading File..." />}
		{uploadError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{createError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{updateError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{createdLecture && <Notification variant="success" title="Success" message="Lecture Created!" />}
		{updatedLecture && <Notification variant="success" title="Success" message="Lecture Updated!" />}
		{uploadLecture && <Notification variant="success" title="Success" message="File Uploaded!" />}
		<h4>{state ? 'Edit Lecture' : 'Add Lecture'}</h4>
		<Form onSubmit={submitHandler} className="mt-4">
			<div className="form-floating mb-3">
				<Form.Control type="number" id="number" placeholder="Lecture Number" required value={number} onChange={e => setNumber(e.target.value)} />
				<label htmlFor="number">Lecture Number</label>
			</div>
			<div className="form-floating mb-3">
				<Form.Control type="text" id="title" placeholder="Lecture Title" required value={title} onChange={e => setTitle(e.target.value)} />
				<label htmlFor="title">Lecture Title</label>
			</div>
			<div className="form-floating mb-3">
				<Form.Control as="textarea" style={{height: "8rem"}} id="text_content" placeholder="Text Content" value={text_content} onChange={e => setText_content(e.target.value)} />
				<label htmlFor="text_content">Text Content</label>
			</div>
			<div className="mb-3">
				<label htmlFor="video">Video Content</label>
				<input type="file" id="video" className={`form-control mt-2`} onChange={e => setFile_content(e.target.files[0])} />
			</div>
			<Button variant="success" type="submit">{state ? 'Update' : 'Add'} Lecture</Button>
		</Form>
		{state &&
			<div className="mt-4">
				<h5>Resources</h5>
				<Table>
					<thead>
						<tr>
							<th>Action</th>
							<th>Display Name</th>
							<th>URL</th>
						</tr>
					</thead>
					<tbody>
						{resources && resources.map(resource =>
							<tr key={resource.id}>
								<td><Button variant="danger" size="sm" onClick={e => deleteResourceHandler(resource.id)}><i className="fas fa-trash-alt"/></Button></td>
								<td>{resource.display_name}</td>
								<td>{resource.url}</td>
							</tr>
						)}
						<tr>
							<td><Button variant="success" size="sm" onClick={addResourceHandler}><i className="fas fa-plus"/></Button></td>
							<td><Form.Control placeholder="Display Name" value={displayName} onChange={e => setDisplayName(e.target.value)} /></td>
							<td><Form.Control placeholder="URL" value={url} onChange={e => setUrl(e.target.value)} /></td>
						</tr>
					</tbody>
				</Table>
			</div>
		}
	</div>
}

export default LecturePage;
