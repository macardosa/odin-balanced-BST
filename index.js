import { createBST } from "./Tree.js";

// create array of random numbers
const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));

// build balance binary search tree (BST)
const bst = createBST(arr);

// confirm that the tree is balanced
if (bst.isBalanced()) {
    console.log('Tree is balanced');
} else {
    console.log('Tree is NOT balanced');
}

// print tree
bst.prettyPrint();

// Print elements in level Order
let ordering = {
    'Level Order': [],
    'In Order': [],
    'Pre Order': [],
    'Post Order': []
};
bst.levelOrderForEach(item => ordering['Level Order'].push(item));
bst.inOrderForEach(item => ordering['In Order'].push(item));
bst.preOrderForEach(item => ordering['Pre Order'].push(item));
bst.postOrderForEach(item => ordering['Post Order'].push(item));

console.table(ordering);

// Unbalance the tree by adding several numbers whose value is more than 100
for (let i = 0; i < 10; i++) {
    bst.insert(Math.floor(Math.random() * 100 + 10));
}

// confirm that the tree is unbalanced
if (bst.isBalanced()) {
    console.log('Tree is balanced');
} else {
    console.log('Tree is NOT balanced');
}

// rebalance the tree 
bst.rebalance();

// confirm that the tree is balanced
if (bst.isBalanced()) {
    console.log('Tree is balanced');
} else {
    console.log('Tree is NOT balanced');
}

// print tree
bst.prettyPrint();

// Print elements in level Order
ordering = {
    'Level Order': [],
    'In Order': [],
    'Pre Order': [],
    'Post Order': []
};
bst.levelOrderForEach(item => ordering['Level Order'].push(item));
bst.inOrderForEach(item => ordering['In Order'].push(item));
bst.preOrderForEach(item => ordering['Pre Order'].push(item));
bst.postOrderForEach(item => ordering['Post Order'].push(item));

console.table(ordering);