import { makeAutoObservable } from "mobx"
import { Item } from '../TodoItem';

interface PropsShape {
  onSubmit: () => null,
  clearSubItems: () => null,
  subItems: { [index: string]: Item },
  title: string,
}

class DialogStore {
  active = ''
  props = {}

  constructor() {
    makeAutoObservable(this)
  }

  setActive(name: string, props: PropsShape) {
    this.active = name
    this.props = props
  }
}

export default DialogStore
