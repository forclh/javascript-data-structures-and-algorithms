var set = new WeakSet();

// !元素只能使用对象
const ob1 = { name: 'Gandalf' };
const ob2 = { name: 'John' };
const ob3 = { name: 'Tyrion' };

set.add(ob1);
set.add(ob2);
set.add(ob3);

console.log(set.has(ob1)); // true
console.log(set.has(ob2)); // true
console.log(set.has(ob3)); // true

set.delete(ob2);
console.log(set.has(ob2)); // false

// !没有返回迭代器的方法