import { createSlice } from '@reduxjs/toolkit';
import clone from 'clone';
import { createChatMessage, IChatMessage, IChatMessageList} from '../states/IChatMessage';
import { insertMessageDB } from '../utils/ChatDatabaseIF';

interface IWindowState {
    bottomRef?: React.RefObject<HTMLDivElement>;
}
// Stateの初期状態
const initialState: IWindowState = {
    bottomRef: undefined,
};

// Sliceを生成する
const slice = createSlice({
    initialState,
    name: 'window',
    reducers: {
        initWindowState: (state, action) => {
            return {
                bottomRef: action.payload.bottomRef,
            };
        },
        moveToBottom: (state) => {
            if (state.bottomRef) {
                state.bottomRef.current!.scrollIntoView({
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
