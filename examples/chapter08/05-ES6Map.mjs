// ES6原生Map类
const map = new Map();

map.set('Gandalf', 'gandalf@email.com');
map.set('John', 'johnsnow@email.com');
map.set('Tyrion', 'tyrion@email.com');

console.log(map.has('Gandalf')); // true
// !size作为属性使用
console.log(map.size); // 3
// !Map类的values()和keys()方法都返回Iterator
console.log(map.keys()); // MapIterator {"Gandalf", "John", "Tyrion"}
console.log(map.values()); // MapIterator {"gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"}
console.log(map.get('Tyrion')); // tyrion@email.com

map.delete('John');

console.log(map.keys()); // MapIterator {"Gandalf", "Tyrion"}
console.log(map.values()); // MapIterator {"gandalf@email.com", "tyrion@email.com"}

