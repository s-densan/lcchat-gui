import { combineReducers, createStore } from '@reduxjs/toolkit';
import { dialogReducer } from './DialogSlice';
import { messageReducer } from './MessageSlice';
import { userReducer } from './UserSlice';
import { windowReducer } from './WindowSlice';

export const reducer = combineReducers({
  dialog: dialogReducer,
  message: messageReducer,
  user: userReducer,
  window: windowReducer,
});

export const store = createStore(reducer);

export type RootState = ReturnType<typeof reducer>;
