/*
* @Author: wangjing
* @Date:   2018-04-27 16:59:28
* @Last Modified by:   wangjing
* @Last Modified time: 2018-04-30 18:12:07
*/
function ArrayList() {
	var array = [];

	this.insert = function(item) {
		array.push(item);
	};

	this.toString = function() {
		return array.join();
	};
	// join方法拼接数组元素至一个字符串，并返回该字符串
	
	// 1.冒泡排序，复杂度O(n·n)
	// 从运行事件来看，性能最差
	// 比较任何两个相邻的项，如果第一个比第二个大，则交换。
	this.bubbleSort = function() {
		var length = array.length;

		for (var i=0; i<length; i++) {  //外循环，从数组的第一位迭代到最后一位，用来控制在数组中经过多少轮排序。
			for (var j=0; j<length-1-i; j++) {  //内循环，进行当前项和下一项的比较，从第一项迭代至倒数i+1项
				if (array[j] > array[j+1]) {
					swap(array, j, j+1);
				}
			}
		}
	};

	var swap = function(array, index1, index2) {
		var aux = array[index1];
		array[index1] = array[index2];
		array[index2] = aux;
	};


	// 2.选择排序， 一种原址比较排序算法。复杂度O(n*n)。
	// 找到数据结构中的最小值放在第一项，第二小值放在第二项，以此类推。
	this.selectionSort = function() {
		var length = array.length, indexMin;
		for (var i=0; i<length-1; i++) {  //外循迭代数组并控制迭代轮次。
			indexMin = i;
			for (var j=i; j<length; j++) {  //内循环找到数组中最小值，并将其索引值付给indexMin。
				if (array[indexMin] > array[j]) {
					indexMin = j;
				}
			}
			if (i !== indexMin) {   //将最小值放在其位置上。
				swap(array, indexMin, i);
			}
		}
	};


	// 3.插入排序，每次排一个数组。每一项依次和前面的所有项进行比较，找到自己的位置插入。
	// 排序小型数组时，插入排序比冒泡排序和选择排序的性能要好。
	this.insertionSort = function() {
		var length = array.length; 
		// j,
		// temp;
		for (var i=1; i<length; i++) {  //迭代数组来给第i项找到合适的位置。
			j=i;
			temp = array[i];
			while(j>0 && array[j-1]>temp) {  //将第i项与前面的所有项进行比较，遇到比自己小的就停止。
				array[j] = array[j-1];
				j--;
			}
			array[j] = temp;  //插入到合适的位置。
		}
	};


	// 4.归并排序，是第一个可以被实际使用的排序算法。复杂度为O(nlogn)。
	// 一种分治算法，将原始数组递归分成较小的数组，直到每个数组只有一个位置，接着将小数组递归归并成较大的数组，直到最后只有一个排序好的大数组。
	this.mergeSort = function() {
		array = mergeSortRec(array);
	};

	// 递归地将数组转化为只有一项的小数组。
	var mergeSortRec = function(array) {
		var length = array.length;
		if (length == 1) {
			return array;
		}
		var mid = Math.floor(length/2),
		left = array.slice(0, mid),
		right = array.slice(mid, length);

		return merge(mergeSortRec(left), mergeSortRec(right));
	};

	// 递归地合并和排序小数组来得到排序好的大数组。
	var merge = function(left, right) {
		var result = [],
		il = 0,
		ir = 0;
		while (il<left.length && ir<right.length) {
			if (left[il] < right[ir]) {
				result.push(left[il++]);
			} else {
				result.push(right[ir++]);
			}
		}

		while (il < left.length) {
			result.push(left[il++]);
		}

		while (ir < right.length) {
			result.push(right[ir++]);
		}

		return result;
	};


	// 5.快速排序，最常用的排序算法，复杂度为O(nlogn)，但性能比同复杂度的要好。
	// 分治算法。首先找到数组的中间项作为主元。
	/* 创建两个指针，左边的指向数组第一项，右边的指向数组的最后一项。
	   移动左指针直到找到比主元大的元素，移动右指针直到找到比主元小的元素，交换两指针。
	   重复这个过程，直到左指针超过了右指针。
	   上述过程称为划分操作，可使比主元小的值在主元前，比主元大的值在主元后。*/
	// 接着对划分后的小数组(主元两侧的小数组)重复之前的步骤，直至数组完全排序。
	// 声明主方法来调用递归函数，传递待排序数组以及索引作为参数。
	this.quickSort = function() {
		quick(array, 0, array.length-1);
	};

	// 对划分后的小数组继续划分，直到排序完成。
	var quick = function(array, left, right) {
		var index;

		if (array.length > 1) {
			index = partition(array, left, right);

			if(left < index-1) {
				quick(array, left, index-1);
			}

			if(index < right) {
				quick(array, index, right);
			}
		}
	};

	// 划分过程,选择中间项
	var partition = function(array, left, right) {

		var pivot = array[Math.floor((right+left) / 2)],
		i = left, 
		j = right;

		while (i<=j) {
			while (array[i] < pivot) {
				i++;
			}
			while (array[j] > pivot) {
				j--;
			}

			if (i <= j) {
				[array[i], array[j]] = [array[j], array[i]];
				i++;
				j--;
			}
		}
		return i;
	}

	// 6.堆排序，属于选择排序的一种高效算法，把数组当成二叉树。
	// 堆实质上是满足如下性质的完全二叉树：树中任一非叶子节点的关键字均不大于(小根堆)或不小于(大根堆)其左右孩子(若存在)结点的关键字。
	// 索引0是树的根结点；
	// 除根节点外，任意节点N的父节点是2/N；
	// 节点L的左子节点是2L；
	// 节点R的右子节点是2R+1.
	// 一，构建一个大根堆结构；
	// 二，交换堆里的第一个元素(数组中较大的值)和最后一个元素的位置，这样最大胆额值就会出现在它已经排序的位置；
	// 三，上一步有可能会丢掉堆的属性。因此将数组再转换为大根堆，即找到当前堆的根节点(较小的值，重新放到树的底部)。
	this.heapSort = function() {
		var heapSize = array.length;
		buildHeap(array);

		while(heapSize > 1) {
			heapSize--;
			[array[0], array[heapSize]] = [array[heapSize], array[0]];
			heapify(array, heapSize, 0);
		}

		};
		// 创建大根堆
	var buildHeap = function(array) {
		var heapSize = array.length;
		for (var i=Math.floor(array.length/2); i>=0; i--) {
			heapify(array, heapSize, i);
		}
	};
	// 将数组转换为堆
	var heapify = function(array, heapSize, i) {
		var left = i * 2 + 1,
		right = i * 2 + 2,
		largest = i; 
		if (left < heapSize  &&  array[left] > array[largest]) {
			largest = left;
		}

		if (right < heapSize && array[right] > array[largest]) {
			largest = right;
		}
		if (largest !== i) {
			[array[i], array[largest]] = [array[largest], array[i]];
			heapify(array, heapSize, largest);
		}
	};

	// 查找算法
	// 顺序查找/线性查找，最基本的查找算法，将数据结构中的元素和待查找的元素进行比较，很低效。
	this.sequentialSearch = function(item) {
		for (var i=0; i<array.length; i++) {
			if (item === array[i]) {
				return i;
			}
		}
		return -1;
	};


	// 二分查找
	// 要求数组是已经排序好的！！！！
	// 选择数组的中间值。
	// 如果选中值是待查找值，算法结束。
	// 如果选中值比待查找值小，选择选中值右边的子数组并返回上上步继续查找。
	// 如果选中值比待查找值大，选择选中值左边的子数组并返回上上步继续查找。
	this.binarySearch = function(item) {
		this.quickSort();

		var low = 0,
		high = array.length - 1,
		mid, element;

		while (low <= high) {
			mid = Math.floor((low + high) / 2);
			element = array[mid];
			if (element < item) {
				low = mid + 1;
			} else if (element > item) {
				high = mid - 1;
			} else {
				return mid;
			}
		}

		return -1;
	};



};

function createNonSortedArray(size) {
	var array = new ArrayList();
	for (var i=size; i>0; i--) {
		array.insert(i);
	}
	return array;
}

var array = createNonSortedArray(5);
console.log(array.toString());
// array.bubbleSort();
// array.selectionSort();
// array.insertionSort();
// array.mergeSort();
// array.quickSort();
// array.heapSort();
console.log(array.sequentialSearch(2));

// console.log(array.toString());
