 //import { setNumerator, setDenominator, getReducedFraction, findGreatestCommonFactor } from './exponents.js'
 const findGreatestCommonFactor = require('./exponents.js');


test('no gcf', () => {
  expect(findGreatestCommonFactor(5, 7)).toBe(1);
})

test('gcf bigger denominator', () => {
  expect(findGreatestCommonFactor(3, 12)).toBe(3);
})

test('gcf bigger numerator', () => {
  expect(findGreatestCommonFactor(12, 4)).toBe(4);
})

test('not evenly divisable, bigger denominator', () => {
  expect(findGreatestCommonFactor(24, 32)).toBe(8);
})

test('not evenly divisible, bigger numerator', () => {
  expect(findGreatestCommonFactor(12, 9)).toBe(3);
})
