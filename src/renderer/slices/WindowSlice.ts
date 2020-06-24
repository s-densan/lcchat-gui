import { createSlice } from '@reduxjs/toolkit';

interface IWindowState {
    ref?: React.RefObject<HTMLDivElement>;
}
// Stateの初期状態
const initialState: IWindowState = {
    ref: undefined,
};

// Sliceを生成する
const slice = createSlice({
    initialState,
    name: 'window',
    reducers: {
        moveToBottom: (state, action) => {
            const ref = action.payload.ref;
            alert('kore');
            if (ref.current) {
                ref.current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            }
        },
    },
});

// Action Creatorsをエクスポートする
export const windowActions = slice.actions;
// Reducerをエクスポートする
export const windowReducer = slice.reducer;
