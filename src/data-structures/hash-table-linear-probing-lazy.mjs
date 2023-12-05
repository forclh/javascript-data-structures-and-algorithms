import { defaultToString } from "../../util.mjs";
import ValuePairLazy from "./models/value-pair-lazy.mjs";

// 使用线性探测软删除解决哈希冲突
export default class HashTableLInearProbingLazy {
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
  // !添加键值对
  put(key, value) {
    if (key != null && value != null) {
      const position = this.hashCode(key);
      // 没值或者有值被标记为删除
      if (this.table[position] == null || (this.table[position] != null && this.table[position].isDeleted)) {
        this.table[position] = new ValuePairLazy(key, value);
      } else {
        // 有值没被标记为删除
        let index = position + 1;
        // !
        while (this.table[index] != null && !this.table[position].isDeleted) {
          index++;
        }
        this.table[index] = new ValuePairLazy(key, value);
      }
      return true;
    }
    return false;
  }
}