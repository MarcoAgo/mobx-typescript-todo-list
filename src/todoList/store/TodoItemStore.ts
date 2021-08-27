import Status from "../constants/Status";
import {action, makeAutoObservable} from "mobx";
import {Item} from "../TodoItem";

class TodoItemStore {
  value = ''
  checked = false
  status: string = Status.TODO
  subItems: { [index: string]: Item } = {}

  constructor(value: string) {
    makeAutoObservable(this, {
      addSubItems: action,
    })

    this.value = value
  }

  toggle() {
    this.checked = !this.checked
    this.status = this.status === Status.TODO ? Status.COMPLETED : Status.TODO;
  }

  addSubItems(subItem: Item) {
    this.subItems = {
      ...this.subItems,
      [subItem.value]: subItem
    }
  }
}

export default TodoItemStore
