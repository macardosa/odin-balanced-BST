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
                // find the inmediate successor in the left tree
                let successor = node.right;
                while (successor.left !== null) {
                    successor = successor.left;
                }

                // update value of target node by its successor's value
                node.value = successor.value;

                // delete (clone) node at successor position
                deleteItem(successor.value, node.right, node);
            }
        } else if (value < node.value) {
            deleteItem(value, node.left, node);
        } else {
            deleteItem(value, node.right, node);
        }
    }

    function levelOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('a callback function is required')
        }

        // traverse the tree in breadth-first level order
        const queue = new Queue();
        queue.enqueue(root);

        while (!queue.isEmpty()) {
            const node = queue.dequeue();

            callback(node.value);

            if (node.left) queue.enqueue(node.left);
            if (node.right) queue.enqueue(node.right);
        }
    }

    function levelOrderForEachRecur(callback, queue = null) {
        if (typeof callback !== 'function') {
            throw new Error('a callback function is required')
        }

        if (queue === null) {
            if (!root) return;

            queue = new Queue();
            queue.enqueue(root);
        }

        const node = queue.dequeue();

        callback(node.value);

        if (node.left) queue.enqueue(node.left);
        if (node.right) queue.enqueue(node.right);

        if (!queue.isEmpty()) {
            levelOrderForEachRecur(callback, queue);
        }
    }

    function inOrderForEach(callback, node = root) {
        if (typeof callback !== 'function') {
            throw new Error('a callback function is required')
        }

        if(node === null) return;

        inOrderForEach(callback, node.left);
        callback(node.value);
        inOrderForEach(callback, node.right);
    }


    return {
        prettyString,
        prettyPrint,
        includes,
        insert,
        deleteItem,
        levelOrderForEach,
        levelOrderForEachRecur,
        inOrderForEach
    }
}