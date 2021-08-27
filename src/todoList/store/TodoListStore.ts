import Status from "../constants/Status";
import { Item } from "../TodoItem";
import {makeAutoObservable, runInAction} from "mobx";
import {POSTS_URL} from "../request/constants";
import remapItems from "../utils/remapItems";
import getData from "../request/getData";

interface responseObj {
  [index: string]: Item,
}

class TodoListStore {
  items: responseObj = {}
  filterKey = ''

  constructor(items: responseObj) {
    makeAutoObservable(this)
    this.items = items
  }

  /**
   * GETTERS - Computed
   */
  get finishedTodos() {
    return Object
      .values(this.items)
      .filter((i: Item) => i.status === Status.COMPLETED).length
  }

  get totalTodos() {
    return Object.values(this.items).length
  }

  get filteredItems() {
    const listArray = Object.values(this.items)
    if (!this.filterKey.length) return listArray

    return listArray.filter((item: Item) => item.status === this.filterKey)
  }

  /**
   * Actions
   */
  async setItemsFromApi() {
    this.items = {}
    try {
      const res = await getData(POSTS_URL)
      const remappedItems = remapItems(res)
      await runInAction(() => this.items = remappedItems)
    } catch (e) {
      console.log(e);
    }
  }

  setItem(item: Item) {
    this.items = {
      ...this.items,
      [item.value]: item,
    }
  }

  setFilterKey(key: string) {
    this.filterKey = key
  }

  clearAllItems() {
    this.items = {}
  }
}

export default TodoListStore
