import { createSlice } from '@reduxjs/toolkit';

interface IWindowState {
    scrollPosition: 'bottom' | undefined,
}
// Stateの初期状態
const initialState: IWindowState = {
    scrollPosition: undefined,
};

// Sliceを生成する
const slice = createSlice({
    initialState,
    name: 'window',
    reducers: {
        moveToBottom: (state) => {
            state.scrollPosition = 'bottom';
        },
        scrollUnset: (state) => {
            state.scrollPosition = undefined;
        },
    },
});

// Action Creatorsをエクスポートする
export const windowActions = slice.actions;
// Reducerをエクスポートする
export const windowReducer = slice.reducer;
