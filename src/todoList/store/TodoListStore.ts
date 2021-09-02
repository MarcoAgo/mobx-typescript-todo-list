import Status from "../constants/Status";
import { Item } from "../TodoItem";
import {makeAutoObservable, runInAction} from "mobx";
import {POSTS_URL} from "../request/constants";
import remapItems from "../utils/remapItems";
import getData from "../request/getData";
import { omit } from 'lodash'

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
    let totalSubTodos = 0;
    const totalMainTodos = Object
      .values(this.items)
      .filter((i: Item) => {
        if (i.subItemsArray.length > 0) {
          totalSubTodos = i.subItemsArray
            .filter((i: Item) => i.status === Status.COMPLETED).length
        }

        return i.status === Status.COMPLETED
      }).length

    return totalMainTodos + totalSubTodos
  }

  get totalTodos() {
    const totalMainItems = Object.values(this.items).length
    const totalSubItems = Object.values(this.items).map((i: Item) => i.subItemsArray.length)
    return totalMainItems + totalSubItems[0]
  }

  get filteredItems() {
    const listArray = Object.values(this.items)
    let subItemsArray: Array<Item> = []
    if (!this.filterKey.length) return listArray

    const mainItems = listArray.filter((item: Item) => {
      if (item.subItemsArray.length > 0) {
        subItemsArray = item.subItemsArray.filter((i: Item) => i.status === this.filterKey)
      }
      return item.status === this.filterKey
    })

    return [...mainItems, ...subItemsArray]
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
      [item.id]: item,
    }
  }

  removeItem(id: string) {
    this.items = omit(this.items, id)
  }

  setFilterKey(key: string) {
    this.filterKey = key
  }

  clearAllItems() {
    this.items = {}
  }
}

export default TodoListStore
