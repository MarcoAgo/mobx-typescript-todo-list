import { observer } from "mobx-react";
import { Checkbox, Icon } from "semantic-ui-react";
import { useState } from 'react';

export interface Item {
  value: string,
  checked: boolean,
  status: string,
  toggle: () => void,
  addSubItems: (item: Item) => void,
}

interface TodoItemProps {
  item: Item,
}

const TodoItem = observer((props: TodoItemProps) => {
  const [hover, setHover] = useState(false)
  const { item } = props

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
      {hover && (
        <div className="editItem">
          <Icon
            name="plus"
            color="grey"
            onClick={() => console.log()}
          />
        </div>
      )}
    </div>
  )
})

export default TodoItem
