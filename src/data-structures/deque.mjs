// 双端队列类
export default class Deque {
  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  // 判断队列是否为空
  isEmpty() {
    return this.size() === 0;
  }
  // 返回队列的长度
  size() {
    return this.count - this.lowestCount;
  }
  // 清空队列
  clear() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = {};
  }
  // 打印队列
  toString() {
    let objString = `${this.items[this.lowestCount]}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
  // 队列后端添加元素
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }
  // 队列前端添加元素
  addFront(element) {
    // case1: 双端队列为空，可以调用addBack简化代码
    if (this.isEmpty()) {
      this.addBack(element);
      // case2: 进行过前端删除操作，此时lowestCount > 0
    } else if (this.lowestCount > 0) {
      this.lowestCount--;
      this.items[this.lowestCount] = element;
      // case3: lowerCount = 0 可以按照数组处理，也可以使得负数键能够被使用（需要更新计算长度的逻辑）
    } else {
      // 按照数组处理
      for (let i = this.count; i > 0; i--) {
        this.item[i] = this.items[i - 1];
      }
      this.count++;
      this.item[0] = element;
    }
  }
  // 队列前端删除元素
  removeFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items[this.lowestCount];
    delete this.items[this.lowestCount];
    this.lowestCount++;
    return result
  }
  // 队列后端删除元素
  removeBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  // 返回队列前端的第一个元素
  peekFront() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.lowestCount];
  }
  // 返回队列后端的第一个元素
  peekBack() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1]
  }
}

