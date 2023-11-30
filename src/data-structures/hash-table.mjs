import { defaultToString } from '../../util.mjs';
import ValuePair from './models/value-pair.mjs';
// 散列表类（哈希表类）
export default class HashTable {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }
  // 散列函数（哈希函数）
  loseloseHashCode(key) {
    if(typeof key === 'number') {
      return key;
    }
    const tableKey = this.toStrFn(key);
    let hash = 0;
    for(let i = 0; i < tableKey.length; i++) {
      hash += tableKey.charCodeAt(i);
    }
    return hash % 37;
  }
  // 哈希编码
  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  // 增加项
  put(key, value) {
    if(key != null && value != null) {
      const position = this.hashCode(key);
      this.table[position] = new ValuePair(key, value);
      return true;
    }
    return false;
  }
  // 获取值
  get(key) {
    const valuePair = this.table[this.hashCode(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  // 移除值
  remove(key) {
    const hash = this.hashCode(key);
    const valuePair = this.table[hash];
    if(valuePair != null) {  // 可能key不存在
      delete this.table[hash];
      return true;
    }
    return false;
  }
  // 获取哈希表
  getTable() {
    return this.table;
  }
  // 哈希表大小
  size() {
    return Object.keys(this.table).length;
  }
  // 哈希表是否为空
  isEmpty() {
    return this.size() === 0;
  }
  // 打印哈希表
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