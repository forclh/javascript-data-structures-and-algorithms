// 基于对象的队列
export default class Queue {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.item = {};
  }
  // 判空
  isEmpty() {
    // 计算差值判断元素个数
    return this.count - this.lowestCount === 0;
  }
  // 队列增加元素
  enqueue(element) {
    this.item[this.count] = element;
    this.count++;
  }
  // 出队
  dequeue() {
    if(this.isEmpty()) {
      return undefined;
    }
    const result = this.item[this.lowestCount];
    delete this.item[this.lowestCount];
    this.lowestCount++;
    return result;
  }
  // 查看队列头元素
  peek() {
    if(this.isEmpty) {
      return undefined;
    }
    return this.item[this.lowestCount];
  }
  // 查看队列长度
  size() {
    return this.count - this.lowestCount;
  }
  // 清空队列
  clear() {
    this.item = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  toString() {
    if(this.isEmpty()) {
      return '';
    }
    let objString = `${this.item[this.lowestCount]}`;
    for(let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.item[i]}`;
    }
    return objString;
  }
}


