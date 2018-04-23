/*
* @Author: wangjing
* @Date:   2018-04-22 17:25:14
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-22 22:06:33
*/
// 图由顶点和边组成。
// 顶点的度：相邻顶点的数量。
// 简单路径：不包含重复的顶点。环也是简单路径。
// 联通图：图中每两个顶点间都存在路径。
// 图的表示：邻接矩阵，邻接表，关联矩阵。
function Graph() {
	var vertices = [];
	var adjList = new Dictionary();

	// 向图中添加新的顶点
	this.addVertex = function(v) {
		vertices.push(v);
		adjList.set(v, []);
	};

	// 添加v,w间的边,适用于无向图
	this.addEdge = function(v, w) {
		adjList.get(v).push(w);
		adjList.get(w).push(v);
	};

	// tostring方法
	this.toString = function() {
		var s = '';
		for (var i=0; i<vertices.length; i++) {
			s += vertices[i] + '->';
			var neighbors = adjList.get(vertices[i]);
			for (var j=0; j<neighbors.length; j++) {
				s += neighbors[j] + ' ';
			}
			s += '\n';
		}
		return s;
	};


	// 图的遍历
	// 广度优先搜索(Breadth-First Search, BFS),待访问节点用队列存储
	var initializeColor = function() {
		var color = [];
		for (var i=0; i<vertices.length; i++) {
			color[vertices[i]] = 'white';
		}
		return color;
	};

	this.bfs = function(v, callback) {

		var color = initializeColor(),
		queue = new Queue();
		queue.enqueue(v);

		while(!queue.isEmpty()) {
			var u = queue.dequeue(),
			neighbors = adjList.get(u);
			color[u] = 'grey';
			for (var i=0; i<neighbors.length; i++) {
				var w = neighbors[i];
				if (color[w] == 'white') {
					color[w] = 'grey';
					queue.enqueue(w);
				}
			}

			color[u] = 'black';
			if (callback) {
				callback(u);
			}
		}

	};

	// 使用BFS寻找最短路径(以边的数量计)
	this.BFS = function(v) {
		var color = initializeColor(),
		queue = new Queue();
		d = [],
		pred = [];
		queue.enqueue(v);

		for (var i=0; i<vertices.length; i++) {
			d[vertices[i]] = 0; 
			pred[vertices[i]] = null;
 		}

 		while(!queue.isEmpty()) {
 			var u = queue.dequeue(),
 			neighbors = adjList.get(u);
 			color[u] = 'grey';
 			for (var j=0; j<neighbors.length; j++) {
 				var w = neighbors[j];
 				while(color[w] == 'white') {
 					color[w] = 'grey';
 					d[w] = d[u] + 1;
 					pred[w] = u;
 					queue.enqueue(w);
 				}
 			}
 			color[u] = 'black';
 		}

 		return {
 			distance: d,
 			predecessors: pred
 		};
	};

	// 深度优先搜索(Depth-First Search, DFS),用栈来表示待访问节点的数据结构
	this.dfs = function(callback) {
		var color = initializeColor();

		for (var i=0; i<vertices.length; i++) {
			if (color[vertices[i]]  == 'white') {
				dfsVisit(vertices[i], color, callback);
			}
		}
	};

	var dfsVisit = function(u, color, callback) {
		color[u] = 'grey';
		if (callback) {
			callback(u);
		}
		var neighbors = adjList.get(u);
		for (var i=0; i<neighbors.length; i++) {
			var w = neighbors[i];
			if (color[w] == 'white') {
				dfsVisit(w, color, callback);
			}
		}
		color[u] = 'black';
	};
	
	// 返回顶点的发现时间和完成探索时间的深度优先算法
	var time = 0;
	this.DFS = function() {
		var color = initializeColor(),
		d = [],
		f = [],
		p = [],
		time = 0;

		for (var i=0; i<vertices.length; i++) {
			d[vertices[i]] = 0; 
			f[vertices[i]] = 0;
			p[vertices[i]] = null;
		}

		for (var i=0; i<vertices.length; i++) {
			if(color[vertices[i]] == 'white') {
				DFSVisit(vertices[i], color, d, f, p);
			}
		}
		return {
			discovery: d,
			finished: f,
			predecessors: p
		};
	};

	var DFSVisit = function(u, color, d, f, p) {
		console.log('discovered ' + u);
		color[u] = 'grey';
		d[u] = ++time;
		var neighbors = adjList.get(u);
		for (var i=0; i<neighbors.length; i++) {
			var w = neighbors[i];
			if (color[w] === 'white') {
				p[w] = u;
				DFSVisit(w, color, d, f, p);
			}
		}
		color[u] = 'black';
		f[u] = ++time;
		console.log('explored ' + u);
	};
};

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

};

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
};


// var graph = new Graph();
// var myVertivce = ['A','B','C','D','E','F','G','H','I'];
// for (var i=0; i<myVertivce.length; i++) {
// 	graph.addVertex(myVertivce[i]);
// }
// graph.addEdge('A','B');
// graph.addEdge('A','C');
// graph.addEdge('A','D');
// graph.addEdge('C','D');
// graph.addEdge('C','G');
// graph.addEdge('D','G');
// graph.addEdge('D','H');
// graph.addEdge('B','E');
// graph.addEdge('B','F');
// graph.addEdge('E','I');
// console.log(graph.toString());

// function printNode(value) {
// 	console.log('Visited vertex :' + value);
// }
// graph.bfs(myVertivce[0], printNode);


// var shortestPathA = graph.BFS(myVertivce[0]);
// console.log(shortestPathA);


// graph.dfs(printNode);
// graph.DFS(printNode);


// 深度优先搜索应用-拓扑排序
// 对于有向无环图(DAG),编排一些任务或步骤的执行顺序
graph = new Graph();
myVertivces = ['A','B','C','D','E','F'];
for(i=0; i<myVertivces.length; i++) {
	graph.addVertex(myVertivces[i]);
}

graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('B', 'D');
graph.addEdge('B', 'E');
graph.addEdge('C', 'F');
graph.addEdge('F', 'E');
graph.DFS();
