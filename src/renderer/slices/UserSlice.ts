import { createSlice, SliceCaseReducers } from '@reduxjs/toolkit';
import {
  insertUser,
  loadUserFromComputerNameDB as loadUserListDB,
} from '../utils/ChatDatabaseIF';
import { v4 as UUID } from 'uuid';

interface IUserData {
  authentication?: {
    computerName: string;
  };
  userName: string;
}
export interface IUser {
  userId: string;
  userData: IUserData;
}
interface IUserState {
  user: IUser | undefined;
}

// Stateの初期状態
const initialState: IUserState = {
    user: undefined,
};

// Sliceを生成する
const slice = createSlice<IUserState, SliceCaseReducers<IUserState>>({
  initialState,
  name: 'user',
  reducers: {
    insertUser: (state: IUserState, action) => {
      const userData: IUserData = {
        userName: action.payload.userName,
        authentication: {
          computerName: action.payload.computerName,
        },
      };
      const newUser: IUser = {
        userData,
        userId: UUID(),
      };
      insertUser(newUser);
      return {
        user: newUser,
      };

    },
    loadUserFromComputerName: (state: IUserState, action) => {
      async () => {
        // コンピュータ名
        const computerName = action.payload.computerName;
        const userList = await loadUserListDB();
        for (const user of userList) {
          // user_dataはstringのため、JSONパースする
          const userData: IUserData = JSON.parse(user.userData);
          // user_dataが空辞書、存在しないかnullの場合
          if (userData.authentication !== undefined) {
            if (userData.authentication.computerName === computerName) {
              return {
                user: {
                  userData,
                  userId: user.userId,
                },
              };
            }
          }
        }
        return { user: undefined };
      }
    },
  },
});

// Action Creatorsをエクスポートする
export const userActions = slice.actions;
// Reducerをエクスポートする
export const userReducer = slice.reducer;
