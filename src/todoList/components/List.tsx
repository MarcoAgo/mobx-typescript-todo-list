import TodoItem, {Item} from "../TodoItem";
import {inject, observer} from "mobx-react";

interface PropsShape {
	list?: {
		filteredItems: Array<Item>
	}
}

const List = observer((props: PropsShape) => {
	const { list } = props;

	const renderItem = (item: Item) => (
		<div key={item.value} className="listItem">
			<TodoItem item={item} />
		</div>
	)

	return (
		<div className="listWrapper">
			{list?.filteredItems.map(renderItem)}
		</div>
	)
})

export default inject('list')(List);
