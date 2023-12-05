import BinarySearchTree from "../../src/data-structures/binary-search-tree.mjs";

const tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

const printNode = (value) => console.log(value);
tree.inOrderTraverse(printNode);
tree.preOrderTraverse(printNode);
tree.postOrderTraverse(printNode);

console.log(tree.max())
console.log(tree.min())

console.log(tree.search(1) ? 'key 1 found' : 'key 1 not found');
console.log(tree.search(8) ? 'key 8 found' : 'key 2 not found');

tree.remove(6);
tree.inOrderTraverse(printNode);
tree.remove(5);
tree.inOrderTraverse(printNode);
tree.remove(15);
tree.inOrderTraverse(printNode);