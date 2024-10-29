class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    this.arr = this.sortArray(arr);
    this.root = this.buildTree(this.arr);
    // this.prettyPrint(this.root);
  }

  prettyPrint(node, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  sortArray(arr) {
    const sortedArr = arr.sort((a, b) => a - b);
    const undupedArr = sortedArr.filter((value, index, arr) => {
      if (value !== arr[index - 1]) {
        return value;
      }
    });
    return undupedArr;
  }

  buildTree(arr) {
    const start = 0;
    const end = arr.length - 1;

    if (start > end) return null;

    const mid = Math.floor((end - start) / 2);
    const root = new Node(arr[mid]);
    const leftArr = arr.slice(0, mid);
    const rightArr = arr.slice(mid + 1);

    root.left = this.buildTree(leftArr);
    root.right = this.buildTree(rightArr);
    return root;
  }

  getRootValue() {
    return this.root;
  }

  insert(value) {
    function traverse(value, root) {
      if (root === null) {
        return new Node(value);
      }
      if (root.data === root) {
        return root;
      }
      if (value < root.data) {
        root.left = traverse(value, root.left);
      } else if (value > root.data) {
        root.right = traverse(value, root.right);
      }
      return root;
    }
    traverse(value, this.root);
  }

  delete(value) {
    function traverse(value, root) {
      if (root === null) {
        return root;
      }
      if (value < root.data) {
        root.left = traverse(value, root.left);
      } else if (value > root.data) {
        root.right = traverse(value, root.right);
      } else {
        if (root.left === null) {
          return root.right;
        }
        if (root.right === null) {
          return root.left;
        }
        function nextValue(tempRoot) {
          while (tempRoot.left !== null && tempRoot !== null) {
            tempRoot = tempRoot.left;
          }
          return tempRoot.data;
        }
        const nextMinValue = nextValue(root.right);
        root.data = nextMinValue;
        root.right = traverse(nextMinValue, root.right);
      }
      return root;
    }
    traverse(value, this.root);
  }

  find(value) {
    function traverse(value, root) {
      if (root === null) {
        return false;
      }
      if (value < root.data) {
        return traverse(value, root.left);
      } else if (value > root.data) {
        return traverse(value, root.right);
      } else {
        return true;
      }
    }
    return traverse(value, this.root);
  }

  leverOrderIteration(callback) {
    if (typeof callback !== "function") {
      throw new Error("not a function");
    }
    const queue = [];
    function traverse(callback, root) {
      queue.push(root);
      while (queue.length !== 0) {
        let current = queue[0];
        current.data = callback(current.data);
        if (current.left !== null) {
          queue.push(current.left);
        }
        if (current.right !== null) {
          queue.push(current.right);
        }
        queue.shift();
      }
    }
    traverse(callback, this.root);
  }

  leverOrderRecursion(callback) {
    if (typeof callback !== "function") {
      throw new Error("not a function");
    }
    const queue = [];
    function traverse(callback, root) {
      if (root === null) {
        return;
      }
      queue.push(root);
      let current = queue[0];
      current.data = callback(current.data);
      queue.shift();
      traverse(callback, current.left);
      traverse(callback, current.right);
    }
    traverse(callback, this.root);
  }

  preOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("not a function");
    }
    function traverse(callback, root) {
      if (root === null) {
        return;
      }
      root.data = callback(root.data);
      traverse(callback, root.left);
      traverse(callback, root.right);
    }
    traverse(callback, this.root);
  }

  inOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("not a function");
    }
    function traverse(callback, root) {
      if (root === null) {
        return;
      }
      traverse(callback, root.left);
      root.data = callback(root.data);
      traverse(callback, root.right);
    }
    traverse(callback, this.root);
  }

  postOrder(callback) {
    if (typeof callback !== "function") {
      throw new Error("not a function");
    }
    function traverse(callback, root) {
      if (root === null) {
        return;
      }
      traverse(callback, root.left);
      traverse(callback, root.right);
      root.data = callback(root.data);
    }
    traverse(callback, this.root);
  }

  height(node) {
    function traverse(value, root) {
      if (root === null) {
        return false;
      }
      if (value < root.data) {
        return traverse(value, root.left);
      } else if (value > root.data) {
        return traverse(value, root.right);
      } else {
        return true;
      }
    }
    return traverse(value, this.root);
  }
}

function testCallback(value) {
  return value * 2;
}

const BST = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
BST.insert(2);
BST.delete(4);
console.log(BST.find(4));
BST.leverOrderIteration(testCallback);
BST.prettyPrint(BST.getRootValue());
BST.leverOrderRecursion(testCallback);
BST.prettyPrint(BST.getRootValue());
BST.preOrder(testCallback);
BST.prettyPrint(BST.getRootValue());
