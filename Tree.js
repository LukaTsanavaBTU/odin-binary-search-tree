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
    const root = new Node(mid);
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
}