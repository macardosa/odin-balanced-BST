import { Node } from "./Node.js";
import { Queue } from "./Queue.js";

export function createBST(array) {
    let root = buildTree();

    function buildTree() {
        // sort array and remove duplicates
        const sortedArray = [... new Set(array)].sort((a, b) => a - b);

        return sortedArrayToBST(sortedArray);
    }

    function sortedArrayToBST(arr, start = 0, end = arr.length - 1) {
        if (start > end) return null;

        const mid = Math.floor((start + end) / 2);

        const root = new Node(arr[mid]);

        root.left = sortedArrayToBST(arr, start, mid - 1);
        root.right = sortedArrayToBST(arr, mid + 1, end);

        return root;
    }

    const prettyPrint = (node = root, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return;
        }

        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }

    const prettyString = (node = root, prefix = '', isLeft = true) => {
        if (node === null || node === undefined) {
            return '';
        }

        let result = '';

        result += prettyString(
            node.right,
            `${prefix}${isLeft ? '│   ' : '    '}`,
            false
        );

        result += `${prefix}${isLeft ? '└── ' : '┌── '}${node.value}\n`;

        result += prettyString(
            node.left,
            `${prefix}${isLeft ? '    ' : '│   '}`,
            true
        );

        return result;
    };

    function includes(value, node = root) {
        if (node === null) return false;

        if (value === node.value) return true;

        if (value > node.value) {
            return includes(value, node.right);
        } else {
            return includes(value, node.left);
        }

        return false;
    }

    function insert(value, node = root) {
        if (node === null) {
            node = new Node(value);
            return;
        }

        if (node.value === value) return;

        if (value < node.value) {
            if (node.left === null) {
                node.left = new Node(value);
                return;
            }
            insert(value, node.left);
        } else {
            if (node.right === null) {
                node.right = new Node(value);
                return;
            }
            insert(value, node.right);
        }
    }

    function deleteItem(value, node = root, prev = null) {
        if (node === null) return;

        if (value === node.value) {
            if (node.left === null && node.right === null) {
                if (prev === null) {
                    root = null;
                    return;
                }

                if (prev.value > node.value) {
                    prev.left = null;
                } else {
                    prev.right = null;
                }
            } else if (node.left === null) {
                if (prev === null) {
                    root = node.right;
                    return;
                }

                if (prev.value > node.value) {
                    prev.left = node.right;
                } else {
                    prev.right = node.right;
                }
            } else if (node.right === null) {
                if (prev === null) {
                    root = node.left;
                    return;
                }

                if (prev.value > node.value) {
                    prev.left = node.left;
                } else {
                    prev.right = node.left;
                }
            } else {
                // insert all the hanging nodes from the left tree onto the right node
                const queue = new Queue();
                queue.enqueue(node.left);

                while (!queue.isEmpty()) {
                    const nodeTmp = queue.dequeue();
                    if (nodeTmp.left !== null) queue.enqueue(nodeTmp.left);
                    if (nodeTmp.right !== null) queue.enqueue(nodeTmp.right);

                    insert(nodeTmp.value, node.right);
                }

                // drop the left tree
                if (prev === null) {
                    root = node.right;
                } else if (prev.value > node.value) {
                    prev.left = node.right;
                } else {
                    prev.right = node.right;
                }
            }
        } else if (value < node.value) {
            deleteItem(value, node.left, node);
        } else {
            deleteItem(value, node.right, node);
        }
    }

    return {
        prettyString,
        prettyPrint,
        includes,
        insert,
        deleteItem
    }
}