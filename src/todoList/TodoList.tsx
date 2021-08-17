import TodoItem, { Item } from "./TodoItem";
import { observer } from "mobx-react-lite";
import TodoListStore from "./store/TodoListStore";
import TodoItemStore from "./store/TodoItemStore";
import { useState } from "react";
import Status from "./constants/Status";

const list = new TodoListStore({});

const TodoList = observer(() => {
	const [value, setValue] = useState<string>('')

	// Actions
	const handleChange = (e: { target: { value: string } }) => {
		const { target: { value } } = e || {}
		setValue(value)
	}

	const handleClick = () => {
		const itemToSave = new TodoItemStore(value)
		list.setItems(itemToSave)
		setValue('')
	}

	// Render
	const renderItem = (item: Item) => (
		<div>
			<TodoItem
				key={item.value}
				item={item}
			/>
		</div>
	)

	return (
		<div>
			<div>
				<button onClick={() => list.setFilterKey('')}>All</button>
				<button onClick={() => list.setFilterKey(Status.TODO)}>To do</button>
				<button onClick={() => list.setFilterKey(Status.COMPLETED)}>Completed</button>
			</div>
			<input value={value} onChange={handleChange} />
			<button disabled={!value.length} onClick={handleClick}>Add</button>
			<div>
				{list.filteredItems.map(renderItem)}
			</div>
		</div>
	)
})

export default TodoList
