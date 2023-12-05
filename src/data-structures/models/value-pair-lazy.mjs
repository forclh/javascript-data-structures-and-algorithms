import { ValuePair } from './value-pair.mjs';

// 线性探查软删除方法的键值对类
export class ValuePairLazy extends ValuePair {
  constructor(key, value, isDeleted = false) {
    super(key, value);
    // this.key = key;
    // this.value = value;
    this.isDeleted = isDeleted;
  }
}