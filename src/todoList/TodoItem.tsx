import {observer} from "mobx-react-lite";

type Func = () => void;

export interface Item {
	value: string,
	checked: boolean,
	status: string,
	toggle: Func,
}

interface TodoItemProps {
	item: Item,
}

const TodoItem = observer((props: TodoItemProps) => {
	const { item } = props

	return (
		<label htmlFor={item.value}>
			<input
				type="checkbox"
				name={item.value}
				id={item.value}
				onClick={() => item.toggle()}
				checked={item.checked}
			/>
			{item.value}
		</label>
	)
})

export default TodoItem
