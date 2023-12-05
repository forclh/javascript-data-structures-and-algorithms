// 循环实现阶乘
function factorialIterative(number) {
  if (number < 0) return undefined;
  let total = 1;
  for (let n = number; n > 0; n--) {
    total = total * n;
  }
  return total;
}

console.log('factorialIterative(5): ', factorialIterative(5));
console.log('factorialIterative(3): ', factorialIterative(3));


// 递归实现阶乘
function factorial(n) {
  // 基线条件
  if (n === 1 || n === 0) {
    return 1;
  }
  // 递归调用
  return n * factorial(n - 1);
}
console.log('factorialIterative(5): ', factorialIterative(5));