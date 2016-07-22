//
// This example demonstrates how to use deepFreeze to protrect from mutation in
// tests, and how to perform non-mutatin operations on state.
//

const expect = require('expect');
const deepFreeze = require('deep-freeze');

const addCounter = (list) => {
  // Array.push cannot be used because it mutates
  // Array.concat can be used, but here we use the ES6 spread operator to concat
  return [...list, 0];
};

const removeCounter = (list, index) => {
  // Array.splice cannot be used because it mutates
  // Array.slice can be used with Array.concat, but here we use the spread
  // operator together with Array.slice
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ];
};

const incrementCounter = (list, index) => {
  // list[index]++ cannot be used because it mutates
  // Array.slice can be used with Array.concat, but here we use the spread
  // operator together with Array.slice
  return [
    ...list.slice(0, index),
    list[index] + 1,
    ...list.slice(index + 1)
  ];
}

const testAddCounter = () => {
  const listBefore = [];
  const listAfter = [0];

  deepFreeze(listBefore);

  expect(
    addCounter(listBefore)
  ).toEqual(listAfter);
};

testAddCounter();

const testRemoveCounter = () => {
  const listBefore = [0];
  const listAfter = [];

  deepFreeze(listBefore);

  expect(
    removeCounter(listBefore, 0)
  ).toEqual(listAfter);
};

testRemoveCounter();

const testIncrementCounter = () => {
  const listBefore = [0, 5, 10];
  const listAfter = [0, 6, 10];

  deepFreeze(listBefore);

  expect(
    incrementCounter(listBefore, 1)
  ).toEqual(listAfter);
};

testIncrementCounter();

console.log('Tests passed!');
