import { makeAutoObservable } from "mobx"

class DialogStore {
  active = ''

  constructor() {
    makeAutoObservable(this)
  }

  setActive(name: string) {
    this.active = name
  }
}

export default DialogStore
