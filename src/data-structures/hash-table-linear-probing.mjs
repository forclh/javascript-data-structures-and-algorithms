import { defaultToString } from "../../util.mjs";
import ValuePair from "./models/value-pair.mjs";

// 使用线性探测移动元素解决哈希冲突
export default class HashTableLinearProbing {
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
    if (key != null && value != null) {
      const positon = this.hashCode(key);
      if (this.table[positon] == null) {
        this.table[positon] = new ValuePair(key, value);
      } else {
        let index = positon + 1;
        while (this.table[index] != null) {
          index++;
        }
        this.table[index] = new ValuePair(key, value);
      }
      return true;
    }
    return false;
  }
  // !获取给定健的值
  get(key) {
    const positon = this.hashCode(key);
    if (this.table[positon] != null) {
      // 检查是否存在于原始位置上
      if (this.table[positon].key === key) {
        return this.table[positon].value;
      }
      // 不存在在原始位置上则继续寻找
      let index = positon + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      // 可能有两种情况跳出循环
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[index].value
      }
    }
    return undefined;
  }
  // !根据键从表中移除元素
  remove(key) {
    const position = this.hashCode(key);
    if (this.table[position] != null) {
      if (this.table[position].key === key) {
        delete this.table[position];
        // 验证删除操作是否有副作用（移动冲突元素）
        this.verifyRemoveSideEfffect(key, position);
        return true;
      }
      let index = position + 1;
      while (this.table[index] != null && this.table[index].key !== key) {
        index++;
      }
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index];
        // 验证删除操作是否有副作用（移动冲突元素）
        this.verifyRemoveSideEfffect(key, index);
        return true;
      }
    }
    return false;
  }
  // !解决删除副作用
  verifyRemoveSideEfffect(key, removedPositon) {
    const hash = this.hashCode(key);
    let index = removedPositon + 1;
    while (this.table[index] != null) {
      const posHash = this.hashCode(this.table[index].key);
      // 当前元素的hash值小于被删除元素的hash值，活着当前元素的hash值小于被删除元素的索引值
      if (posHash <= hash || posHash <= removedPositon) {
        this.table[removedPositon] = this.table[index];
        delete this.table[index];
        removedPositon = index;
      }
      index++;
    }
  }
  size() {
    return Object.keys(this.table).length;
  }
  isEmpty() {
    return this.size() === 0;
  }
  getTable() {
    return this.table;
  }
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const keys = Object.keys(this.table);
    let objString = `${keys[0]} => ${this.table[keys[0]].toString()}`;
    for (let i = 1; i < keys.length; i++) {
      objString = `${objString}, ${keys[i]} => ${this.table[keys[i]].toString()}`
    }
    return objString;
  }
}