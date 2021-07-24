import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createLecture, updateLecture} from "../../store/lecture/lecture-actions";
import {fetchCourseContent} from "../../store/course/course-actions";
import Notification from "../../components/ui/notification";

const LecturePage = ({match, history}) => {

	const {state} = history.location;
	const dispatch = useDispatch();

	const lectureCreate = useSelector(state1 => state1.lecture.lectureCreate);
	const {lecture: createdLecture, loading: createLoading, error: createError} = lectureCreate;

	const lectureUpdate = useSelector(state1 => state1.lecture.lectureUpdate);
	const {lecture: updatedLecture, loading: updateLoading, error: updateError} = lectureUpdate;

	const lectureUpload = useSelector(state1 => state1.lecture.lectureUpload);
	const {success: uploadLecture, loading: uploadLoading, error: uploadError} = lectureUpload;

	const [number, setNumber] = useState('');
	const [title, setTitle] = useState('');
	const [text_content, setText_content] = useState('');
	const [file_content, setFile_content] = useState();

	useEffect(() => {
		if (state) {
			setNumber(state.number);
			setTitle(state.title);
			setText_content(state.text_content)
		} else {
			setNumber('');
			setTitle('');
			setText_content('');
		}
	}, [state])

	const submitHandler = event => {
		event.preventDefault();
		if (state) {
			dispatch(updateLecture({id: state.id, number, title, text_content}, file_content));
		} else {
			dispatch(createLecture({chapter: match.params.chapter_id, number, title, text_content}, file_content))
		}
		dispatch(fetchCourseContent(match.params.course_id));
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
	</div>
}

export default LecturePage;
