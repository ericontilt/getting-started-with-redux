//
// This example demonstrates how to mutate a single item within an array.
//
const expect = require('expect');
const deepFreeze = require('deep-freeze');

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false
        }
      ];
    case 'TOGGLE_TODO':
      // Solution 1 ->
      // var todo = state.find(todo => todo.id === action.id);
      // var todoIndex = state.indexOf(todo);
      // return [
      //   ...state.slice(0, todoIndex),
      //   Object.assign({}, todo, {
      //     completed: !todo.completed
      //   }),
      //   ...state.slice(todoIndex + 1)
      // ];

      // Solution 2
      return state.map(todo => {
        if (todo.id !== action.id) {
          return todo;
        }
        return Object.assign({}, todo, {
          completed: !todo.completed
        });
      });
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
