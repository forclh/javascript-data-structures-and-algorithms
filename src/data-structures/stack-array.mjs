// 栈（基于数组）

export default class Stack {
  constructor() {
    this.items = [];
  }
  // 添加元素（栈顶）
  push(element) {
    this.items.push(element);
  }
  // 移除元素（栈顶）
  pop() {
    return this.items.pop();
  }
  // 查看栈顶元素
  peek() {
    return this.items[this.items.length - 1];
  }
  // 检查栈是否为空
  isEmpty() {
    return this.items.length === 0;
  }
  // 元素个数
  size() {
    return this.items.length;
  }
  // 清空栈
  clear() {
    this.items = [];
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
