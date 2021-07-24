import {Button, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createChapter, updateChapter} from "../../store/chapter/chapter-actions";
import Notification from "../../components/ui/notification";
import {fetchCourseContent} from "../../store/course/course-actions";

const ChapterPage = ({match, history}) => {

	const {state} = history.location;
	const dispatch = useDispatch();

	const chapterCreate = useSelector(state1 => state1.chapter.chapterCreate);
	const {chapter: createdChapter, loading: createLoading, error: createError} = chapterCreate;

	const chapterUpdate = useSelector(state1 => state1.chapter.chapterUpdate);
	const {chapter: updatedChapter, loading: updateLoading, error: updateError} = chapterUpdate;

	const [number, setNumber] = useState('');
	const [title, setTitle] = useState('');

	useEffect(() => {
		if (state) {
			setNumber(state.number);
			setTitle(state.title);
		} else {
			setNumber('');
			setTitle('');
		}
	}, [state])

	const submitHandler = event => {
		event.preventDefault();

		if (state) {
			dispatch(updateChapter({id: state.id, number: Number(number), title}));
		} else {
			dispatch(createChapter({course: match.params.course_id, number, title}));
		}

		dispatch(fetchCourseContent(match.params.course_id));
	}

	return <div className="p-5 shadow">
		{createLoading && <Notification variant="info" title="Info" message="Creating Chapter..." />}
		{createError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{createdChapter && <Notification variant="success" title="Success" message="Chapter Created!" />}
		{updateLoading && <Notification variant="info" title="Info" message="Updating Chapter..." />}
		{updateError && <Notification variant="danger" title="Error" message="Something went wrong!" />}
		{updatedChapter && <Notification variant="success" title="Success" message="Chapter Updated!" />}
		<h4>{state ? 'Edit Chapter' : 'Add Chapter'}</h4>
		<Form onSubmit={submitHandler} className="mt-4">
			<div className="form-floating mb-3">
				<div className="form-floating mb-3">
					<Form.Control type="number" id="number" placeholder="Chapter Number" required value={number} onChange={e => setNumber(e.target.value)} />
					<label htmlFor="number">Chapter Number</label>
				</div>
				<div className="form-floating mb-3">
					<Form.Control type="text" id="title" placeholder="Chapter Title" required value={title} onChange={e => setTitle(e.target.value)} />
					<label htmlFor="title">Chapter Title</label>
				</div>
			</div>
			<Button variant="success" type="submit">{state ? 'Update' : 'Add'} Chapter</Button>
		</Form>
	</div>
}

export default ChapterPage;
