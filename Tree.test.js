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