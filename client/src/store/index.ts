import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { gamesReducer } from './games/reducers';
import { navigationReducer } from './navigation/reducers';

const rootReducer = combineReducers({
  navigation: navigationReducer,
  gamesByDate: gamesReducer
});

export const configureStore = () =>
{
  const store = createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware
    )
  );

  //store.subscribe(() => console.log(store.getState()));

  return store;
};

export type AppState = ReturnType<typeof rootReducer>