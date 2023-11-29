// 基于对象的Stack类
import Stack from '../data-structures/stack.mjs';


// 进制转换算法

function baseConverter(decNumber, base) {
  const remStack = new Stack();
  const digits = '0123456789abcdefghijklmnopqrstuvwxyz';
  let rem;
  let number = decNumber;
  let baseString = '';

  if((base < 2) || (base > 36)) {
    return '';
  }
  while(number !== 0) {
    rem = Math.floor(number % base);
    remStack.push(rem);
    number = Math.floor(number / base);
  }

  while(!remStack.isEmpty()) {
    baseString += digits[remStack.pop()];
  }
  return baseString;
}


console.log(baseConverter(100345, 2));
console.log(baseConverter(100345, 8));
console.log(baseConverter(100345, 16));
console.log(baseConverter(100345, 35));

