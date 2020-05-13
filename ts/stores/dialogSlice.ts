import { combineReducers, createSlice } from '@reduxjs/toolkit';

// Stateの初期状態
const initialState = {
  name: '',
  message: '',
  onClick: () => { throw new Error('Invalid call'); },
  onClose: () => { throw new Error('Invalid call'); },
  open: false,
  title: '',
};

// Sliceを生成する
export const slice = createSlice({
  initialState,
  name: 'dialog',
  reducers: {
    openOkDialog: (state, action) => {
      return {
          message: action.payload.message,
          name: action.payload.name,
          onClick: action.payload.onClick,
          onClose: action.payload.onClose,
          open: true,
          title: action.payload.title,
      };
    },
    closeDialog: (state) => {
      return {
          message: state.message,
          name: state.name,
          onClick: state.onClick,
          onClose: state.onClose,
          open: false,
          title: state.title,
      };
    },
  },
});

// Action Creatorsをエクスポートする
export const dialogActions = slice.actions;
// Reducerをエクスポートする
export const dialogReducer = slice.reducer;
