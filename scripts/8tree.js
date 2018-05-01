/*
* @Author: wangjing
* @Date:   2018-04-20 17:05:16
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-22 17:25:42
*/
// 非顺序数据结构
// 树的相关术语：
// 内部节点：至少有一个节点的子节点。
// 外部节点或叶节点：没有子元素的节点。
// 子树：由节点和他它的后代构成。
// 深度：祖先节点的数量。
// 节点的度：节点拥有的子树数。
// 数的度：树内各节点度的最大值。
// 树的高度：所有节点深度的最大值。
// 二叉树：最多只有两个子节点的树，左侧子节点和右侧子节点。
// 二叉搜索树BST：左节点存储比父节点小的值，右侧存储比父节点大或者相等的值。
function BinarySearchTree() {
	// 用指针来表示节点之间的关系，称为边；节点称为键。
	var Node = function(key) {
		this.key = key;
		this.left = null;
		this.right = null;
	};
	var root = null;
	// 向树中插入一个键
	this.insert = function(key) {
		var newNode = new Node(key);
		if (root == null) {
			root = newNode;
		} else {
			insertNode(root,newNode);
		}
	};

	var insertNode = function(node, newNode) {
		if (newNode.key < node.key) {
			if (node.left == null) {
				node.left = newNode;
			} else {
				insertNode(node.left, newNode);
			}
		} else {
			if (node.right == null) {
				node.right = newNode;
			} else {
				insertNode(node.right, newNode);
			}
		}
	}; 

	// 树的遍历
	// 中序遍历：上行顺序访问BST所有节点的遍历方式，即从最小到最大的顺序访问所有的节点。
	// 应用：排序。左父右
	// inOederTraverse方法接收一个回调函数作为参数，用来定义对遍历到的节点进行的操作，也叫做访问者模式。
	this.inOrderTraverse = function(callback) {
		inOrderTraverseNode(root, callback);
	};
	var inOrderTraverseNode =  function(node, callback) {
		if (node !== null) {  //停止递归的判断条件
			inOrderTraverseNode(node.left, callback);
			callback(node.key);
			inOrderTraverseNode(node.right, callback);
		}
	};
	

	// 先序遍历：以优于后代节点的顺序访问每个节点。
	// 应用：打印一个结构化的文档。父左右
	this.preOrderTraverse = function(callback) {
		preOrderTraverseNode(root, callback);
	};
	var preOrderTraverseNode = function (node, callback) {
		if (node !== null) {
			callback(node.key);
			preOrderTraverseNode(node.left, callback);
			preOrderTraverseNode(node.right, callback);
		}
	};

	// 后序遍历：先访问节点的后代节点，再访问节点本身。
	// 应用：计算一个目录和它的子目录所有文件所占空间的大小。
	// 左右父
	this.postOrderTraverse = function(callback) {
		postOrderTraverseNode(root, callback);
	};
	var postOrderTraverseNode = function(node, callback) {
		if (node !== null) {
			postOrderTraverseNode(node.left, callback);
			postOrderTraverseNode(node.right, callback);
			callback(node.key);			
		}
	};	

	// 搜索树的最小键
	this.min = function() {
		return minNode(root);
	};
	var minNode = function(node) {
		if (node) {
			while(node && node.left!==null) {
				node = node.left;
			}
			return node.key;
		}
		return null;
	};

	// 搜索树的最大键
	this.max = function() {
		return maxNode(root);
	};
	var maxNode = function(node) {
		if (node) {
			while(node && node.right!==null) {
				node = node.right;
			};
			return node.key;
		}
		return null;
	};

	// 搜索一个特定的值
	this.search = function(key) {
		return searchNode(root, key);
	};
	var searchNode = function(node, key) {
		if (node === null) {
			return false;
		};
		if (key < node.key) {
			return searchNode(node.left, key);
		} else if (key > node.key) {
			return searchNode(node.right, key);
		} else {
			return true;
		}
	};

	// 移除一个节点
	this.remove = function(key) {
		root = removeNode(root, key);
	};

	var removeNode = function(node, key) {
		if (node === null) {
			return false;
		};
		if (key < node.key) {
			node.left = removeNode(node.left, key);
			return node;
		} else if (key > node.key) {
			node.right = removeNode(node.right, key);
			return node;
		} else {
			if (node.left === null  &&  node.right === null) {
				node = null;
				return node;
			}
			if (node.left === null) {
				node = node.right;
				return node;
			} else if (node.right === null) {
				node = node.left;
				return node;
			}

			var aux = findMinNode(node.right);
			node.key = aux.key;
			node.right = removeNode(node.right, aux.key);
			return node;

			var findMinNode = function(node) {
				while(node  &&  node.left!==null) {
					node = node.left;
				}
				return node;
			};
		}
	};


}
 
var tree = new BinarySearchTree();
tree.insert(11);
tree.insert(7);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

// function printNode(value) {
// 	console.log(value);
// };
// tree.inOrderTraverse(printNode);
// tree.preOrderTraverse(printNode);
// tree.postOrderTraverse(printNode); 


console.log(tree.search(1) ? 'key 1 found.' : 'key 1 not found.');
console.log(tree.search(8) ? 'key 8 found.' : 'key 8 not found.');


// AVL(Adelson-Velskii-Landi)树：自平衡二叉搜索树,任何一个节点左右两侧子树的高度之差最多为1。
// 在添加或者移除节点的时候会试着成为一颗完全树。
function AVLTree() {
	var Node = function(key) {
		this.key = key;
		this.left = null;
		this.right = null;
	};
	var root = null;

	// 插入节点
	var insertNode = function(node, element) {
		if (node === null) {
			node = new Node(element);
		} else if (element < node.key) {
			node.left = insertNode(node.left, element);

			// 确认是否需要平衡
			if (heightNode(node.left) - heightNode(node.right) > 1) {
				if (element < node.left.key) {
					node = rotationLL(node);
				} else {
					node = rotationLR(node);
				}

			}


		} else if(element > node.key) {
			node.right = insertNode(node.right, element);

			if (heightNode(node.right) - heightNode(node.left) > 1) {
				if (element > node.right.key) {
					node = rotationRR(node);
				} else {
					node = rotationRL(node);
				}
			}
		}
		return false;
	}；

	// 计算节点高度
	var heightNode = function(node) {
		if (node == null) {
			return -1;
		} else {
			return Math.max(heightNode(node.left), heightNode(node.right)) + 1;
		}
	};

	// AVL旋转
	// RR:向左的单旋转
	var rotationRR = function(node) {
		var tmp = node.right;
		node.right = tmp.left;
		tmp.left = node;
		return tmp;
	};

	// LL:向右的单旋转
	var rotationLL = function(node) {
		var tmp = node.left;
		node.left = tmp.right;
		tmp.right = node;
		return tmp;
	};

	// LR:向右的双旋转
	var rotationLR = function(node) {
		node.left = rotationRR(node.left);
		return rotationLL(node);
	};

	// RL:向左的双旋转
	var rotationRL = function(node) {
		node.right = rotationLL(node.right);
		return rotationRR(node);
	};
}


// R-B Tree,红黑树，一种特殊的二叉查找树。
// 特性：
// 	每个节点或者是黑色，或者是红色；
// 	根节点是黑色；
// 	每个叶子节点(NIL)是黑色。[指为空(NIL或NULL)的叶子节点]
// 	如果一个节点是红色的，则它的子节点必须是黑色的；
// 	从一个节点到该节点的子孙节点的所有路径上包含相同数目的黑节点。