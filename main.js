import Tree from "./Tree.js";

const unsorted = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 1, 1, 1, 1];

const bst = new Tree(unsorted);

console.log(bst.root);