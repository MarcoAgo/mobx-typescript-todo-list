import Status from "../constants/Status";
import { action, computed, makeAutoObservable } from "mobx";
import { Item } from "../TodoItem";
import { v4 as uuidv4 } from 'uuid';

class TodoItemStore {
  id = uuidv4()
  value = ''
  checked = false
  status: string = Status.TODO
  subItems: { [index: string]: Item } = {}
  newSubItems: { [index: string]: Item } = {}

  constructor(value: string) {
    makeAutoObservable(this, {
      subItemsArray: computed,
      addSubItems: action,
      clearSubItems: action,
    })

    this.value = value
  }

  get newSubItemsArray() {
    const mergedSubItems = {
      ...this.subItems,
      ...this.newSubItems,
    }
    return Object.values(mergedSubItems)
  }

  get subItemsArray() {
    return Object.values(this.subItems)
  }

  toggle() {
    this.checked = !this.checked
    this.status = this.status === Status.TODO ? Status.COMPLETED : Status.TODO;
  }

  addNewSubItems(subItem: Item) {
    this.newSubItems = {
      ...this.newSubItems,
      [subItem.id]: subItem
    }
  }

  clearNewSubItems() {
    this.newSubItems = { }
  }

  addSubItems() {
    this.subItems = {
      ...this.subItems,
      ...this.newSubItems,
    }
  }

  clearSubItems() {
    this.newSubItems = {}
  }
}

export default TodoItemStore
