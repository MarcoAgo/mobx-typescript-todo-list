import Status from "../constants/Status";
import { Item } from "../TodoItem";
import {action, computed, makeObservable, observable} from "mobx";

class TodoListStore {
	items: object = {}
	filterKey: string = ''

	get finishedTodos() {
		return Object
			.values(this.items)
			.filter((i: Item) => i.status === Status.COMPLETED).length
	}

	get filteredItems() {
		if (!this.filterKey.length) return Object.values(this.items);

		return Object
			.values(this.items)
			.filter((item: Item) => item.status === this.filterKey)
	}

	constructor(items: object) {
		makeObservable(this, {
			items: observable,
			filterKey: observable,
			filteredItems: computed,
			finishedTodos: computed,
			setItems: action,
			setFilterKey: action,
		})

		this.items = items
	}

	setItems(item: Item) {
		this.items = {
			...this.items,
			[item.value]: item,
		}
	}

	setFilterKey(key: string) {
		this.filterKey = key
	}
}

export default TodoListStore
