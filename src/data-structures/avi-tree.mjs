import { Compare, defaultCompare } from '../util.mjs';
import BinarySearchTree from './binary-search-tree.mjs';
import { Node } from './models/node.mjs';

const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5,
}

export default class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    super(compareFn);
  }
  // 返回节点的高度
  getNodeHeight(node) {
    if (node === null) {
      return -1;
    }
    return Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) + 1;
  }
  // 计算节点的平衡因子
  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_RIGHT;
      default:
        return BalanceFactor.BALANCED;
    }
  }
  // 左子树重且左子树左侧重
  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   */
  rotationLL(node) {
    const temp = node.left;
    node.left = temp.right;
    temp.right = node;
    return temp;
  }
  // 右子树重且右子树右侧重
  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   */
  rotationRR(node) {
    const temp = node.right;
    node.right = temp.left;
    temp.left = node;
    return node;
  }
  // 左子树重且左子树右侧重（先左转后右转）
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }
  // 右子树重且右子树左侧重（先右转后左转）
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
  }
  // !插入节点操作
  insert(key) {
    this.root = this.insertNode(this.root, key);
  }
  // !
  insertNode(node, key) {
    if (node == null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // 重复值
    }

    // 如果需要，将树进行平衡操作
    const balanceFactor = this.getBalanceFactor(node);
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        // 左子树重且左子树左侧重
        node = this.rotationLL(node);
      } else {
        // 左子树重且左子树右侧重
        return this.rotationLR(node);
      }
    }
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        // 右子树重且右子树右侧重
        node = this.rotationRR(node);
      } else {
        // 右子树重且右子树左侧重
        return this.rotationRL(node);
      }
    }
    // !
    return node;
  }
}