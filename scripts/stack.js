/*
* @Author: wangjing
* @Date:   2018-04-02 19:49:24
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-03 16:50:41
*/
// 创建Stack函数
function Stack() {
	let items = [];

	// 向栈内添加元素
	this.push = function(element) {
		items.push(element);
	};

	// 从栈内移除元素
	this.pop = function() {
		return items.pop();
	};

	// 查看栈顶元素
	this.peek = function(element) {
		return items[items.length-1];
	};

	// 检查栈是否为空
	this.isEmpty = function() {
		return items.length == 0;
	};

	// 查看栈的长度
	this.size = function() {
		return items.length;
	};

	// 清空栈
	this.clear = function() {
		items = [];
	};

	// 输出栈里的元素
	this.print = function() {
		console.log(items.toString());
	};

}
// 缺点：为每一个类的实例都创建一个items变量的副本，不适合创建多个实例的方法


// 用ES6语法声明Stack类，基于原型
// 把Stack函数转换成Stack类，在构造函数里声明，在类的其他函数用this.nameofVariable引用
class Stack {
	constructor () {
		this.items = [];
	}
	push(element) {
		this.elems.push(element);
	}
	// 其他方法
}
// 基于原型的类比基于函数的类更节省内存也更适合创建多个实例，但却不能声明私有属性(变量)或方法。
// 且我们希望Stack类的用户只能访问暴露给类的方法，否则就有可能从栈的中间移除元素。


// 用ES6的限定作用域Symbol实现类
// ES6新增了Symbol的基本类型，是不可变的，可以用作对象的属性
const _items = Symbol('stackItems');
class Stack {
	constructor () {
		this[_items] = [];
	}
	// Stack方法
	push(element) {
		this[_items].push(element);
	}
	pop() {
		return this[_items].pop();
	}
	peek() {
		return this[_items][this[_items].length-1];
	}
	isEmpty() {
		return this[_items].length === 0;
	}
	size() {
		return this[_items].length;
	}
	clear() {
		this[_items] = [];
	}
	print() {
		console.log(this.toString());
	}
	toString() {
		return this[_items].toString();
	}
 }
// 可使用this[_items]访问_items。
// 假的私有属性，因为ES6的Object.getOwnPropertySymbols方法能够取到类里面声明的所有Symbol属性
// 访问stack[objectSymbols[0]]是可以得到items的，并且是一个数组，可以进行数组的任意操作，不符合栈


// 用ES6的WeekMap实现类
// WeekMap可以存储键值对，键是对象，值可以是任意数据类型
let Stack = (function (){
	const _items = new WeekMap();
	const _count = new WeekMap();
	class Stack {
		constructor () {
			_const.set(this, 0);
			_items.set(this, {});
		}
		push(element) {
			const items = _items.get(this);
			const conut = _count.get(this);
			items[count] = element;
			_count.set(this, count+1);
		}
		pop() {
			if (this.isEmpty()) {
				return undefined;
			}
			const items = _items.get(this);
			let count = _count.get(this);
			count--;
			_count.set(this, count);
			const result = items[count];
			delete items[count];
			return result;
		}
		peek() {
			if (this.isEmpty()) {
				return undefined;
			}
			const items = _items.get(this);
			const count = _count.get(this);
			return items[count - 1];
		}

		isEmpty() {
			return _count.get(this) === 0;
		}

		size() {
			return _count.get(this);
		}

		clear() {
		 /* while (!this.isEmpty()) {
			this.pop();
		} */
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
			for (let i = 1; i < count; i++) {
				objString = `${objString},${items[i]}`;
			}
			return objString;
		}
		return Stack;
}) ();
// Stack类有一个名为items的私有属性，但扩展类无法继承私有属性。


// 基于栈的算法：十进制转二进制
function divideBy2(decNumber) {

	var remStack = new Stack(),
		rem,
		binaryString = '';
	while (decNumber > 0) {
		rem = Math.floor(decNumber % 2);
		remStack.push(rem);
		decNumber = Math.floor(decNumber / 2);
	}
	while (!remStack.isEmpty()) {
		binaryString += remStack.pop().toString();
	}
	return binaryString;
}

// 十进制转换为任意进制，且可以传入任意进制的基数为参数
function baseConverter(decNumber, base) {

	var remStack = new Stack(),
		rem,
		baseString = '',
		digits = '0123456789ABCDEF';

	while (decNumber > 0) {
		rem = Math.floor(decNumber % base);
		remStack.push(rem);
		decNumber = Math.floor(decNumber / base);
	}
	while (!remStack.isEmpty()) {
		baseString += digits[remStack.pop()];
	}
	return baseString;
}

console.log(baseConverter(100, 2));