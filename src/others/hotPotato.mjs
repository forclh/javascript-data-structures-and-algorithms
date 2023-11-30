// 队列
import Queue from '../data-structures/queue.mjs';


// 击鼓传花
function hotPotato(elementList, num) {
  const queue = new Queue();
  const eliminatedList = [];
  for (let i = 0; i < elementList.length; i++) {
    queue.enqueue(elementList[i]);
  }

  while(queue.size() > 1) {
    for(let i = 0; i < num; i++) {
      queue.enqueue(queue.dequeue());
    }
    eliminatedList.push(queue.dequeue());
  }
  // 返回一个对象
  return {
    eliminated: eliminatedList,
    winner: queue.dequeue(),
  }
}

const names = ['John', 'Jack', 'Camila', 'Ingrid', 'Carl'];
const result = hotPotato(names, 7);

result.eliminated.forEach(name => {
  console.log(`${name}在击鼓传花中被淘汰`);
})

console.log(`胜利者：${result.winner}`);