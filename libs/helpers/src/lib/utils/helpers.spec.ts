import { countOccurrences, shuffleArray } from './helpers';

describe('helpers', () => {
  describe('countOccurrences', () => {
    it('should count the occurrences of a character in a 2D array', () => {
      const grid = [
        ['a', 'b', 'c'],
        ['d', 'a', 'f'],
        ['g', 'h', 'a']
      ];
      expect(countOccurrences(grid, 'a')).toEqual(3);
      expect(countOccurrences(grid, 'b')).toEqual(1);
      expect(countOccurrences(grid, 'z')).toEqual(0);
    });
  });

  describe('shuffleArray', () => {
    it('should shuffle the array', () => {
      let array = [1, 2, 3, 4, 5];
      const originalArray = [...array];
      array = shuffleArray(array);
      expect(array).not.toEqual(originalArray);
      expect(array.sort()).toEqual(originalArray.sort());
    });

    it('should handle empty arrays', () => {
      const array: string[] = [];
      shuffleArray(array);
      expect(array).toEqual([]);
    });

    it('should handle single-element arrays', () => {
      const array = [1];
      shuffleArray(array);
      expect(array).toEqual([1]);
    });
  });
});
