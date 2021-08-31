import TodoItemStore from "../store/TodoItemStore";
import { Item } from "../TodoItem";

interface ResponseObjType {
	id: number,
	title: string,
	checked: boolean,
}

/**
 * Remap items with the desired object shape
 * * response shape -> [{ id: {Number}, title: {String} }]
 * * desired shape -> { { value: } }
 * @param response
 */
const remapItems = (response: Array<ResponseObjType>) => {
	const result = response
		.map(item => new TodoItemStore(item.title))
		.reduce((acc: { [index: string]: Item }, current) => {
			acc[current.id] = current
			return acc;
		}, {})

	return result
}

export default remapItems;
