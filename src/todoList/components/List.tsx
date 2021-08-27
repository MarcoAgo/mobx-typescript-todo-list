import TodoItem, {Item} from "../TodoItem";
import {inject, observer} from "mobx-react";

const List = observer((props: any) => {
	const { list } = props;

	const renderItem = (item: Item) => (
		<div key={item.value}>
			<TodoItem item={item} />
		</div>
	)

	return (
		<div className="listWrapper">
			{list.filteredItems.map(renderItem)}
		</div>
	)
})

export default inject('list')(List);
