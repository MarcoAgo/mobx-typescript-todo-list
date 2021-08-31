import TodoItem, {Item} from "../TodoItem";
import {inject, observer} from "mobx-react";

const List = observer((props: any) => {
	const { list } = props;

	const renderSubItem = (subItem: Item) => (
		<div key={subItem.id} className="subItemWrapper">
			<TodoItem item={subItem} hideSubItemsButton />
		</div>
	)

	const renderItem = (item: Item) => (
		<div key={item.id}>
			<TodoItem item={item} />
			{item.subItemsArray.map(renderSubItem)}
		</div>
	)

	return (
		<div className="listWrapper">
			{list.filteredItems.map(renderItem)}
		</div>
	)
})

export default inject('list')(List);
