import { createSlice, SliceCaseReducers, createAsyncThunk} from '@reduxjs/toolkit';
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
// First, create the thunk
export const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
      async (args:any, thunkAPI) => {
        console.log("loadUserFromComputerName2")
        console.log(args)
        // コンピュータ名
        const computerName = args.computerName;
        console.log(computerName)
        const userList = await loadUserListDB();
        console.log(userList)
        for (const user of userList) {
          // user_dataはstringのため、JSONパースする
          const userData: IUserData = JSON.parse(user.userData);
          // user_dataが空辞書、存在しないかnullの場合
          if (userData.authentication !== undefined) {
            if (userData.authentication.computerName === computerName) {
              console.log({
                  userData,
                  userId: user.userId,
                })
              const result = {
                user: {
                  userData,
                  userId: user.userId,
                }
              }
              return result
            }
          }
        }
        console.log('undef!!!')
        return { user: undefined }
      }
)


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
    /*
    loadUserFromComputerName: (state: IUserState, action) => {
      console.log("loadUserFromComputerName1")
      console.log(action)
      var user: IUserState
      /////
    },
    */
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      console.log('gogogogogo')
      state.user = action.payload.user
    })
  },
});

// Action Creatorsをエクスポートする
export const userActions = slice.actions;
// Reducerをエクスポートする
export const userReducer = slice.reducer;
