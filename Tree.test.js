import { jest } from '@jest/globals';
import { createBST } from "./Tree.js";

describe('includes', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

    it('should exist', () => {
        expect(bst.includes).toBeDefined();
    });

    it('should return true if value is in the tree', () => {
        expect(bst.includes(7)).toBe(true);
        expect(bst.includes(6345)).toBe(true);
        expect(bst.includes(3)).toBe(true);
        expect(bst.includes(23)).toBe(true);
        expect(bst.includes(1)).toBe(true);
    });

    it('should return false if value is NOT in the tree', () => {
        expect(bst.includes(17)).toBe(false);
        expect(bst.includes(100)).toBe(false);
        expect(bst.includes(-59)).toBe(false);
        expect(bst.includes(66)).toBe(false);
    });
});

describe('insert', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

    it('should exist', () => {
        expect(bst.insert).toBeDefined();
    });

    it('should insert a new element in the tree if not present', () => {
        bst.insert(100);
        expect(bst.includes(100)).toBe(true);
    });

    it('should not add value if it is already in the tree', () => {
        const expected = bst.prettyString();
        bst.insert(7);
        const actual = bst.prettyString();
        expect(actual).toEqual(expected);
    });
});

describe('deleteItem', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
    bst.insert(2);

    it('should exist', () => {
        expect(bst.deleteItem).toBeDefined();
    });

    it('should remove value in node with null left and right pointers from the tree', () => {
        bst.deleteItem(7);
        expect(bst.includes(7)).toBe(false);
    });

    it('should remove value in node with only right child', () => {
        bst.deleteItem(9);
        expect(bst.includes(9)).toBe(false);
    });

    it('should remove value in node with only left child', () => {
        bst.deleteItem(3);
        expect(bst.includes(3)).toBe(false);
    });

    it('should remove value in node with both children', () => {
        bst.deleteItem(67);
        expect(bst.includes(67)).toBe(false);

        bst.deleteItem(8);
        expect(bst.includes(8)).toBe(false);
    });
});

describe('levelOrderForEach', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 7]);

    it('should exist', () => {
        expect(bst.levelOrderForEach).toBeDefined();
    });

    it('should throw an error if no callback function was provided', () => {
        expect(() => bst.levelOrderForEach()).toThrow();
        expect(() => bst.levelOrderForEach([])).toThrow();
        expect(() => bst.levelOrderForEach({})).toThrow();
        expect(() => bst.levelOrderForEach(2)).toThrow();
        expect(() => bst.levelOrderForEach('lolo')).toThrow();
        expect(() => bst.levelOrderForEach(1 / 3)).toThrow();
    });

    it('should call the callback function', () => {
        const callback = jest.fn();
        bst.levelOrderForEach(callback);
        expect(callback).toHaveBeenCalledTimes(6); // 6 elements removing duplicates
    });

    it('should process values in level order', () => {
        const values = [];
        bst.levelOrderForEach(value => {
            values.push(value);
        });
        expect(values).toEqual([7, 1, 9, 4, 8, 23]);
    });
});

describe('levelOrderForEachRecur', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 7]);

    it('should exist', () => {
        expect(bst.levelOrderForEachRecur).toBeDefined();
    });

    it('should throw an error if no callback function was provided', () => {
        expect(() => bst.levelOrderForEachRecur()).toThrow();
        expect(() => bst.levelOrderForEachRecur([])).toThrow();
        expect(() => bst.levelOrderForEachRecur({})).toThrow();
        expect(() => bst.levelOrderForEachRecur(2)).toThrow();
        expect(() => bst.levelOrderForEachRecur('lolo')).toThrow();
        expect(() => bst.levelOrderForEachRecur(1 / 3)).toThrow();
    });

    it('should call the callback function', () => {
        const callback = jest.fn();
        bst.levelOrderForEachRecur(callback);
        expect(callback).toHaveBeenCalledTimes(6); // 6 elements removing duplicates
    });

    it('should process values in level order', () => {
        const values = [];
        bst.levelOrderForEachRecur(value => {
            values.push(value);
        });
        expect(values).toEqual([7, 1, 9, 4, 8, 23]);
    });
});

describe('inOrderForEach', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 7]);

    it('should exist', () => {
        expect(bst.inOrderForEach).toBeDefined();
    });

    it('should throw an error if no callback function was provided', () => {
        expect(() => bst.inOrderForEach()).toThrow();
        expect(() => bst.inOrderForEach([])).toThrow();
        expect(() => bst.inOrderForEach({})).toThrow();
        expect(() => bst.inOrderForEach(2)).toThrow();
        expect(() => bst.inOrderForEach('lolo')).toThrow();
        expect(() => bst.inOrderForEach(1 / 3)).toThrow();
    });

    it('should call the callback function', () => {
        const callback = jest.fn();
        bst.inOrderForEach(callback);
        expect(callback).toHaveBeenCalledTimes(6); // 6 elements removing duplicates
    });

    it('should process values in-order', () => {
        const values = [];
        bst.inOrderForEach(value => {
            values.push(value);
        });
        expect(values).toEqual([1, 4, 7, 8, 9, 23]);
    });

    it('should do nothing if root node is null', () => {
        const bst = createBST([]);
        const values = [];
        bst.inOrderForEach(value => {
            values.push(value);
        });
        expect(values).toEqual([]);
    });
});

describe('preOrderForEach', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 7]);

    it('should exist', () => {
        expect(bst.preOrderForEach).toBeDefined();
    });

    it('should throw an error if no callback function was provided', () => {
        expect(() => bst.preOrderForEach()).toThrow();
        expect(() => bst.preOrderForEach([])).toThrow();
        expect(() => bst.preOrderForEach({})).toThrow();
        expect(() => bst.preOrderForEach(2)).toThrow();
        expect(() => bst.preOrderForEach('lolo')).toThrow();
        expect(() => bst.preOrderForEach(1 / 3)).toThrow();
    });

    it('should call the callback function', () => {
        const callback = jest.fn();
        bst.preOrderForEach(callback);
        expect(callback).toHaveBeenCalledTimes(6); // 6 elements removing duplicates
    });

    it('should process values pre-order', () => {
        const values = [];
        bst.preOrderForEach(value => {
            values.push(value);
        });
        expect(values).toEqual([7, 1, 4, 9, 8, 23]);
    });

    it('should do nothing if root node is null', () => {
        const bst = createBST([]);
        const values = [];
        bst.preOrderForEach(value => {
            values.push(value);
        });
        expect(values).toEqual([]);
    });
});

describe('postOrderForEach', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 7]);

    it('should exist', () => {
        expect(bst.postOrderForEach).toBeDefined();
    });

    it('should throw an error if no callback function was provided', () => {
        expect(() => bst.postOrderForEach()).toThrow();
        expect(() => bst.postOrderForEach([])).toThrow();
        expect(() => bst.postOrderForEach({})).toThrow();
        expect(() => bst.postOrderForEach(2)).toThrow();
        expect(() => bst.postOrderForEach('lolo')).toThrow();
        expect(() => bst.postOrderForEach(1 / 3)).toThrow();
    });

    it('should call the callback function', () => {
        const callback = jest.fn();
        bst.postOrderForEach(callback);
        expect(callback).toHaveBeenCalledTimes(6); // 6 elements removing duplicates
    });

    it('should process values post-order', () => {
        const values = [];
        bst.postOrderForEach(value => {
            values.push(value);
        });
        expect(values).toEqual([4, 1, 8, 23, 9, 7]);
    });

    it('should do nothing if root node is null', () => {
        const bst = createBST([]);
        const values = [];
        bst.postOrderForEach(value => {
            values.push(value);
        });
        expect(values).toEqual([]);
    });
});

describe('find', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 7]);

    it('should exist', () => {
        expect(bst.find).toBeDefined();
    });

    it('should return node if value exists in the tree', () => {
        expect(bst.find(4).value).toBe(4);
        expect(bst.find(7).value).toBe(7);
        expect(bst.find(23).value).toBe(23);
    });

    it('should return null if value is not found in the tree', () => {
        expect(bst.find(100)).toBeNull();
        expect(bst.find(-2)).toBeNull();
    });
});

describe('height', () => {
    const bst = createBST([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

    it('should exist', () => {
        expect(bst.height).toBeDefined();
    });

    it('should return undefined if value is not found in the tree', () => {
        expect(bst.height(100)).toBeUndefined();
        expect(bst.height(-2)).toBeUndefined();
    });

    it('should return height of node present in the tree', () => {
        // level 3
        [6345, 23, 7, 3].forEach(item => {
            expect(bst.height(item)).toBe(0);
        });

        // level 2
        [1, 5, 9, 324].forEach(item => {
            expect(bst.height(item)).toBe(1);
        });

        // level 1
        [4, 67].forEach(item => {
            expect(bst.height(item)).toBe(2);
        });

        // level 0 (root)
        expect(bst.height(8)).toBe(3);
    });
});