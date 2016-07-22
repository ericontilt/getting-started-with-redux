//
// This example demonstrates how to implement the createStore function from
// scratch
//

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

const createStore = (reducer) => {
  let state;
  let listeners = [];

  // return current state
  const getState = () => state;

  // dispatch the action to all listeners
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };

  // subscribe a listener for state changes
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  // initialize the store
  dispatch({});

  return {
    getState,
    dispatch,
    subscribe
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
