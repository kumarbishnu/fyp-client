import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {Button, Dropdown, DropdownButton, Form, FormControl, InputGroup} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {fetchCategories} from "../store/course/course-actions";

const SearchBox = () => {

	const history = useHistory()
	const dispatch = useDispatch();
	const categories = useSelector(state => state.courses.categories);

	const [category, setCategory] = useState();
	const [keyword, setKeyword] = useState();

	useEffect(() => {
		dispatch(fetchCategories());
	},[dispatch])

	const submitHandler = event => {
		event.preventDefault();
		if (!category && !keyword) {return;}

		let query = `/courses/?category=${category ? category.id : ''}&keyword=${keyword ? keyword : ''}`;
		history.push(query);
	}

	return <Form onSubmit={submitHandler} inline className="border p-1 rounded-3 mx-auto">
		<InputGroup size="lg">
			<DropdownButton title={category ? category.name : 'Category'} variant="secondary" size="lg" id="categoryDropdown">
				{categories.map(category =>
					<Dropdown.Item key={category.id} onSelect={e => setCategory(category)}>{category.name}</Dropdown.Item>
				)}
				<Dropdown.Item>Action</Dropdown.Item>
			</DropdownButton>
			<FormControl placeholder="Search..." onChange={e => setKeyword(e.target.value.trim())} />
			<Button variant="secondary" type="submit"><i className="fas fa-search"/></Button>
		</InputGroup>
	</Form>

}

export default SearchBox;
