// 判断传入的两个变量是否相等
export function defaultEquals(a, b) {
  return a === b;
}

export const Compare = {
  LESS_THAN: -1,
  BIGGER_THAN: 1,
}

// 比较传入的两个变量的大小
export function defaultCompare(a, b) {
  if(a === b) {
    return 0;
  }
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

// ?将传入的变量转换为字符串
export function defaultToString(item) {
  if(item === null) {
    return 'NULL';
  } else if(item === undefined) {
    return 'UNDEFINED';
  } else if(typeof item === 'string' || item instanceof String) {
    return `${item}`;
  }
  return item.toString();
}