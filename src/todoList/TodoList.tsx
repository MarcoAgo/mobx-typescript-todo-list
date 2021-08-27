import './styles/style.css'
import { inject, observer } from "mobx-react"
import { useQuery } from "react-query"
import Heading from "./components/Heading"
import TodoInput from "./components/Input"
import List from "./components/List";
import { Button, Icon } from "semantic-ui-react";

const TodoList = observer((props: any) => {
  const { list } = props;
  const queryFunction = list.setItemsFromApi.bind(list)
  useQuery('', queryFunction, { suspense: true })

  return (
    <div className="todoListWrapper">
      <Heading />
      <TodoInput />
      <List />
      <div className="clearAllButtonWrapper">
        <Button animated='vertical' onClick={() => list.clearAllItems()}>
          <Button.Content hidden>Clear all</Button.Content>
          <Button.Content visible>
            <Icon name='trash' />
          </Button.Content>
        </Button>
      </div>
    </div>
  )
})

export default inject('list')(TodoList);
