import { combineReducers, createStore } from '@reduxjs/toolkit';
import { dialogReducer } from './DialogSlice';
import { messageReducer } from './MessageSlice';
import { userReducer } from './UserSlice';

export const reducer = combineReducers({
  dialog: dialogReducer,
  message: messageReducer,
  user: userReducer,
});

export const store = createStore(reducer);

export type RootState = ReturnType<typeof reducer>;
