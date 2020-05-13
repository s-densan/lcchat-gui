import { combineReducers, createStore } from '@reduxjs/toolkit';
import { dialogReducer } from './dialogSlice';
import { messageReducer } from './messageSlice';

export const reducer = combineReducers({
  dialog: dialogReducer,
  message: messageReducer,
});

export const store = createStore(reducer);

export type RootState = ReturnType<typeof reducer>;
