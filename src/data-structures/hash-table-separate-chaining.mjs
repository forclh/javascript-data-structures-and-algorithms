import { defaultToString } from "../../util.mjs";
import LinkedList from './linked-list.mjs';
import ValuePair from "./models/value-pair.mjs";

// 用分离链接(链表)解决哈希冲突
export default class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  loseloseHashCode(key) {
    if (typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for (let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }
  hashCode(key) {
    return this.loseloseHashCode(key);
  }
  // 添加键值对
  put(key, value) {
    if(key != null && value != null) {
      const position = this.hashCode(key);
      if(this.table[position] == null) {
        this.table[position] = new LinkedList();
      }
      this.table[position].push(new ValuePair(key, value));
      return true;
    }
    return false;
  }
  // 获取给定健的值
  get(key) {
    const positon = this.hashCode(key);
    const linkedList = this.table[positon];
    // 链表存在且非空
    if(linkedList != null  && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while(current != null) {
        if(current.element.key === key) {
          return current.element.value
        }
        current = current.next;
      }
    }
    return undefined;
  }
  // !根据键从表中移除元素
  remove(key) {
    const position = this.hashCode(key);
    const linkedList = this.table[position];
    if(linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead();
      while(current != null) {
        if(current.element.key === key) {
          linkedList.remove(current.element);
          // 删除后判断链表是否非空（是否删除了最后一个元素）
          if(linkedList.isEmpty()) {
            delete this.table[position];
          }
          return true;
        }
        current = current.next;
      }
    }
    return false;
  }
  // !表的大小
  size() {
    let count = 0;
    Object.values(this.table).forEach(linkList => {
      count += linkList.size();
    })
    return count;
  }
  // 判断是否非空
  isEmpty() {
    return this.size() === 0;
  }
  // 清空散列表
  clear() {
    this.table = {};
  }
  // 获取散列表
  getTable() {
    return this.table;
  }
  // 打印散列表
  toString() {
    if(this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `${keys[0]} => ${this.table[keys[0]].toString()}`;
    for(let i = 1; i < keys.length; i++) {
      objString = `${objString}, ${keys[i]} => ${this.table[keys[i]].toString()}`;
    }
    return objString;
  }
}