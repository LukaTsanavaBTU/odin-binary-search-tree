import Node from "./Node.js";

function sortArray(array) {
    const noDuplicates = [...new Set(array)];
    const sorted = noDuplicates.sort((a, b) => a - b);
    return sorted;
}
function recursiveBuild(array, start, end) {
    if (start > end) {
        return null;
    }
    const mid = Math.floor((start + end) / 2);
    const root = new Node(array[mid]);
    root.left = recursiveBuild(array, start, mid - 1);
    root.right = recursiveBuild(array, mid + 1, end);
    return root;
}

export default class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
    buildTree(array) {
        const sorted = sortArray(array);
        return recursiveBuild(sorted, 0, sorted.length - 1);
    }
    insert(value) {
        let previousRoot;
        let currentRoot = this.root;
        const newNode = new Node(value);
        while (currentRoot) {
            if (value > currentRoot.data) {
                previousRoot = currentRoot;
                currentRoot = currentRoot.right;
            } else {
                previousRoot = currentRoot;
                currentRoot = currentRoot.left;
            }
        }
        if (value > previousRoot.data) {
            previousRoot.right = newNode;
        } else {
            previousRoot.left = newNode;
        }
    }
    deleteItem(value) {
        let previousRoot;
        let currentRoot = this.root;
        while (value !== currentRoot.data) {
            if (value > currentRoot.data) {
                previousRoot = currentRoot;
                currentRoot = currentRoot.right;
            } else {
                previousRoot = currentRoot;
                currentRoot = currentRoot.left;
            }
        }
        if (!currentRoot.left && !currentRoot.right) {
            if (value < previousRoot.data) {
                previousRoot.left = null;
            } else {
                previousRoot.right = null;
            }
        } else if (!!currentRoot.left !==  !!currentRoot.right) {
            if (value < previousRoot.data) {
                previousRoot.left = currentRoot.left ? currentRoot.left : currentRoot.right;
            } else {
                previousRoot.right = currentRoot.left ? currentRoot.left : currentRoot.right;
            }
        } else {
            let replacementRoot = currentRoot.right;
            while (replacementRoot.left) {
                replacementRoot = replacementRoot.left;
            }
            const replacementValue = replacementRoot.data;
            this.deleteItem(replacementValue);
            currentRoot.data = replacementValue;
        }
    }
    find (value) {
        let currentRoot = this.root;
        while (currentRoot) {
            if (value === currentRoot.data) {
                return currentRoot;
            }
            if (value > currentRoot.data) {
                currentRoot = currentRoot.right;
            } else {
                currentRoot = currentRoot.left;
            }
        }
        return null;
    }
    levelOrder(callback) {
        if (!callback) {
            throw new Error("A callback function is required");
        }
        let currentRoot = this.root;
        const queue = [currentRoot];
        while (queue.length !== 0) {
            currentRoot = queue.shift();
            if (currentRoot.left) {
                queue.push(currentRoot.left); 
            }
            if (currentRoot.right) {
                queue.push(currentRoot.right);
            }
            callback(currentRoot);
        }
    }
    inOrder(callback, root = this.root) {
        if (!callback) {
            throw new Error("A callback function is required");
        }
        if(!root) {
            return;
        }
        this.inOrder(callback, root.left);
        callback(root);
        this.inOrder(callback, root.right);
    }
    postOrder(callback, root = this.root) {
        if (!callback) {
            throw new Error("A callback function is required");
        }
        if(!root) {
            return;
        }
        this.inOrder(callback, root.left);
        this.inOrder(callback, root.right);
        callback(root);
    }
    preOrder(callback, root = this.root) {
        if (!callback) {
            throw new Error("A callback function is required");
        }
        if(!root) {
            return;
        }
        callback(root);
        this.inOrder(callback, root.left);
        this.inOrder(callback, root.right);
    }
    height(node = this.root) {
        if (!node) {
            throw new Error("Node does not exist");
        }
        let currentRoot = node;
        let height = 0;
        const queue = [currentRoot, null];
        while (queue.length !== 0) {
            currentRoot = queue.shift();
            if (!currentRoot && queue.length !== 0) {
                height++;
                queue.push(null);
            } else if (!currentRoot && queue.length === 0) {
                continue;
            }
            else {
                if (currentRoot.left) {
                    queue.push(currentRoot.left); 
                }
                if (currentRoot.right) {
                    queue.push(currentRoot.right);
                }
            }
        }
        return height;
    }
    depth(node) {
        let currentRoot = this.root;
        let depth = 0;
        const queue = [currentRoot, null];
        while (queue.length !== 0) {
            currentRoot = queue.shift();
            if (!currentRoot && queue.length !== 0) {
                depth++;
                queue.push(null);
            } else if (!currentRoot && queue.length === 0) {
                return null;
            } else if (currentRoot === node) {
                return depth;
            }
            else {
                if (currentRoot.left) {
                    queue.push(currentRoot.left); 
                }
                if (currentRoot.right) {
                    queue.push(currentRoot.right);
                }
            }
        }
    }
    isBalanced() {
        const isBalancedArr = [];
        this.levelOrder((node) => {
            const leftHeight = node.left ? this.height(node.left) : -1;
            const rightHeight = node.right ? this.height(node.right) : -1;
            if (Math.abs(leftHeight - rightHeight) > 1) {
                isBalancedArr.push(false);
            } else (isBalancedArr.push(true))
        });
        if (isBalancedArr.some((val) => !val)) {
            return false;
        } else {return true;}
    }
}