import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { loadUserFromComputerNameDB as loadUserListDB } from '../utils/ChatDatabaseIF';

// Stateの初期状態
const initialState: { user: any } = {
    user: null,
};

// Sliceを生成する
const slice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    loadUserFromComputerName: (state, action) => {
      const userList = loadUserListDB(action.payload.computerName);
      return {user: userList};
    },
  },
});

// Action Creatorsをエクスポートする
export const userActions = slice.actions;
// Reducerをエクスポートする
export const userReducer = slice.reducer;
