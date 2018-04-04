/*
* @Author: wangjing
* @Date:   2018-04-04 10:07:31
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-04 16:47:56
*/
/*比较数组和链表：
数组的大小是固定的（在大多数语言中），从数组的起点和中间插入或移除项的成本很高，因为需要移动元素；
链表由一个存储元素本身的节点和一个指向下一个节点的引用组成。添加或移动元素时不需要移动其他元素，而是使用指针从起点开始迭代直到找到所需元素。*/

// 创建链表
function LinkedList() {

	// 要加入链表的项，包括值和指针
	let Node = function(element) {
		this.element = element;
		this.next = null;
	}

	// 链表的属性length
	let length = 0;
	// 第一个节点的引用
	let head = null;

	// 向链表尾部添加元素
	this.append = function(element) {
		let node = new Node(element), current;

		if (head === null) {
			head = node;
		} else {
			current = head;

			while (current.next) {
				current = current.next;
			}

			current.next = node;
		}

		length++;
	};

	// 从任意位置移除元素
	this.removeAt = function(position) {

		if (position > -1 && position < length) {

			let current = head, previous, index = 0;

			if (position === 0) {
				head = current.next;
			} else {
				while (index++ < position) {
					previous = current;
					current = current.next;
				}
				previous.next = current.next;
			}
			length--;

			return current.element;
		} else {
			return null;
		}
	};

	// 从任意位置插入元素
	this.insert= function(position, element) {
		if (position >= 0  &&  position <= length) {
			let node = new Node(element), current = head, previous, index = 0;
			if (position === 0) {
				node.next = current;
				head = node;
			} else {
				while (index++ < position) {
					previous = current;
					current = current.next;
				}
				node.next = current;
				previous.next = node;
			}
			length++;
			return true;
		} else {
			return false;
		}
	};

	// 输出元素
	this.toString = function() {
		let current = head;
		string = '';

		while(current) {
			string += current.element + (current.next ? '\n' : '');
			current = current.next;
		}
		return string;
	};


	// 返回元素位置
	this.indexOf = function(element) {
		let current = head, index = -1;

		while (current) {
			if (element === current.element) {
				return index;
			}
			index++;
			current = current.next;
		}

		return -1;
	};

	// 移除元素
	this.remove = function(element) {
		let index = this.indexOf(element);
		return this.removeAt(index);
	};

	// 判断是否为空
	this.isEmpty = function() {
		return length === 0;
	};

	// 取得链表的长度
	this.size = function() {
		return length;
	};

	// 取得链表的头
	this.getHead = function() {
		return head;
	};
}

let linkedlist = new LinkedList;
console.log(linkedlist.isEmpty());
linkedlist.append('a');
linkedlist.append('b');
linkedlist.append('c');
linkedlist.append('d');
linkedlist.append('e');
linkedlist.append('f');
console.log(linkedlist.size());
linkedlist.remove('a');
console.log(linkedlist.getHead());
linkedlist.removeAt('2');
console.log(linkedlist.toString());
linkedlist.insert(2,'mm');
console.log(linkedlist.toString());

// 双向链表：连接是双向的，一个链向后一个元素，一个链向前一个元素
function DoublyLinkedList() {

	let Node = function(element) {
		this.element = element;
		this.prev = null;
		this.next = null;
	};

	let length = 0;
	let head = null;
	let tail = null;

	this.append = function(element) {
		let node = new Node(element),
		current;

		if (head === null) {
			head = node;
		} else {
			current = head;

			while (current.next) {
				current = current.next;
			}

			current.next = node;
			node.prev = current;
			tail = node;
		}

		length ++;
	}

	// 向任意位置插入元素
	this.insert = function(position, element) {
		if (position >= 0 && position <=length) {

			let node = new Node(element),
			current = head,
			previous,
			index = 0;

			if (position === 0) {
				if (!head) {
					head = node;
					tail = node;
				} else {
					node.next = current;
					current.prev = node;
					head = node;
				}
			} else if (position === length) {
				current = tail;
				current.next = node;
				node.prev = current;
				tail = node;
			} else {
				while (++index < position) {
					previous = current;
					current = current.next;
				}
				node.next = current;
				node.prev = previous;
				current.prev = node;
				previous.next = node;
			}

			length++;
			return true;			
		} else {
			return false;
		}
	};


	// 从任意位置移除元素
	this.removeAt = function(position) {

		if (position >= 0 && position <= length) {

			let current = head,
			previous,
			index = 0;

			if (position === 0) {
				head = current.next;

				if (length === 1) {
					tail = null;
				} else {
					head.prev = null;
				}
			} else if (position === length-1) {
				current = tail;
				tail = current.prev;
				tail.next = null;
			} else {
				while (index++ < position) {
					previous = current;
					current = current.next;
				}

				previous.next = current.next;
				current.next.prev = previous;
			}

			length--;
			return current.element;
		} else {
			return null;
		}
	};

	// 输出元素
	this.toString = function() {
		let current = head;
		let string = '';
		while (current) {
			string += current.element + (current.next ? '\n' : '');
			current = current.next;
		}
		return string;
	};

	this.indexOf = function (element) {
		let current = head,
		index = 0;

		while(current) {
			if (current.element === element) {
				return index;
			}
			current = current.next;
			index++;
		}
		return -1;
	};

	this.remove = function(element) {
		let index = this.indexOf(element);
		return this.removeAt(index);
	};

	this.isEmpty = function() {
		return length === 0;
	};

	this.size = function() {
		return length;
	};

	this.getHead = function() {
		return head;
	};

	this.getTail = function() {
		return tail;
	};

}
let linkedlist = new DoublyLinkedList;
console.log(linkedlist.isEmpty());
linkedlist.append('a');
linkedlist.append('b');
linkedlist.append('c');
linkedlist.append('d');
linkedlist.append('e');
linkedlist.append('f');
console.log(linkedlist.size());
linkedlist.remove('a');
console.log(linkedlist.getHead());
linkedlist.removeAt('2');
console.log(linkedlist.toString());
linkedlist.insert(2,'mm');
console.log(linkedlist.toString());

