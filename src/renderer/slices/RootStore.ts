import { combineReducers, createStore, applyMiddleware  } from '@reduxjs/toolkit';
import { dialogReducer } from './DialogSlice';
import { messageReducer } from './MessageSlice';
import { userReducer } from './UserSlice';
import { windowReducer } from './WindowSlice';
import thunk from 'redux-thunk';



export const reducer = combineReducers({
  dialog: dialogReducer,
  message: messageReducer,
  user: userReducer,
  window: windowReducer,
});

export const store = createStore(reducer, applyMiddleware(thunk));

export type RootState = ReturnType<typeof reducer>;
