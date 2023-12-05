import { Compare, defaultCompare } from '../util.mjs'
import { Node } from './models/node.mjs'


export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;  // 用于比较节点的值，可传入自定义的比较函数
    this.root = null;  // Node类型的根节点
  }
  // 向树中插入一个新的键
  insert(key) {
    if (this.root == null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left == null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else {
      if (node.right == null) {
        node.right = new Node(key);
      } else {
        this.insertNode(node.right, key);
      }
    }
  }

  // !在树中查找一个键，如果节点存在返回true，不存在返回false
  search(key) {
    return this.searchNode(this.root, key);
  }
  searchNode(node, key) {
    if (node == null) {
      return false;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key)
    } else {
      return true;
    }
  }

  // 通过中序遍历(上行遍历，从小到大)方式遍历所有的节点
  inOrderTraverse(callback) {  // 回调函数定义对遍历到的每一个节点的操作
    this.inOrderTraverseNode(this.root, callback);
  }
  inOrderTraverseNode(node, callback) {
    // !左中右
    if (node != null) {  // 停止递归执行的基线条件
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  // 通过先序遍历方式遍历所有的节点
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  preOrderTraverseNode(node, callback) {
    // !中左右
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  // 通过后续遍历方式遍历所有的节点
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  postOrderTraverseNode(node, callback) {
    // !左右中
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  // 返回树中最小的键
  min() {
    return this.minNode(this.root)
  }
  minNode(node) {
    let current = node;
    while (current != null && current.left != null) {  // current != null是为了防止根节点为空
      current = current.left;
    }
    return current;
  }

  // 返回树中最大的键
  max() {
    return this.maxNode(this.root);
  }
  maxNode(node) {
    let current = node;
    while (current != null && current.right != null) {
      current = current.right;
    }
    return current;
  }

  // !从树中移除某个键
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  removeNode(node, key) {
    if (node == null) {
      return null;
    }
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key); //!
      return node; //!
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      // case 1:叶节点
      if (node.left == null && node.right == null) {
        node = null;
        return node;
      }
      // case 2:有一个左侧或者右侧子节点的节点
      if (node.left == null) {
        node = node.right;
        return node;
      } else if (node.right == null) {
        node = node.left;
        return node;
      }
      // case 3:移除有两个子节点的节点
      const aux = this.minNode(node.right);  // 找到右子树的最小值，作为继承者
      node.key = aux.key; // 覆盖当前节点为右子树最小值
      node.right = this.removeNode(node.right, aux.key);  // 删除右子树的最小节点
      return node;
    }
  }
}