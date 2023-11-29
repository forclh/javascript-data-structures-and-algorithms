// 双端队列
import Deque from '../data-structures/deque.mjs';


// 回文数检查

function palindromeChecker(aString) {
  // 字符检查
  if(aString === undefined || aString === null || (aString !== null && aString.length === 0)) {
    return false;
  }
  const deque = new Deque();
  // 字符串清洗
  const lowerString = aString.toLocaleLowerCase().split(' ').join('');
  let firstChar, lastChar;
  let isEqual = true;
  // 构建双端队列
  for(let i = 0; i < lowerString.length; i++) {
    deque.addBack(lowerString.charAt(i));
  }
  // 回文数检查
  while(deque.size() > 1 && isEqual) {
    firstChar = deque.removeFront();
    lastChar = deque.removeBack();
    if(firstChar !== lastChar) {
      isEqual = false;
    }
  }
  return isEqual;
}

console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));
