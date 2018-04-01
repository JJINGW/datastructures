/*
* @Author: wangjing
* @Date:   2018-03-31 21:57:14
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-01 12:11:56
*/


// 声明、创建和初始化数组
var daysOfWeek = new Array();
var daysOfWeek = [];
var daysOfWeek = [7];
var daysOfWeek = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');
var daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
// 访问数组长度
console.log(daysOfWeek.length);



// fibonacci数列
var fibonacci = [];
fibonacci[1] = 1;
fibonacci[2] = 2;
for (var i=3; i<20; i++) {
	fibonacci[i] = fibonacci[i-1] + fibonacci[i-2];
}
for (var i=1; i<fibonacci.length; i++) {
	console.log(fibonacci[i]);
}

// 给数组添加元素
var numbers = [1,2,3,4,5,6,7,8,9];
numbers[numbers.length] = 10;


// 使用push向数组末尾添加元素
numbers.push(11);
numbers.push(12,13);

// 向数组首位添加元素
for (var i=numbers.length; i>=0; i--) {
	numbers[i] = numbers[i-1];
}
numbers[0] = -1;


// 使用unshift向数组首位添加元素
numbers.unshift(-2);
numbers.unshift(-3,-4);

// 使用pop删除数组的末尾元素
numbers.pop();

// 从数组首位移除元素，数组长度不变，最后一位undifined
for (var i = 0; i<numbers.length; i++) {
	numbers[i] = numbers[i+1];
}

// 使用shiift删除数组首位元素
numbers.shift();

// 使用splice在任意位置添加或删除元素
// splice(start[, deleteCount][, values]),即splice(元素索引值，删除的个数，添加的元素值)

// 删除从数组索引5开始的3个元素，numbers[5],numbers[6],numbers[7]
numbers.splice(5,3);

// 插回
numbers.splice(5,0,2,3,4);

// 以下数组将没有变化，因删除后又添加，可用来替换元素
numbers.splice(5,3,2,3,4);
numbers.splice(start[, deleteCount][, values])

// 二维数组
var averageTemp = [];
averageTemp[0] = [1,2,3,4,5];
averageTemp[1] = [6,7,8,9,10];

// 迭代二维数组的元素
function printMatrix(myMatrix) {
	for (var i=0; i<myMatrix.length; i++) {
		for (var j=0; j<myMatrix[i].length; j++) {
			console.log(myMatrix[i][j]);
		}
	}
}

// 多维数组3x3x3
var matrix3x3x3 = [];
for (var i=0; i<3; i++) {
	matrix3x3x3[i] = [];
	for (var j=0; j<3; j++) {
		matrix3x3x3[i][j] = [];
		for (var z=0; z<3; z++) {
			matrix3x3x3[i][j][z] = i+j+z;
		}
	}
}

// 迭代二维数组的元素
for (var i=0; i<matrix3x3x3.length; i++) {
	for (var j=0; j<matrix3x3x3[i].length; j++) {
		for (var z=0; z<matrix3x3x3[i][j].length; z++) {
			console.log(matrix3x3x3[i][j][z]);
		}
	}
}

// 数组方法
// concat数组合并
var zero = 0;
var positiveNmubers = [1,2,3];
var negativeNumbers = [-1,-2,-3];
var numbers = negativeNumbers.concat(zero, positiveNmubers);


// 迭代器函数
var isEven = function (x) {
	console.log(x);
	return (x % 2 == 0) ? true : false;
};
numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

// every(testfunction[, thisobj])，迭代数组中的每个元素，全部都是true才会返回true
// 以下返回false
numbers.every(isEven);

// some(testfunction[, thisobj]),迭代数组中的每个元素，任一项返回true，则返回true
numbers.some(isEven);

// forEach(testfunction[, thisobj]),与for循环的结果相同
numbers.forEach(function(x) {
	console.log(x);
});

// map(testfunction[, thisobj]),对数组的每一项运行给定函数，返回每次函数调用的结果组成的数组
var myMap = numbers.map(isEven);
console.log(myMap);

// filter(testfunction[, thisobj]),对数组的每一项运行给定函数，返回是函数返回true的元素组成的数组
var evenNumbers = numbers.filter(isEven);
console.log(evenNumbers);

// reduce(function(previousValue, currentValue, index, array)),返回一个被叠加到累加器的值
// reduce方法停止后会返回这个值
// 用reduce对一个数组的所有元素求和
numbers.reduce(function(previous, current, index) {
	return previous + current;
});

// ES6和数组
// foreach和=>
numbers.forEach(x => {
	console.log(x % 2==0);
});

// 使用for...of 循环迭代
for (let n of numbers) {
	console.log((n % 2 == 0) ? 'even' : 'odd');
}

// 迭代器@@iterator属性，使用Symbol.iterator来访问
let iterator = numbers[Symbol.iterator]();
console.log(iterator.next().value);//1
console.log(iterator.next().value);//2
console.log(iterator.next().value);//3
// 所有都迭代完后，会返回undefined

// entries方法，返回包含键值对[值，位置]的@@iterator
let aEntries = numbers.entries();
console.log(aEntries.next().value);//[0,1]
console.log(aEntries.next().value);//[1,2]
console.log(aEntries.next().value);//[2,3]

// keys方法返回包含数组索引{value: , done: }的@@iterator
// 若无可迭代的值，返回{value: undefined, done: ftrue}
let aKeys = numbers.keys();
console.log(aKeys.next());//{value: 0, done: false}
console.log(aKeys.next());//{value: 1, done: false}
console.log(aKeys.next());//{value: 2, done: false}
console.log(aKeys.next());//{value: 3, done: false}

// values方法，返回包含数组值{value: , done: }的@@iterator
// 此方法貌似我的chrome浏览器不支持
let aValues = numbers.values();
console.log(aValues.next());//{value: 1, done: false }
console.log(aValues.next());//{value: 2, done: false }
console.log(aValues.next());//{value: 3, done: false }


// Array.from方法根据已有的数组创建一个新的数组
// 复制numbers数组
let numbers2 = Array.from(numbers);

// 传入一个用来过滤的函数
let evens = Array.from(numbers, x => (x % 2 == 0));

// Array.of方法根据传入的参数创建一个新数组
let numbers3 = Array.of(1,2,3,4);//[1, 2, 3, 4]
let numbers3Copy = Array.of(...numbers3);//[1, 2, 3, 4]


// fill(values, index)方法用静态值填充数组
numbers3Copy.fill(0);//[0, 0, 0, 0]
numbers3Copy.fill(1, 3);//[0, 0, 1, 1]
numbers3Copy.fill(2, 2, 3);//[0, 0, 2, 1]
// 用fill初始化数组
let ones = Array(6).fill(1);//[1, 1, 1, 1, 1, 1]


// cpoyWithin方法复制数组中的一组元素到同意数组指定的起始位置
let copyArray = [1,2,3,4,5,6];
copyArray.copyWithin(0, 3);//[4, 5, 6, 4, 5, 6]
copyArray.copyWithin(1,3,5);//[4, 4, 5, 4, 5, 6]


// 元素排序
// reverse()方法反序
let numbers = [1,2,3,4,5,6,7,8,9,10,11,12,13];
numbers.reverse();//[13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]
// sort方法在对元素排序时，把元素默认为字符串进行比较。
numbers.sort();//[1, 10, 11, 12, 13, 2, 3, 4, 5, 6, 7, 8, 9]
numbers.sort(function(a, b) {
	return a-b;
});//[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

function compare(a, b) {
	if (a < b) {
		return -1;
	}
	if (a > b) {
		return 1;
	}
	if (a == b) {
		return 0;
	}
}
numbers.sort(compare);////[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

// 自定义排序
var friends = [
{name: 'John', age:30},
{name: 'Ana', age:20},
{name: 'Chris', age:25}
];

function comparePerson(a, b) {
	if (a.age < b.age) {
		return -1;
	}
	if (a.age > b.age) {
		return 1;
	}
	return 0;
}
friends.sort(comparePerson);

// 字符串排序
var names = ['Ana', 'ana', 'john', 'John'];
console.log(names.sort());//["Ana", "John", "ana", "john"]比较ASCII码

names.sort(function(a, b) {
	if (a.toLowerCase() < b.toLowerCase()) {
		return -1;
	}
	if (a.toLowerCase() > b.toLowerCase()) {
		return 1;
	}
	return 0;
})//["Ana", "ana", "john", "John"]

// 带有重音符号的字符做排序，用localCompare

// 搜索
// indexOf方法返回与参数匹配的第一个元素的索引
// lastIndexOf(targetElement[, startIndex])方法返回与参数匹配的最后一个元素的索引
numbers.indexof(10);
numbers.lastIndexOf(10);

// ES6,find()和findIndex()方法接受一个回调函数，搜索一个满足回调函数的值
// find()返回第一个满足条件的值，findIndex()返回第一个满足条件值的索引
function multipleOf13(element, index, array) {
	return (element % 13 == 0) ? true : false;
}
numbers.find(multipleOf13);
numbers.findIndex(multipleOf13);

// includes(value, index)方法，看数组是否存在某个元素，返回true or false
numbers.index(10);
numbers.index(10, 5);//从索引5之后的元素是否包含10

// 字符串方法：toString和join
// toString()把数组元素输出为一个字符串
numbers.toString();//1,2,3,4,5,6,7,8,9,10,11,12,13
// join(separator)用分隔符把元素隔开
numbers.join('-');//1-2-3-4-5-6-7-8-9-10-11-12-13


// 数组类型