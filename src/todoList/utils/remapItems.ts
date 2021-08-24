import Status from "../constants/Status";
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
		.map(item => ({
			// value: item.title.toLowerCase().replace(/\s/g, ''),
			value: item.title,
			checked: item.checked || false,
			status: item.checked ? Status.COMPLETED : Status.TODO
		}))
		.reduce((acc: { [index: string]: Item }, current) => {
			acc[current.value] = new TodoItemStore(current.value)
			return acc;
		}, {})

	return result
}

export default remapItems;
