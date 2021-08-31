import { observer, inject } from "mobx-react";
import { Checkbox, Icon } from "semantic-ui-react";
import { useState } from 'react';
import DialogsType from './constants/Dialogs';

export interface Item {
  id: string,
  value: string,
  checked: boolean,
  status: string,
  subItemsArray: Array<Item>,
  newSubItemsArray: Array<Item>,
  toggle: () => void,
  addSubItems: () => void,
  addNewSubItems: (item: Item) => void,
  removeNewSubItem: (id: string) => void,
  removeSubItem: (id: string) => void,
  clearNewSubItems: () => void,
  clearSubItems: () => void,
}

interface TodoItemProps {
  item: Item,
  dialogs?: any,
  list?: any,
  hideSubItemsButton?: boolean,
  removeSubItem: () => void,
}

const TodoItem = observer((props: TodoItemProps) => {
  const [hover, setHover] = useState(false)
  const { item, dialogs, hideSubItemsButton, removeSubItem } = props
  const setActive = dialogs.setActive.bind(dialogs)

  const renderModalButton = () => hover && (
    <div className={`editItem ${hideSubItemsButton ? 'hide' : ''}`}>
      <Icon
        name="plus"
        color="grey"
        onClick={() => setActive( DialogsType.ADD_SUB_ITEMS, { title: item.value, id: item.id })}
      />
    </div>
  )

  const renderRemoveItemButton = () => hover && (
    <div className="removeItem">
      <Icon
        name="remove"
        color="grey"
        onClick={removeSubItem}
      />
    </div>
  )

  return (
    <div 
      className="flex alignCenterVertically listItem"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Checkbox
        label={item.value}
        checked={item.checked}
        onChange={() => item.toggle()}
      />
      {renderModalButton()}
      {renderRemoveItemButton()}
    </div>
  )
})

export default inject('dialogs')(TodoItem)
