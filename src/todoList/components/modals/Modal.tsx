import { observer, inject } from 'mobx-react'
import { Button, Form, Modal, Icon } from 'semantic-ui-react'
import DialogsType from '../../constants/Dialogs';
import { useState } from 'react';
import TodoItemStore from '../../store/TodoItemStore';
import { useMemo } from 'react';
import TodoItem, { Item } from '../../TodoItem';

const CustomModal = observer((props: any) => {
  const { dialogs, list } = props
  const item = useMemo<Item>(
    () => list.items[dialogs.props.id], 
    [dialogs.props.id, list.items]
  )
  
  const [value, setValue] = useState<string>('')
  const addNewSubItems = item?.addNewSubItems.bind(item)
  const addSubItems = item?.addSubItems.bind(item)
  const clearNewSubItems = item?.clearNewSubItems.bind(item)
  // const clearSubItems = item?.clearSubItems.bind(item)

  const handleChange = (e: { target: { value: string } }) => {
    const { target: { value } } = e || {}
    setValue(value)
  }

  const handleClose = () => {
    clearNewSubItems()
    dialogs.setActive('', {})
  }

  const handleAddItem = () => {
    const itemToSave = new TodoItemStore(value)
    addNewSubItems(itemToSave)
    setValue('')
  }

  const handleSubmit = () => {
    addSubItems()
    dialogs.setActive('', {})
  }

  const renderSubItem = (subItem: Item) => (
    <div key={subItem.id}>
      <TodoItem item={subItem} hideSubItemsButton />
    </div>
  )

  return (
    <Modal
      open={dialogs.active === DialogsType.ADD_SUB_ITEMS ? true : false}
      dimmer="blurring"
      onClose={handleClose}
    >
      <Modal.Header>
        {`Add sub items to ${dialogs.props.title}`}
      </Modal.Header>
      <Modal.Content>
        <div className="flex fullWidth">
          <Form className="modalForm">
            <Form.Input
              // ref={inputRef}
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
          <Button
            text="Add"
            size="mini"
            color="grey"
            icon="add"
            disabled={!value.length}
            onClick={handleAddItem}
          />
        </div>
        <div className="subItemsWrapper">
          {item?.newSubItemsArray.map(renderSubItem)}
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={handleClose}>Close</Button>
        <Button positive onClick={handleSubmit}>Add</Button>
      </Modal.Actions>
    </Modal>
  )
})

export default inject('dialogs', 'list')(CustomModal)
