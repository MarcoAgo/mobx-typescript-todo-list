import TodoItem, { Item } from "./TodoItem";
import {inject, observer} from "mobx-react";
import TodoItemStore from "./store/TodoItemStore";
import { useState } from "react";
import Status from "./constants/Status";
import { useQuery } from "react-query";

const TodoList = observer((props: any) => {
	const { list } = props;
  const [value, setValue] = useState<string>('')
	const queryFunction = list.setItemsFromApi.bind(list)
	const { isLoading, isError } = useQuery('', queryFunction)

  // Actions
  const handleChange = (e: { target: { value: string } }) => {
    const { target: { value } } = e || {}
    setValue(value)
  }

  const handleClick = () => {
    const itemToSave = new TodoItemStore(value)
    list.setItem(itemToSave)
    setValue('')
  }

  // Render
  const renderItem = (item: Item) => (
    <div key={item.value}>
      <TodoItem item={item} />
    </div>
  )

	if (isLoading) return <div>Loading, please wait!</div>
	if (isError) return <div>Error! Please try again</div>

  return (
    <div>
	    <div>
		    <p>Todos done: { list.finishedTodos } / { list.totalTodos }</p>
	    </div>
      <div>
        <button onClick={() => list.setFilterKey('')}>All</button>
        <button onClick={() => list.setFilterKey(Status.TODO)}>To do</button>
        <button onClick={() => list.setFilterKey(Status.COMPLETED)}>Completed</button>
      </div>
      <input value={value} onChange={handleChange} />
      <button disabled={!value.length} onClick={handleClick}>Add</button>
      <div>
        {list.filteredItems.map(renderItem)}
      </div>
    </div>
  )
})

export default inject('list')(TodoList);
