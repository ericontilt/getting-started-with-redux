import expect from 'expect';
import deepFreeze from 'deep-freeze';
import { createStore } from 'redux';

const prettyJSON = (o) => JSON.stringify(o, null, 2);

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

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter;
    default:
      return state;
  }
};

// This is the combineReducers function implemented from scratch. The function
// returns a new reducer, which invokes every reducer which was passed in.
const combineReducers = (reducers) => {
  // combineReducers produces a new reducer, which is a function
  return (state = {}, action) => {
    // the keys of the reducers object passed in are used to invoke each reducer
    // and to store the output on the nextState object
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](
        state[key],
        action
      );
      return nextState;
    }, {});
  };
};

const todoApp = combineReducers({
  todos,
  visibilityFilter
});

const store = createStore(todoApp);

console.log('Dispatching ADD_TODO');
store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Learn Redux'
});

console.log('New state:');
console.log(prettyJSON(store.getState()));

console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
});

console.log('New state:');
console.log(prettyJSON(store.getState()));
