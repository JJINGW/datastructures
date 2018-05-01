/*
* @Author: wangjing
* @Date:   2018-04-03 17:37:05
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-03 21:26:29
*/
// 创建队列
function Queue() {
	let items = [];

	// 向队列添加元素
	this.enqueue = function(element) {
		items.push(element);
	};

	// 从队列移除元素
	this.dequeue = function() {
		return items.shift();
	};

	// 查看队列头元素
	this.front = function() {
		return items[0];
	};

	// 检查队列是否为空
	this.isEmpty = function() {
		return items.length === 0;
	}

	// 查看队列的长度
	this.size = function() {
		return items.length;
	}


	// 打印队列元素
	this.print =function() {
		console.log(items.toString());
	};	
}

let queue = new Queue2();
console.log(queue.isEmpty());
queue.enqueue('John');
queue.enqueue('Jack');
queue.enqueue('Camila');
queue.print();
console.log(queue.size());
console.log(queue.isEmpty());
queue.dequeue();
queue.dequeue();
queue.print();


// 用ES6语法实现Queue
let Queue2 = ( function () {
	const _items = new WeakMap();
	const _count = new WeakMap();

	class Queue2 {
		constructor () {
			_items.set(this, {});
			_count.set(this, 0);
		}
		enqueue(element) {
			const items = _items.get(this);
			const count = _count.get(this);
			items[count] =element;
			_count.set(this, count+1);
		}
		dequeue() {
			if (this.isEmpty()) {
				return undefined;
			}
			const items = _items.get(this);
			let count = _count.get(this);
			--count;
			_count.set(this, count);
			const result = items[count];
			delete items[count];
			return result;
		}
		front() {
			if (this.isEmpty()) {
				return undefined;
			}
			const items = _items.get(this);
			const count = _conut.get(this);
			return items[count-1];
		}
		isEmpty() {
			return _count.get(this) === 0;
		}
		size() {
			return _count.get(this);
		}
		claer() {
			// while (!thiis.isEmpty()) {
			// 	this.pop();
			// }
			_count.set(this, 0);
			_items.set(this, {});
		}
		toString() {
			if (this.isEmpty()) {
				return '';
			}
			const items = _items.get(this);
			const count = _count.get(this);
			let objString = `${items[0]}`;
			for (let i=1; i<count; i++) {
				objString = `${objString}, ${items[i]}`;
			}
			return objString;
		}
		return Queue2;
	}
}) ();


// 优先队列，设置优先级，级别高的优先入队和出队，最小优先队列
function PriorityQueue() {
	let items = [];
	function QueueElement (element, priority) {
		this.element = element;
		this.priority = priority;
	}

	this.enqueue = function(element, priority) {
		let queueElement = new QueueElement(element, priority);

		let added = false;
		for (let i=0; i<items.length; i++) {
			if (queueElement.priority < items[i].priority) {
				items.splice(i, 0, queueElement);
				added = true;
				break;
			}
		}
		if (!added) {
			items.push(queueElement);
		}

	};

	this.print = function() {
		for (let i=0; i<items.length; i++) {
			console.log(`${items[i].element} - ${items[i].priority}`);
		}
	};
}

let priorityQueue = new PriorityQueue();
priorityQueue.enqueue('John',2);
priorityQueue.enqueue('Jack',1);
priorityQueue.enqueue('Jony',1);
priorityQueue.enqueue('Jay',2);
priorityQueue.print();


function Queue() {
	let items = [];

	// 向队列添加元素
	this.enqueue = function(element) {
		items.push(element);
	};

	// 从队列移除元素
	this.dequeue = function() {
		return items.shift();
	};

	// 查看队列头元素
	this.front = function() {
		return items[0];
	};

	// 检查队列是否为空
	this.isEmpty = function() {
		return items.length === 0;
	}

	// 查看队列的长度
	this.size = function() {
		return items.length;
	}


	// 打印队列元素
	this.print =function() {
		console.log(items.toString());
	};	
}

// 循环队列-击鼓传花hotPotato
function hotPotato(nameList, num) {

	let queue = new Queue;

	for (let i=0; i<nameList.length; i++) {
		queue.enqueue(nameList[i]);
	}

	let eliminated = '';
	while (queue.size() > 1) {
		for (let i=0; i<num; i++) {
			queue.enqueue(queue.dequeue());
		}
		eliminated = queue.dequeue();
		console.log(eliminated + '在击鼓传花游戏中被淘汰。');
	}
	console.log('The winner is ' + queue.dequeue());
}

let names = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];
let sequence = hotPotato(names, 8);
