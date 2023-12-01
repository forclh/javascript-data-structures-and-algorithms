import { defaultToString } from '../../util.mjs';
import ValuePair from './models/value-pair.mjs';

// 自定义字典类
export default class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn;
    this.table = {};
  }

  // 判断一个键是否存在于字典中
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  // 设置字典和ValuePair类的键值
  set(key, value) {
    if (key != null && value != null) {
      const tableKey = this.toStrFn(key);
      this.table[tableKey] = new ValuePair(key, value);  // 保留原始的key
      return true;
    }
    return false;
  }
  // 从字典中移除一个值
  remove(key) {
    if (key != null) {
      const tableKey = this.toStrFn(key);
      delete this.table[tableKey];
      return true;
    }
    return false;
  }
  // 从字典中检索一个值
  // get(key) {
  //   if(this.hasKey(key)) {
  //     return this.table[this.toStrFn(key)];
  //   }
  //   return undefined;
  // }
  get(key) {
    const valuePair = this.table[this.toStrFn(key)];
    return valuePair == null ? undefined : valuePair.value;
  }
  // 以数组的形式返回字典中所有的ValuePair对象
  keyValues() {
    return Object.values(this.table);
  }
  // 以数组的形式返回所有原始键名
  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }
  // 以数组的形式返回所有的值
  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }
  // !用forEach迭代字典的每个键值对
  forEach(callbackFn) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value);
      if (result === false) {
        break;
      }
    }
  }
  // 返回字典中值的个数
  size() {
    return this.keyValues().length;
  }
  // 判断字典是否为空
  isEmpty() {
    return this.size() === 0;
  }
  // 清空字典内容
  clear() {
    this.table = {};
  }
  // 打印字典内容
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    const valuePairs = this.keyValues();
    let objString = `${valuePairs[0].toString()}`
    for (let i = 1; i < valuePairs.length; i++) {
      objString = `${objString}, ${valuePairs[i].toString()}`;
    }
    return objString;
  }
}