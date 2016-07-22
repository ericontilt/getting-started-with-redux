//
// This example demonstrates how different parts of the state tree can be
// managed by distinct reducers (a practice called reducer composition). It is
// good practice to let reducers call other reducers.
//
const expect = require('expect');
const deepFreeze = require('deep-freeze');

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      };
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state;
      }
      return Object.assign({}, state, {
        completed: !state.completed
      });
    default:
      return state;
  }
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo({}, action)
      ];
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action));
    default:
      return state;
  }
};

const testAddTodo = () => {
  const stateBefore = [];
  const action = {
    type: 'ADD_TODO',
    id: 1,
    text: 'Learn Redux'
  };
  const stateAfter = [
    {
      id: 1,
      text: 'Learn Redux',
      completed: false
    }
  ];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(stateAfter);
};

testAddTodo();

const testToggleTodo = () => {
  const stateBefore = [{
    id: 1,
    text: 'Learn Redux',
    completed: false
  }, {
      id: 2,
      text: 'Learn React',
      completed: false
    }];
  const action = {
    type: 'TOGGLE_TODO',
    id: 2
  };
  const stateAfter = [{
    id: 1,
    text: 'Learn Redux',
    completed: false
  }, {
      id: 2,
      text: 'Learn React',
      completed: true
    }];

  deepFreeze(stateBefore);
  deepFreeze(action);

  expect(
    todos(stateBefore, action)
  ).toEqual(
    stateAfter
    );
};

testToggleTodo();

console.log('All tests passed!');
