import getNumberSequence from './index';

describe('getNumberSequence', () => {
  it('should return the correct number sequence for page and totalPage values', () => {
    const testCases = [
      { page: 10, totalPage: 1, expected: [1] },
      { page: 10, totalPage: -1, expected: [] },
      { page: -100, totalPage: 100, expected: [1, 2, 3, 100] },
      { page: -2, totalPage: 100, expected: [1, 2, 3, 100] },
      { page: -1, totalPage: 100, expected: [1, 2, 3, 100] },
      { page: 0, totalPage: 100, expected: [1, 2, 3, 100] },
      { page: 1, totalPage: 100, expected: [1, 2, 3, 100] },
      { page: 2, totalPage: 100, expected: [1, 2, 3, 4, 100] },
      { page: 3, totalPage: 100, expected: [1, 2, 3, 4, 5, 100] },
      { page: 4, totalPage: 100, expected: [1, 2, 3, 4, 5, 6, 100] },
      { page: 5, totalPage: 100, expected: [1, 3, 4, 5, 6, 7, 100] },
      { page: 6, totalPage: 100, expected: [1, 4, 5, 6, 7, 8, 100] },
      { page: 55, totalPage: 100, expected: [1, 53, 54, 55, 56, 57, 100] },
      { page: 96, totalPage: 100, expected: [1, 94, 95, 96, 97, 98, 100] },
      { page: 97, totalPage: 100, expected: [1, 95, 96, 97, 98, 99, 100] },
      { page: 98, totalPage: 100, expected: [1, 96, 97, 98, 99, 100] },
      { page: 99, totalPage: 100, expected: [1, 97, 98, 99, 100] },
      { page: 100, totalPage: 100, expected: [1, 98, 99, 100] },
    ];

    for (const testCase of testCases) {
      const { page, totalPage, expected } = testCase;
      const result = getNumberSequence(page, totalPage);

      if (JSON.stringify(result) !== JSON.stringify(expected)) {
        console.log(
          `ожидаем=${expected}`,
          `получаем=${result}`,
          `page=${page}`,
          `totalPage=${totalPage}`,
        );
      }

      expect(result).toEqual(expected);
    }
  });
});
