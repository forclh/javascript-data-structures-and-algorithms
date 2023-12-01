import { defaultEquals } from "../../util.mjs";
import { Node } from "./models/linked-list-models.mjs";

// 链表类
export default class LinkedList {
  constructor(equalsFn = defaultEquals) {
    this.count = 0;  // 记录链表元素个数
    this.head = undefined;  // 初始化链表头
    this.equalsFn = equalsFn;  // 默认用于比较链表内部元素是否相等的函数（indexOf方法）
  }
  // 迭代链表找到目标索引的节点
  getElementAt(index) {
    // 索引越界
    if (index < 0 || index >= this.count) {
      return undefined;
    }
    let current = this.head;
    for (let i = 0; i < index; i++) {
      current = current.next;
    }
    return current;
  }
  // 向链表尾部添加元素
  push(element) {
    const node = new Node(element);
    // case1: 链表为空，使用==包含null和undefined的情况
    if (this.head == null) {
      this.head = node;
    } else {
      // case2: 链表不为空
      let current = this.head;  // 记录链表中当前元素，用于迭代链表
      while (current.next != null) {
        current = current.next;
      }
      current.next = node;
    }
    this.count++;  // 增加链表元素个数
  }
  // 根据索引移除元素
  // removeAt(index) {
  //   // 检查索引越界
  //   if(index < 0 || index >= this.count) {
  //     return undefined;
  //   }
  //   // case1: 移除第一项
  //   let current = this.head;
  //   if(index === 0) {
  //     this.head = current.next;
  //   } else {
  //     // case2: 移除其他项
  //     let previous;
  //     for(let i = 0; i < index; i++) {
  //       previous = current;   // 用于记录当前元素前一项
  //       current = current.next  // 迭代获取待移除的项
  //     }
  //     previous.next = current.next;  // 删除元素
  //   }
  //   this.count--;  // 元素个数减1
  //   return current.element;  // 返回删除的元素值
  // }

  // 重构removeAt
  removeAt(index) {
    // 检查索引越界
    if (index < 0 || index >= this.count) {
      return undefined;
    }
    // case1: 移除第一项
    let current = this.head;
    if (index === 0) {
      this.head = current.next;
    } else {
      // case2: 移除其他项
      let previous = this.getElementAt(index - 1);
      current = previous.next;
      previous.next = current.next;
    }
    this.count--;  // 元素个数减1
    return current.element;  // 返回删除的元素值
  }

  // 插入元素到任意位置
  insert(element, index) {
    // 插入最后一个位置的时候，索引应该与链表的长度相等
    if (index < 0 || index > this.count) {
      return false;  // 索引越界插入失败
    }

    const node = new Node(element);
    // case1: 开头插入
    if (index === 0) {
      node.next = this.head;
      this.head = node;
    } else {
      const previous = this.getElementAt(index - 1);
      const current = previous.next;
      previous.next = node;
      node.next = current;
    }
    this.count++;
    return true;  // 插入成功
  }

  // 返回一个元素的索引
  indexOf(element) {
    let current = this.head;
    // 为了确保不会发生运行时错误，验证current的变量是否为null或者undefined
    for (let i = 0; i < this.count && current != null; i++) {
      if (this.equalsFn(current.element, element)) {
        return i;
      }
      current = current.next;
    }
    return -1;
  }

  // 从移除指定元素
  remove(element) {
    return this.removeAt(this.indexOf(element));
  }

  // 返回链表元素个数
  size() {
    return this.count;
  }

  // 判断链表是否为空
  isEmpty() {
    return this.size() === 0;
  }

  // 获取链表的头节点(用于在类的外部迭代列表，假设JS支持私有属性)
  getHead() {
    return this.head
  }

  // 打印链表(将LinkedList对象转换为字符串)
  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.head.element}`
    let current = this.head.next
    for (let i = 1; i < this.size(); i++) {
      objString = `${objString} -> ${current.element}`;
      current = current.next;
    }
    return objString;
  }
}


// 测试
// const list = new LinkedList();

// list.push('1');
// list.push('2');
// list.push('3');
// list.push('4');
// list.push('5');
// list.push('6');

// console.log(list.removeAt(0));
// console.log(list.removeAt(4));

// console.log(list.getElementAt(0));
// console.log(list.getElementAt(5));
// console.log(list.getElementAt(6));

// console.log(list.insert(10, 6));
// console.log(list.insert(11, 0));

// console.log(list.indexOf('6'));
// console.log(list.indexOf('1'));
// console.log(list.indexOf('4'));

// console.log(list.remove('5'));

// console.log(list.toString());