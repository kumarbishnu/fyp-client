const Badge = props => {
	return <span className={`badge rounded-pill bg-${props.variant}`}>{props.children}</span>
}

export default Badge;
