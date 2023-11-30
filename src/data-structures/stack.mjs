// 基于对象的栈类
export default class Stack {
  constructor() {
    this.items = {};
    this.count = 0;
  }
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  isEmpty() {
    return this.count === 0;
  }
  size() {
    return this.count;
  }
  pop() {
    if(this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }
  peek() {
    return this.items[this.count - 1];
  }
  clear() {
    this.items = {};
    this.count = 0;
  }
  toString() {
    if(this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[0]}`;
    for(let i = 1; i < this.count; i++) {
      objString = `${objString}, ${this.items[i]}`;
    }
    return objString;
  }
}

// 测试
const stack = new Stack();
console.log(stack.isEmpty());

stack.push(1);
stack.push(2);
stack.push(3);

console.log(stack.peek());
console.log(stack.pop());
console.log(stack.size());
console.log(stack.toString());