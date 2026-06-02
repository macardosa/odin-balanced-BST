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

    function inOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('a callback function is required')
        }

        function traverseInOrder(node) {
            if (node === null) return;

            traverseInOrder(node.left);
            callback(node.value);
            traverseInOrder(node.right);
        }

        traverseInOrder(root);
    }

    function preOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('a callback function is required')
        }

        function traversePreOrder(node) {
            if (node === null) return;

            callback(node.value);
            traversePreOrder(node.left);
            traversePreOrder(node.right);
        }

        traversePreOrder(root);
    }

    function postOrderForEach(callback) {
        if (typeof callback !== 'function') {
            throw new Error('a callback function is required')
        }

        function traversePostOrder(node) {
            if (node === null) return;

            traversePostOrder(node.left);
            traversePostOrder(node.right);
            callback(node.value);
        }

        traversePostOrder(root);
    }

    function find(value) {
        if (!root) return null;

        const queue = new Queue();
        queue.enqueue(root);

        while (!queue.isEmpty()) {
            const node = queue.dequeue();

            if (node.value === value) {
                return node;
            }

            if (node.left && value < node.value) queue.enqueue(node.left);
            if (node.right) queue.enqueue(node.right);
        }

        return null;
    }

    function heightV1(value) {
        // locate the value in the tree
        const startNode = find(value);
        if (!startNode) return undefined;

        let maxCount = 0;

        function traverse(node, count = 0) {
            if (!node) return;

            maxCount = Math.max(maxCount, count);
            traverse(node.left, count + 1);
            traverse(node.right, count + 1);
        }

        traverse(startNode);
        return maxCount;
    }

    function height(value) {
        const startNode = find(value);
        if (!startNode) return undefined;

        function traverse(node) {
            if (!node) return -1;

            return 1 + Math.max(
                traverse(node.left),
                traverse(node.right)
            );
        }

        return traverse(startNode);
    }

    function depth(value) {
        if (!root) return undefined;

        function traverse(node, count) {
            if (!node) return undefined;

            if (value === node.value) {
                return count;
            }

            if (value < node.value) {
                return traverse(node.left, count + 1);
            }

            return  traverse(node.right, count + 1);
        }

        return traverse(root, 0);
    }

    function isBalanced() {
        if (!root) return true;

        function height(node) {
            if (!node) return -1;

            return 1 + Math.max(
                height(node.left),
                height(node.right)
            );
        }

        function traverse(node) {
            if (!node) return true;

            const left = (node.left) ? height(node.left) : 0;
            const right = (node.right) ? height(node.right) : 0;

            if (Math.abs(left - right) > 1) {
                return false;
            }

            return traverse(node.left) && traverse(node.right);
        }

        return traverse(root);
    }

    return {
        prettyString,
        prettyPrint,
        includes,
        insert,
        deleteItem,
        levelOrderForEach,
        levelOrderForEachRecur,
        inOrderForEach,
        preOrderForEach,
        postOrderForEach,
        find,
        height,
        depth,
        isBalanced
    }
}