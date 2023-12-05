// ES6 原生的集合Set类

const set = new Set();
set.add(1);
console.log(set.values()); // !返回Iterator
console.log(set.has(1));
console.log(set.size);  // !size作为属性

set.add(2);
console.log(set.values()); // outputs [1, 2]
console.log(set.has(2)); // true
console.log(set.size); // 2

set.delete(1);
console.log(set.values()); // outputs [2]

const setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

const setB = new Set();
setB.add(2);
setB.add(3);
setB.add(4);


// --------- 并集 ----------
const union = (setA, setB) => {
  const unionSet = new Set();
  setA.forEach(value => unionSet.add(value));  // ! 可以直接对集合进行迭代
  setB.forEach(value => unionSet.add(value));
  return unionSet;
};

console.log(union(setA, setB));
// !使用扩展运算符进行并集运算
console.log(new Set([...setA, ...setB]));  // 通过传入数组初始化Set

// --------- 交集 ----------
const intersection = (setA, setB) => {
  const intersectionSet = new Set();
  setA.forEach(value => {
    if (setB.has(value)) {
      intersectionSet.add(value);
    }
  });
  return intersectionSet;
};

console.log(intersection(setA, setB));
// !使用扩展运算符进行交集运算
console.log(new Set([...setA].filter(value => setB.has(value))));


// --------- 差集 ----------
const difference = (setA, setB) => {
  const differenceSet = new Set();
  setA.forEach(value => {
    if (!setB.has(value)) {
      differenceSet.add(value);
    }
  });
  return differenceSet;
}

console.log(difference(setA, setB));
// !使用扩展运算符进行差集运算
console.log(new Set([...setA].filter(value => !setB.has(value))));

