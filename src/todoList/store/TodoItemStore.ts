import Status from "../constants/Status";
import {action, makeObservable, observable} from "mobx";

class TodoItemStore {
  value = ''
  checked = false
  status: string = Status.TODO

  constructor(value: string) {
    makeObservable(this, {
      value: observable,
      checked: observable,
      status: observable,
      toggle: action,
    })

    this.value = value
  }

  toggle() {
    this.checked = !this.checked
    this.status = this.status === Status.TODO ? Status.COMPLETED : Status.TODO;
  }
}

export default TodoItemStore
