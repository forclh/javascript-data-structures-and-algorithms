import LinkedList from "./linked-list.mjs";
import { defaultCompare, Compare, defaultEquals } from "../../util.mjs";

// 有序链表类
export default class SortedLinkedList extends LinkedList {
  constructor(equalsFn = defaultEquals, compareFn = defaultCompare) {
    super(equalsFn);
    this.compareFn = compareFn;
  }
  // 返回插入元素应该在排序后链表中的位置
  getIndexNextSortedElement(element) {
    let current = this.head;
    let i = 0;  // 记录插入位置的索引
    for (; i < this.size(); i++) {
      const comp = this.compareFn(element, current.element);
      // 升序
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }
    // 最后一个位置（i = this.size()）
    return i;
  }

  // 插入元素（重构insert方法）
  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super.insert(element, index === 0 ? index : 0)  // 插入位置由内部决定，避免复写代码
    }
    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element, pos);
  }

  // 添加元素（重构push方法）
  push(element) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const pos = this.getIndexNextSortedElement(element);
      super.insert(element, pos);
    }
  }
}

const list = new SortedLinkedList();

list.push(1);
list.push(2);
list.push(3);
list.push(5);
console.log(list.toString());

list.insert(4);

console.log(list.toString());