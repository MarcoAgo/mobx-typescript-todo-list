import TodoItem, { Item } from "../TodoItem";
import { inject, observer } from "mobx-react";

const List = observer((props: any) => {
  const { list } = props
  const removeItem = list.removeItem.bind(list)

  const renderSubItem = (subItem: Item, item: Item) => {
    const removeSubItem = item.removeSubItem.bind(item)
    return (
      <div key={subItem.id} className="subItemWrapper">
        <TodoItem
          item={subItem}
          hideSubItemsButton
          removeSubItem={() => removeSubItem(subItem.id)}
        />
      </div>
    )
  }

  const renderItem = (item: Item) => (
    <div key={item.id}>
      <TodoItem
        item={item}
        removeSubItem={() => removeItem(item.id)}
      />
      {item.subItemsArray.map((subItem: Item) => renderSubItem(subItem, item))}
    </div>
  )

  return (
    <div className="listWrapper">
      {list.filteredItems.map(renderItem)}
    </div>
  )
})

export default inject('list')(List);
