const assert = require('assert');
const { forEach } = require('../index');

let nums;
beforeEach(() => {
  nums = [1,2,3];
});

it('Should sum an array', () => {

  let total = 0;
  forEach(nums, val => {
    total += val;
  });

  assert.strictEqual(total, 6);
  nums.push(3);
  nums.push(3);
  nums.push(3);
  nums.push(3);
});

it('beforeEach is run each time', () => {
  assert.strictEqual(nums.length, 4);
});