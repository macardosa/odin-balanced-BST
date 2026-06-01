import { createBST } from "./Tree.js";

const bst = createBST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
bst.insert(2);
bst.deleteItem(7);
bst.deleteItem(9);
bst.deleteItem(3);
bst.deleteItem(67);
bst.deleteItem(8);

console.log(bst.prettyString());