import {Fragment, useEffect, useState} from "react";

const LearnLecture = ({history}) => {

	const {state} = history.location

	const [lecture, setLecture] = useState({});

	useEffect(() => {
		if (state) {
			setLecture(state)
		}
	}, [state])


	return <Fragment>
		<h4>{lecture.title}</h4>
		<hr/>
		{lecture.file_content &&
		<div className="my-4">
			<video src={lecture.file_content} className="w-100 border p-2 shadow" controls autoPlay style={{aspectRatio: "16/10"}} />
		</div>
		}
		<p>{lecture.text_content}</p>
		{lecture.resources && lecture.resources.length > 0 &&
		<Fragment>
			<h5>Resources</h5>
			{lecture.resources.map(resource =>
				<a href={resource.url} target="_blank">{resource.display_name} <i className="fas fa-external-link-alt me-3"/></a>
			)}
		</Fragment>
		}
	</Fragment>

}

export default LearnLecture;
