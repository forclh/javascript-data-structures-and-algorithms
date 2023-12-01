import DoublyLinkedList from "./doubly-linked-list.mjs";
// 基于双向链表的栈
export default class StackLinkedList {
  constructor() {
    this.items = new DoublyLinkedList();
  }

  push(element) {
    this.items.push(element);
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.removeAt(this.size() - 1);
  }
  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    // return this.items.getElementAt(this.size() - 1).element;
    return this.items.tail.element;
  }
  isEmpty() {
    return this.items.isEmpty();
  }
  size() {
    return this.items.size();
  }
  clear() {
    this.items.clear();
  }
  toString() {
    return this.items.toString()
  }
}

// const list = new StackLinkedList();

// console.log(list.isEmpty());
// list.push(1);
// list.push(2);
// list.push(3);
// list.push(4);
// console.log(list.toString());
// console.log(list.pop());
// console.log(list.peek());
// console.log(list.size());

