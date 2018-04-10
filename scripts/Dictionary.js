/*
* @Author: wangjing
* @Date:   2018-04-10 18:43:43
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-10 21:32:52
*/
// 字典存储不重复的[键，值]对，键名是用来查询特定元素的，也称为映射map。
function Dictionary() {
	var items = {};

	// 查看字典中是否有某个键
	this.has = function(key) {
		return key in items;
	};

	// 向字典中添加元素
	this.set = function(key, value) {
		items[key] = value;
	};

	// 使用键值来移除数据
	this.delete = function(key) {
		if (this.has(key)) {
			delete items[key];
			return true;
		}
		return false;
	};

	// 查找指定项的值
	this.get = function(key) {
		return this.has(key) ? items[key] : undefined;
	};

	// 返回字典中所有values实例的值
	this.values = function() {
		var values = [];
		for (var k in items) {
			if (this.has(k)) {
				values.push(items[k]);
			}
 		}

 		return values;
	};

	this.clear = function() {
		items = {};
	};

	this.size = function() {
		let count = 0;
		for (var k in items) {
			if (items.hasOwnProperty(k)) ++count;
		}
		return count;
	};

	// 取得字典中所有的键名
	this.keys = function() {
		return Object.keys(items);
	};

	this.getItems = function() {
		return items;
	};

}

var dictionary = new Dictionary();
dictionary.set('a','a.com');
dictionary.set('b','b.com');
dictionary.set('c','c.com');

console.log(dictionary.has('a'));
console.log(dictionary.size());
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.get('a'));
dictionary.delete('b');
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());

// ES6,Map类
var map = new Map();
map.set('a','a.com');
map.set('b','b.com');
map.set('c','c.com');
console.log(map.has('a'));//true
console.log(map.size);//3
console.log(map.keys());//MapIterator {"a", "b", "c"}
console.log(map.values());//MapIterator {"a.com", "b.com", "c.com"}
console.log(map.get('a'));//a.com
map.delete('a');
console.log(map.values());