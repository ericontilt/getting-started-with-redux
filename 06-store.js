//
// This example demonstrates the 3 most important methods of a redux store.
//

import { createStore } from 'redux';

const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
}

const store = createStore(counter);

const render = () => {
  // the getState() method retreives the current state of the store
  console.log(store.getState());
};

// the subscribe(cb) method calls 'cb' whenever state changes
store.subscribe(render);
render();

// the dispatch(action) method dispatches and action which the reducer uses to
// update state
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });
