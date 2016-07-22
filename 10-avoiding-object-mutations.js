const expect = require('expect');
const deepFreeze = require('deep-freeze');

const toggleTodo = (todo) => {
  // todo.completed = !todo.completed would mutate, so is not allowed

  // returning a new object copying all properties is cumbersome, so instead we
  // use the ES6 Object.assign method

  // The object spread operator is ES7, *not* ES6
  return Object.assign({}, todo, {
    completed: !todo.completed
  });
};

const testToggleTodo = () => {
  const todoBefore = {
    id: 1,
    text: 'Learn Redux',
    completed: false
  };
  const todoAfter = {
    id: 1,
    text: 'Learn Redux',
    completed: true
  };

  deepFreeze(todoBefore);

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter);
};

testToggleTodo();

console.log('All tests passed!');
