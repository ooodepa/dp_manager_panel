import objectToQueryString from './index';

describe('objectToQueryString', () => {
  it('converts object to query string', () => {
    const data = { data: 1, name: 'Ivan', age: 21 };
    const result = objectToQueryString(data);
    const anwser = '?data=1&name=Ivan&age=21';
    expect(result).toBe(anwser);

    const data2 = { page: 10, take: 100 };
    const result2 = objectToQueryString(data2);
    const anwser2 = '?page=10&take=100';
    expect(result2).toBe(anwser2);

    const data3 = { data: '1' };
    const result3 = objectToQueryString(data3);
    const anwser3 = '?data=1';
    expect(result3).toBe(anwser3);

    const data4 = {};
    const result4 = objectToQueryString(data4);
    const anwser4 = '?';
    expect(result4).toBe(anwser4);
  });
});
