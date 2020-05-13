import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { createStore} from '@reduxjs/toolkit';
import clone from 'clone';
import { createChatMessage, IChatMessage, IChatMessageList} from '../states/IChatMessage';
import { insertMessageDB } from '../utils/ChatDatabaseIF';

// Stateの初期状態
const initialState: IChatMessageList = {
    chatMessages: [],
};

// Sliceを生成する
export const slice = createSlice({
    initialState,
    name: 'message',
    reducers: {
        showChatMessage: (state, action) => {
            return action.payload.chatMessages;
        },
        postChatMessage: (state, action) => {
            if (action.payload.text === '') {
                return state;
            } else {
                const newMessage = createChatMessage(
                    action.payload.chatMessageId,
                    action.payload.text,
                    action.payload.userId,
                    action.payload.talkId,
                    action.payload.postedAt,
                    action.payload.messageData,
                    null,
                    null,
                    null,
                );
                const messageList = state.chatMessages.concat(newMessage);
                const synchronous = false;
                insertMessageDB(newMessage);
                return {
                    chatBoxText: '',
                    chatMessages: messageList,
                };
            }
        },
        updateChatMessage: (state, action) => {
            const { chatMessages: chatMessages }: IChatMessageList = state;
            const newChatMessages: IChatMessage[] = chatMessages.map((it) => {
                if (it.messageId === action.payload.chatMessageId) {
                    // テキストのみ更新
                    return {
                        createdAt: it.createdAt,
                        deletedAt: it.deletedAt,
                        id: it.id,
                        messageData: it.messageData,
                        messageId: it.messageId,
                        postedAt: it.postedAt,
                        talkId: it.talkId,
                        text: action.payload.text,
                        updatedAt: it.updatedAt,
                        userId: it.userId,
                    };
                } else {
                    return it;
                }
            });
            return { chatMessages: newChatMessages };
        },
        deleteChatMessage: (state, action) => {
            const { chatMessages: chatMessages } = state;
            const target = chatMessages.find((it) => it.messageId === action.payload.chatMessageId);
            if (!target) { return; }
            // 指定したID以外のオブジェクトを抽出し、それを新しいリストとする
            const newState = clone(state);
            newState.chatMessages = chatMessages.filter((it) => it.messageId !== action.payload.chatMessageId);
            return newState;
        },
    },
});

// Action Creatorsをエクスポートする
export const messageActions = slice.actions;
// Reducerをエクスポートする
export const messageReducer = slice.reducer;
