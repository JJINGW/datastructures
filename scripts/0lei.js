/*
* @Author: wangjing
* @Date:   2018-03-31 15:45:51
* @Last Modified by:   wangjing
* @Last Modified time: 2018-03-31 17:01:17
*/
function Book(title, pages, isbn) {
	this.title = title;
	this.pages = pages;
	this.isbn = isbn;
}
Book.prototype.printTitle = function() {
	console.log(this.title);
}

// 用ES6,更简洁的声明类
class Book {
	constructor (title, pages, isbn) {
		this.title = title;
		this.pages = pages;
		this.isbn = isbn;
	}
	printIsbn() {
		console.log(this.isbn);
	}
}

let book = new Book('title','pag','isbn');
console.log(book.title);
book.title = 'new title';
console.log(book.title);


// ES6,继承
class ITBook extends Book {
	constructor (title, pages, isbn, technology) {
		super(title, pages, isbn, );
		this.technology = technology;
	}
	printTechnology() {
		console.log(this.technology);
	}
}

let jsBook = new ITBook('js algorithm', '200', '1234567890', 'JavaScript');
console.log(jsBook.title);
console.log(jsBook.printTechnology());


// 使用属性存取器get和set函数
class Person{
	constructor (name) {
		this._name = name;
	}
	get name() {
		return this._name;
	}
	set name(value) {
		this._name = value;
	}
}

let lotChar = new Person('Frodo');
console.log(lotChar.name);
lotChar.name = 'Samantha';
console.log(lotChar.name);
lotChar.name = 'Sam';
console.log(lotChar.name);