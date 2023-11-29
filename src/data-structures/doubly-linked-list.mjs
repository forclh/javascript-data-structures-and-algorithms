import { defaultEquals } from "../../util.mjs";
import { DoublyNode } from "./models/linked-list-models.mjs";
import LinkedList from "./linked-list.mjs";

export default class DoublyLinkedList extends LinkedList{
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);  // 调用LinkedList的构造函数
    this.tail = undefined;
  }
  // 在任意位置插入元素
  insert(element, index) {
    // 索引越界检查
    if(index < 0 || index > this.count) {
      return false;
    }
    const node = new DoublyNode(element);
    let current;
    // case1: 插入到第一个
    if(index === 0) {
      // case1.1: 双向链表为空
      if(this.head == null) {
        this.head = node;
        this.tail = node;
      } else {
        // case1.2: 双向链表不为空
        current = this.head;   // 定义当前聚焦的元素
        node.next = current;
        current.prev = node;
        this.head = node;  // 更新头指针
      }
      // case2: 插入到最后一个
    } else if(index === this.count) {
      current = this.tail;  // 定义当前聚焦的元素
      current.next = node;
      node.prev = current;
      this.tail = node; // 更新尾指针
      // case3: 插入中间位置
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      node.next = current;
      previous.next = node;
      current.prev = node;
      node.prev = previous;
    }
    this.count++;
    return true;
  }

  // 从任意位置移除元素
  removeAt(index) {
    if(index < 0 || index >= this.count) {
      return undefined;
    }

    let current;  // 定义焦点节点
    // case1: 移除第一个元素
    if(index === 0) {
      current = this.head;
      this.head = current.next;
      // case1.1: 只有一个元素，被删除后需要调整tail指针
      if(this.count === 1) { 
        this.tail = undefined;
      } else {
        this.head.prev = undefined;
      }
      // case2: 移除最后一个元素
    } else if(index === this.count - 1) {
      current = this.tail;
      this.tail = current.prev;
      this.tail.next = undefined;
      // case3：删除中间元素
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
      current.next.prev = previous;
    }
    this.count--;
    return current.element;
  }

  // 添加节点
  push(element) {
    const node = new DoublyNode(element);
    // case1：空双向链表
    if(this.head == null) {
      this.head = node;
      this.tail = node;
      // case2：非空双向链表
    } else {
      this.tail.next = node;
      node.prev = this.tail;
      this.tail = node;
    }
    this.count++;
  }

  // 返回给定元素的索引(应该可以优化)
  indexOf(element) {
    let current = this.head;
    let index = 0;
    while(current != null) {
      if(this.equalsFn(current.element, element)) {
        return index;
      }
      index++;
      current = current.next;
    }
    return -1;
  }

  // 返回头节点
  getHead() {
    return this.head;
  }

  // 返回尾节点
  getTail() {
    return this.tail;
  }

  // 清空双向链表
  clear() {
    super.clear();
    this.tail = undefined;
  }

  // 打印双向链表
  toString() {
    if(this.head == null) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    while(current != null) {
      objString = `${objString} -> ${current.element}`;
      current = current.next;
    }
    return objString;
  }

  // 反向打印双向链表
  inverseToString() {
    if(this.tail == null) {
      return '';
    }
    let objString = `${this.tail.element}`;
    let current = this.tail.prev;
    while(current != null) {
      objString = `${objString} -> ${current.element}`;
      current = current.prev;
    }
    return objString;
  }

}

// const doublyList = new DoublyLinkedList();

// doublyList.push(1);
// doublyList.push(2);
// doublyList.push(3);
// doublyList.push(5);
// doublyList.push(7);

// console.log(doublyList.indexOf(3));
// console.log(doublyList.indexOf(2));
// console.log(doublyList.indexOf(7));
// console.log(doublyList.indexOf(9));
// console.log(doublyList.insert(3, 0))
// console.log(doublyList.insert(2, 0))
// console.log(doublyList.insert(1, 2))

// doublyList.insert(10, 5);
// doublyList.insert(11, 3);

// console.log(doublyList.toString());
// console.log(doublyList.inverseToString());