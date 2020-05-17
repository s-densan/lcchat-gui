import { combineReducers, createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import { loadUserFromComputerNameDB as loadUserListDB } from '../utils/ChatDatabaseIF';

interface IUserData {
  authentication?: {
    computerName: string;
  }
}
interface IUser {
  userId: string;
  userData: IUserData;
}
interface IUserState{
  user: IUser | null;
}

// Stateの初期状態
const initialState: IUserState = {
    user: null,
};

// Sliceを生成する
const slice = createSlice<IUserState, SliceCaseReducers<IUserState>>({
  initialState,
  name: 'user',
  reducers: {
    insertUser: (state: IUserState, action) => {
    },
    loadUserFromComputerName: (state: IUserState, action) => {
      const userList = JSON.parse(loadUserListDB(action.payload.computerName));
      for (const user of userList) {
        // user_dataはstringのため、JSONパースする
        const userData: IUserData = JSON.parse(user.user_data);
        // user_dataが空辞書、存在しないかnullの場合
        if (('authentication' in userData) && userData.authentication !== undefined) {
          if (userData.authentication.computerName === action.payload.computerName) {
            return {
              user: {
                userData,
                userId : user.user_id,
              },
            };
          }
        }
      }
      return {user  : null};
    },
  },
});

// Action Creatorsをエクスポートする
export const userActions = slice.actions;
// Reducerをエクスポートする
export const userReducer = slice.reducer;
