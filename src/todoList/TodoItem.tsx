import {observer} from "mobx-react";
import {Checkbox} from "semantic-ui-react";

export interface Item {
  value: string,
  checked: boolean,
  status: string,
  toggle: () => void,
}

interface TodoItemProps {
  item: Item,
}

const TodoItem = observer((props: TodoItemProps) => {
  const { item } = props

  return (
	  <Checkbox
		  label={item.value}
		  checked={item.checked}
		  onChange={() => item.toggle()}
	  />
  )
})

export default TodoItem
