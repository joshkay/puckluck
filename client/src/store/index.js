import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from '../reducers';

const configureStore = () =>
{
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  );

  store.subscribe(() => console.log(store.getState()));

  return store;
};

export default configureStore;