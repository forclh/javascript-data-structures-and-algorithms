// 迭代
function fibonacciIterator(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  let fibNMinus2 = 0;
  let fibNMinus1 = 1;
  let fibN = n;
  for (let i = 2; i <= n; i++) {
    fibN = fibNMinus1 + fibNMinus2; // f(n) = f(n-1) + f(n-1)
    fibNMinus2 = fibNMinus1;
    fibNMinus1 = fibN;
  }
  return fibN;
}
console.log('fibonacciIterator(2)', fibonacciIterator(2));
console.log('fibonacciIterator(3)', fibonacciIterator(3));
console.log('fibonacciIterator(4)', fibonacciIterator(4));
console.log('fibonacciIterator(5)', fibonacciIterator(5));
// 递归
function fibonacci(n) {
  if (n < 1) return 0;
  if (n <= 2) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log('fibonacci(2)', fibonacci(2));
console.log('fibonacci(3)', fibonacci(3));
console.log('fibonacci(4)', fibonacci(4));
console.log('fibonacci(5)', fibonacci(5));
// !记忆化斐波那契额数列
function fibonacciMemoization(n) {
  const memo = [0, 1];  // 缓存所有的计算结果
  const fibonacci = (n) => {
    if (memo[n] != null) return memo[n];  // 如果已经被缓存了就返回
    return memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);  // 如果没有被缓存则加入缓存
  };
  return fibonacci(n);
}
console.log('fibonacciMemoization(2)', fibonacciMemoization(2));
console.log('fibonacciMemoization(3)', fibonacciMemoization(3));
console.log('fibonacciMemoization(4)', fibonacciMemoization(4));
console.log('fibonacciMemoization(5)', fibonacciMemoization(5));