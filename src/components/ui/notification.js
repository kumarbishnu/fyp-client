import {createPortal} from "react-dom";
import {Toast} from "react-bootstrap";

const Notification = props => {

	return createPortal(
		<Toast className={`bg-${props.variant} text-white`}>
			<Toast.Header closeButton={false}>
				<strong>{props.title}</strong>
			</Toast.Header>
			<Toast.Body>
				{props.message}
			</Toast.Body>
		</Toast>,
		document.getElementById('toast-container')
	);
}

export default Notification;
