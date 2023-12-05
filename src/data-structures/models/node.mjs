// 树的节点类
export class Node {
  constructor(key) {
    this.key = key;  // 节点值
    this.left = null;  // 左侧子节点的引用
    this.right = null;  // 右侧子节点的引用
  }
}