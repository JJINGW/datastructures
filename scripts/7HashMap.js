/*
* @Author: wangjing
* @Date:   2018-04-10 21:35:09
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-11 19:59:51
*/
// 散列算法的作用是尽可能快的在数据结构中找到一个值。
// 散列函数的作用是给定一个键值，然后返回在表中的位置。

// "lose lose"散列函数：将每个键值的每个字母的ASCII值相加。
function HashTable() {
	var table = [];

	// 散列函数
	var loseloseHashCode = function(key) {
		var hash = 0;
		for(var i=0; i<key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash % 37;
	};

	// 添加新项
	this.put = function(key, value) {
		var position = loseloseHashCode(key);
		console.log(position + '-' + key);
		table[position] = value;
	};

	// 查找
	this.get = function(key) {
		return table[loseloseHashCode(key)];
	};

	// 根据键值从散列表中移除值
	this.remove = function(key) {
		table[loseloseHashCode(key)] = undefined;
	};

}
var hash = new HashTable();
hash.put('Gandalf','gandalf@email.com');
hash.put('John','johnsnow@emial.com');
hash.put('Tyrion','tyrion@email.com');
console.log(hash.get('Gandalf'));
console.log(hash.get('Loiane'));
hash.remove('Gandalf');
console.log(hash.get('Gandalf'));

// 不同的值在散列表中可能对应相同的位置，称为冲突。
// 处理方法：分离链接、线性探查和双散列法

// 分离链接：为散列表的每一个位置创建一个链表并将元素存储在里面。
// 处理冲突最简单的方法，但在HashTable实例之外还需要额外的存储空间
function HashTable() {
	var table = [];

	// 新的辅助类来表示将要加入LinkedList实例的元素
	var ValuePair = function(key, value) {
		this.key = key; 
		this.value = value;

		this.toString = function() {
			return '[' + this.key + '-' + this.value + ']';
		}
	};

	// 散列函数
	var loseloseHashCode = function(key) {
		var hash = 0;
		for(var i=0; i<key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash % 37;
	};

	// 添加新项
	this.put = function(key, value) {
		var position = loseloseHashCode(key);
		console.log(position + '-' + key);
		if ((table[position]) == undefined) {
			table[position] = new LinkedList();
		}
		table[position].append(new ValuePair(key, value));
	};

	// 查找
	this.get = function(key) {
		var position = loseloseHashCode(key);

		if (table[position] !== undefined) {

			var current = table[position].getHead();
			while(current.next) {
				if (current.element.key === key) {
					return current.element.value;
				}
				current = current.next;
			}

			if (current.element.key === key) {
				return current.element.value;
			}
		}

		return undefined;
	};

	// 根据键值从散列表中移除值
	this.remove = function(key) {
		var position = loseloseHashCode(key);

		if (table[position] !== undefined) {
			var current = table[position].getHead();
			while (current.next) {
				if (current.element.key === key) {
					table[position].remove(current.element);
					if (table[position].isEmpty()) {
						table[position] = undefined;
					}
					return true;
				}
				current = current.next;
			}

			if(current.element.key === key) {
				table[position].remove(current.element);
				if (table[position].isEmpty()) {
					table[position] = undefined;
				}
				return true;
			}
		}

		return false;
	};

}

// 线性探查
function HashTable() {
	var table = [];

	// 新的辅助类来表示将要加入实例的元素
	var ValuePair = function(key, value) {
		this.key = key; 
		this.value = value;

		this.toString = function() {
			return '[' + this.key + '-' + this.value + ']';
		}
	};

	// 散列函数
	var loseloseHashCode = function(key) {
		var hash = 0;
		for(var i=0; i<key.length; i++) {
			hash += key.charCodeAt(i);
		}
		return hash % 37;
	};

	// 添加新项
	this.put = function(key, value) {
		var position = loseloseHashCode(key);
		console.log(position + '-' + key);
		
		if (table[position] == undefined) {
			table[position] = new ValuePair(key, value);
		} else {
			var index = ++position;
			while (table[index] != undefined) {
				++index;
			}
			table[index] = new ValuePair(key, value);
		}
	};

	// 查找
	this.get = function(key) {
		var position = loseloseHashCode(key);

		if (table[position] != undefined) {
			if (table[position].key === key) {
				return table[position].value;
			} else {
				var index == ++position;
				while (table[index] === undefined || table[index].key !== key) {
					index++;
				}
				if (table[index].key === key) {
					return table[index].value;
				}
			}
		}
		return undefined;
	};

	// 根据键值从散列表中移除值
	this.remove = function(key) {
		var position = loseloseHashCode(key);
		if (table[position] !== undefined) {
			if (table[position].key === key) {
				table[position] = undefined;
			} else {
				var index = ++positon;
				if (table[index] = undefined || table[index].key !== key) {
					index++;
				}
				if (table[index].key === key) {
					table[index] = undefined;
				}
			}
		}
		return false;
	};

}


// 创建更好的散列函数:djb2,最受社区推崇的散列函数之一
// 5381为质数，大多数实现都采用
// 33用来当作一个魔力数
// 1013为质数，比我们认为的散列表的大小要大
var djb2HashCode = function(key) {
	var hash = 5381;
	for (var i=0; i<key.length; i++) {
		hash = hash * 33 + key.charCodeAt(i);
	}
	return hash % 1013;
};

// ES6,WeakMap类和WeakSet类，是弱化的，用对象作为键，没有entries、keys和values等方法
// 除非知道键，否则没有办法取出值
var map = new WeakMap();
var obj1 = {name:'a'},
	obj2 = {name:'b'},
	obj3 = {name:'c'};
map.set(obj1,'a@email.com');
map.set(obj2,'b@email.com');
map.set(obj3,'c@email.com');

console.log(map.has(obj1));
console.log(map.get(obj2));
map.delete(obj2);
