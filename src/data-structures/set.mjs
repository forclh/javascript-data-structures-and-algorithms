// 自定义集合类Set
export default class Set {
  constructor() {
    this.items = {};
  }
  // 判断是否存在元素：存在true，失败false
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element);
  }
  // 添加元素，成功true，失败false
  add(element) {
    if(!this.has(element)) {
      this.items[element] = element;
      return true;
    }
    return false;
  }
  // 删除元素，成功true，失败false
  delete(element) {
    if(this.has(element)) {
      delete this.items[element];
      return true;
    }
    return false;
  }
  // 清空集合
  clear() {
    this.items = {};
  }
  // 返回集合中的元素个数
  size() {
    return Object.keys(this.items).length;
  }
  // 适用所有浏览器的size方法
  sizeLegazy() {
    let count = 0;
    for(let key in this.items) {
      // TODO 使用has一样吗
      if(this.items.hasOwnProperty(key)) {
        count++;
      }
    }
    return count;
  }
  // 返回集合元素
  values() {
    return Object.values(this.items);
  }
  // 适配所有浏览器的values方法
  valuesLegacy() {
    let values = [];
    for(let key in this.items) {
      // TODO 使用has一样吗
      if(this.items.hasOwnProperty(key)) {
        values.push(key);
      }
    }
    return values;
  }
  // 并集
  union(otherSet) {
    let unionSet = new Set();
    this.values().forEach(value => unionSet.add(value));
    otherSet.values().forEach(value => unionSet.add(value));
    return unionSet;
  }
  // 交集
  // intersection(otherSet) {
  //   const intersectionSet = new Set();
  //   this.values().forEach(value => {
  //     if(otherSet.has(value)) {
  //       intersectionSet.add(value);
  //     }
  //   });
  //   return intersectionSet;
  // }
  // intersection(otherSet) {
  //   const intersectionSet = new Set();
  //   const values = this.values();
  //   for(let i = 0; i < values.length; i++) {
  //     if(otherSet.has(values[i])) {
  //       intersectionSet.add(values[i]);
  //     }
  //   }
  //   return intersectionSet;
  // }
  // 性能更好的差集方案
  intersection(otherSet) {
    const intersectionSet = new Set();
    const values = this.values();
    const otherValues = otherSet.values();
    let biggerSet = values;
    let smallerSet = otherValues;
    if(values.length - otherValues.length < 0) {
      biggerSet = otherValues;
      smallerSet = values;
    }
    smallerSet.forEach(value => {
      if(biggerSet.includes(value)) {
        intersectionSet.add(value);
      }
    });
    return intersectionSet;
  }
  // 差集
  difference(otherSet) {
    const differenceSet = new Set();
    this.values().forEach(value => {
      if(!otherSet.has(value)) {
        differenceSet.add(value);
      }
    });
    return differenceSet;
  }
  // 子集
  isSubsetOf(otherSet) {
    // 判断集合大小
    if(this.size() > otherSet.size()) {
      return false;
    }
    let isSubset = true;
    this.values().every(value => {
      if(!otherSet.has(value)) {
        isSubset = false;
        return false;  // !只会跳出迭代，不会返回函数
      }
      return true;
    });
    return isSubset;
  }
  // 判空
  isEmpty() {
    return this.size() === 0;
  }
  // 清空集合
  clear() {
    this.items = {};
  }
  // 打印集合
  toString() {
    if(this.isEmpty()) {
      return '';
    }
    const values = this.values();
    let objString = `${values[0]}`;
    for(let i = 1; i < values.length; i++) {
      objString = `${objString}, ${values[i].toString()}`;
    }
    return objString;
  }
}


// const set = new Set();

// set.add(1);
// console.log(set.values());
// console.log(set.has(1));
// console.log(set.size());


// set.add(2);
// console.log(set.values());
// console.log(set.has(2));
// console.log(set.size());

// set.delete(1);
// console.log(set.values());
// set.delete(2);
// console.log(set.values());

// const setA = new Set();
// setA.add(1);
// setA.add(2);
// setA.add(3);
// console.log(setA.toString());
// const setB = new Set();
// setB.add(2);
// setB.add(3);
// setB.add(4);
// const setC = new Set();
// setC.add(1);
// setC.add(2);

// console.log(setA.union(setB).values());
// console.log(setA.intersection(setB).values());
// console.log(setA.difference(setB).values());
// console.log(setB.difference(setA).values());
// console.log(setC.isSubsetOf(setA));
// console.log(setC.isSubsetOf(setB));