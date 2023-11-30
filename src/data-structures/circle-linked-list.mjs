import { defaultEquals } from "../../util.mjs";
import LinkedList from "./linked-list.mjs";
import { Node } from "./models/linked-list-models.mjs";

// 循环链表类
export default class CircleLinkedList extends LinkedList{
  constructor(equalsFn = defaultEquals) {
    super(equalsFn);
  }

  // 在任意位置插入新元素
  insert(element, index) {
    if(index < 0 || index > this.count) {
      return false;
    }

    const node = new Node(element);
    let current = this.head;
    // case1: 插入到第一个元素
    if(index === 0) {
      // case1.1: 链表为空
      if(this.head == null) {
        this.head = node;
        node.next = this.head;
        // case1.2: 链表非空
      } else {
        node.next = current;
        current = this.getElementAt(this.count - 1);  // 获取最后一个元素
        this.head = node;
        current.next = this.head;
      } 
      // case2: 循环链表在最后插入和中间插入的逻辑一样，同链表
    } else {
      const previous = this.getElementAt(index - 1);
      node.next = previous.next;
      previous.next = node;
    }
    this.count++;
    return true;
  }

  // 从任意位置移除元素
  removeAt(index) {
    if(index < 0 || index >= this.count) {
      return undefined;
    }
    let current =  this.head;
    // case1: 删除第一个元素
    if(index === 0) {
      // case1.1: 链表只有一个元素
      if(this.size() === 1) {
        this.head = undefined;
        // case1.2: 链表不止一个元素（需要考虑尾元素的next指针）
      } else {
        const removed = this.head;
        current = this.getElementAt(this.size() - 1);
        this.head = this.head.next;
        current.next = this.head;
        current = removed;  // 用于后续返回
      }
      // case2: 删除其他元素
    } else {
      const previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }
    this.count--;
    return current.element;
  }

  // 增加元素
  push(element) {
    const node = new Node(element);
    let current;
    if(this.head == null) {
      this.head = node;
    } else {
      current = this.getElementAt(this.size() - 1);
      current.next = node;
    }
    node.next = this.head;
    this.count++;
  }
}

const circleList = new CircleLinkedList();

// circleList.insert(3, 0);
// circleList.insert(2, 0);
// circleList.insert(1, 0);
// circleList.insert(4, 3);

// console.log(circleList.removeAt(0));
// console.log(circleList.removeAt(2));

// circleList.push(1);
// circleList.push(2);
// circleList.push(3);
// circleList.push(4);

// console.log(circleList.toString());