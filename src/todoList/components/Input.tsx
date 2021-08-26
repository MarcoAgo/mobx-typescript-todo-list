import {useRef, useState} from "react";
import TodoItemStore from "../store/TodoItemStore";
import { inject } from "mobx-react";
import ButtonWrapper from "./Button";
import {Item} from "../TodoItem";
import {Input, Icon} from "semantic-ui-react";

interface PropsShape {
	list?: {
		setItem: (item: Item) => null,
	}
}

const TodoInput = (props: PropsShape) => {
	const { list } = props
	const inputRef = useRef<HTMLDivElement>(null)
	const [value, setValue] = useState<string>('')

	const handleClick = () => {
		const itemToSave = new TodoItemStore(value)
		list?.setItem(itemToSave)
		setValue('')
		inputRef.current?.focus()
	}

	const handleChange = (e: { target: { value: string } }) => {
		const { target: { value } } = e || {}
		setValue(value)
	}

	return (
		<div className="inputWrapper">
			<Input
				// @ts-ignore
				ref={inputRef}
				placeholder="Write here your activity"
				size="small"
				icon
				value={value}
				className="componentInput"
				onChange={handleChange}
			>
				<input />
				<Icon size={"small"} color="grey" name="undo" link onClick={() => setValue('')} />
			</Input>
			<ButtonWrapper
				text="Add"
				size="mini"
				color="grey"
				icon="add"
				disabled={!value.length}
				onClick={handleClick}
			/>
		</div>
	)
}

export default inject('list')(TodoInput);
