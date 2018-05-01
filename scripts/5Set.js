/*
* @Author: wangjing
* @Date:   2018-04-10 10:04:28
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-10 17:01:14
*/
// 集合：无序且不允许重复的顺序数据结构。
// 还有交集、并集、差集等基本操作。
// 使用对象来表示集合，因为JS对象不允许一个键指向两个不同的属性，保证了集合里的元素都是唯一的。
function Set() {
	let items = {};

	// 判断集合中是否有此项，因为集合要求唯一
	// this.has = function(value) {
	// 	return value in items;
	// };
	// 所有JS对象都有hasOwnProperty方法，返回表明对象是否具有特定属性的布尔值
	this.has = function(value) {
		return items.hasOwnProperty(value);
	};

	// 添加新项
	this.add = function(value) {
		if (!this.has(value)) {
			items[value] = value;
			return true;
		}
		return false;
	};

	// 移除一个项
	this.remove = function(value) {
		if (this.has(value)) {
			delete items[value];
			return true;
		}
		return false;
	};

	// 清空集合
	this.clear = function() {
		items = {};
	};

	// 查看集合包含元素的数量
	// JS的Object类都有一个keys方法，Object.keys()返回一个包含给定对象的所有属性的方法
	// 对旧版本的浏览器不支持
	
	this.size = function() {
		return Object.keys(items).length;
	};
	
	// 通用的方法， for in 遍历
	// 记得要使用hasOwnProperty()方法验证对象具有该属性，因为对象的原型包含了额外的未用于数据结构的属性
	// this.size = function() {
	// 	let count = 0;
	// 	for (let key in items) {
	// 		if(items.hasOwnProperty(key)) 
	// 		++count;
	// 	}
	// 	return count;
	// }；

	// 查看集合中所有值
	// 同样不适用于旧版本
	this.values = function() {
		let values = [];
		for(let i=0, keys=Object.keys(items); i<keys.length; i++) {
			values.push(items[keys[i]);
		}
		return values;
	};

	// 所有适用
	// this.values = function() {
	// 	let values = [];
	// 	for (let key in items) {
	// 		if(items.hasOwnProperty(key)) {
	// 			values.push(items[key]);
	// 		}
	// 	}
	// 	return values;
	// };
	

	// 集合操作
	// 并集
	this.union = function(otherSet) {
	let unionSet = new Set();

	let values = this.values();
	for(let i=0; i<values.length; i++) {
		unionSet.add(values[i]);
	}

	values = otherSet.values();
	for(let i=0; i<values.length; i++) {
		unionSet.add(values[i]);
	}
	return unionSet;
};

	// 交集
	this.intersection = function(otherSet) {
		let intersectionSet = new Set();

		let values = this.values();
		for(let i=0; i<values.length; i++) {
			if (otherSet.has(values[i])) {
				intersectionSet.add(values[i]);
			}
		}
		return intersectionSet;
	};


	// 差集
	this.difference = function(otherSet) {
		let differentSet = new Set();
		let values = this.values();
		for (let i=0; i<values.length; i++) {
			if (!otherSet.has(values[i])) {
				differentSet.add(values[i]);
			}		
		}
		return differentSet;
	};

	// 子集
	this.subset = function(otherSet) {

		if (this.size > otherSet.size) {
			return false;
		} else {
			let values = this.values();
			for (let i=0; i<values.length; i++) {
				if (!otherSet.has(values[i])) {
					return false;
				}
			}
			return true;
		}
	};
}

let set = new Set();
set.add(3);
set.add(4);
set.add(5);
set.add(6);
set.add(7);
console.log(set.values());
console.log(set.has(1));
console.log(set.size());
set.add(7);
console.log(set.values());
console.log(set.has(3));
console.log(set.size());

set.remove(3);
console.log(set.values());

set.remove(5);
console.log(set.values());




let setA = new Set();
setA.add(1);
setA.add(2);
setA.add(3);

let setB = new Set();
setB.add(3);
setB.add(4);
setB.add(5);

let unionAB = setA.union(setB);
console.log(unionAB.values());
console.log(setA.subset(setB));


// ES6 新增了Set类
let set = new Set();
set.add(1);
console.log(set.values());//SetIterator {1}
console.log(set.has(1));//true
console.log(set.size);//1
set.delete(1);
console.log(set.size);//0

// ES6原生set没有并集、交集、差集、子集等数学操作
// 模拟并集操作
let unionAB = new Set();
for (let x of setA) unionAB.add(x);
for (let x of setB) unionAB.add(x);

// 模拟交集操作
let intersection = function(setA, setB) {
	let intersectionSet = new Set();
	for (let x of setA) {
		if (setB.has(x)) {
			intersectionSet.add(x);
		}
	}
	return intersectionSet;
};

// 模拟差集操作
let difference = function(setA, setB) {
	let differenceSet = new Set();
	for (let x of setA) {
		if (!setB.has(x)) {
			differenceSet.add(x);
		}
	}
	return differentSet;
};

// 也可使用更简单的语法
differenceSetAB = new Set([x for (x of setA) if (!setB.has(x))]);