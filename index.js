import { createBST } from "./Tree.js";

// const bst = createBST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// bst.insert(2);
// bst.deleteItem(7);
// bst.deleteItem(9);
// bst.deleteItem(3);
// bst.deleteItem(67);
// bst.deleteItem(8);

// console.log(bst.prettyString());

const bst2 = createBST([1, 7, 4, 23, 8, 9, 7]);
bst2.prettyPrint();

bst2.insert(-1);
bst2.insert(10);
bst2.insert(11);

bst2.prettyPrint();

// bst2.levelOrderForEach(item => console.log(item));

const bst = createBST([1, 7, 4, 23, 8, 9, 7]);
const before = bst.prettyString();
bst.rebalance();
const after = bst.prettyString();
console.log(before);
console.log(after);