import { sum } from '../src/utils/sum';

test('sum function returns the correct result', () => {
    expect(sum(1, 2)).toBe(3);
});