const map = new WeakMap();

// !只能用对象作为键
const ob1 = { name: 'Gandalf' };
const ob2 = { name: 'John' };
const ob3 = { name: 'Tyrion' };

map.set(ob1, 'gandalf@email.com');
map.set(ob2, 'johnsnow@email.com');
map.set(ob3, 'tyrion@email.com');
// !只能用对象作为键对值进行操作
console.log(map.has(ob1)); // true
console.log(map.has(ob2)); // true
console.log(map.has(ob3)); // true

console.log(map.get(ob3)); // tyrion@email.com

map.delete(ob2);
console.log(map.has(ob2)); // false

// !没有返回迭代器的方法
