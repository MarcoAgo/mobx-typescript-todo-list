import { useRef, useState } from "react";
import TodoItemStore from "../store/TodoItemStore";
import { inject } from "mobx-react";
import ButtonWrapper from "./Button";
import { Icon, Form } from "semantic-ui-react";

const TodoInput = (props: any) => {
  const { list } = props
  const inputRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState<string>('')

  const handleClick = () => {
    const itemToSave = new TodoItemStore(value)
    list?.setItem(itemToSave)
    setValue('')
    inputRef.current?.focus()
  }

  const handleChange = (e: { target: { value: string } }) => {
    const { target: { value } } = e || {}
    setValue(value)
  }

  return (
    <div className="flex">
      <Form className="inputWrapper" onSubmit={handleClick}>
        <Form.Input
          // @ts-ignore
          ref={inputRef}
          placeholder="Write here your activity"
          size="small"
          icon
          value={value}
          className="componentInput"
          onChange={handleChange}
        >
          <input />
          <Icon size={"small"} color="grey" name="undo" link onClick={() => setValue('')} />
        </Form.Input>
      </Form>
      <ButtonWrapper
        text="Add"
        size="mini"
        color="grey"
        icon="add"
        disabled={!value.length}
        onClick={handleClick}
      />
    </div>
  )
}

export default inject('list')(TodoInput);
