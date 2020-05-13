import { combineReducers, createSlice } from '@reduxjs/toolkit';
import { createStore} from '@reduxjs/toolkit';
import clone from 'clone';
import { createChatMessage, IChatMessage, IChatMessageList} from '../states/IChatMessage';
import { insertMessageDB } from '../utils/ChatDatabaseIF';
import { deleteMessageDB, loadChatMessage, loadChatMessagesDB2, saveStateJson, updateMessageTextDB} from '../utils/ChatDatabaseIF';

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
            return {chatMessages: action.payload.chatMessages};
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
                insertMessageDB(newMessage);
                return {
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
        loadChatMessages: (state) => {
            // ファイルを非同期で読み込む
            // データファイルの存在チェック
            let mes = '';
            mes = loadChatMessagesDB2();
            // DB読み込み後に実行する
            const chatMessages: IChatMessage[] = [];
            const chatMessagesJson = JSON.parse(mes);
            for (const chatMessageJson of chatMessagesJson) {
                const chatMessage = createChatMessage(
                    chatMessageJson.message_id,
                    chatMessageJson.text,
                    chatMessageJson.user_id,
                    'dummyTalkId',
                    chatMessageJson.posted_at,
                    chatMessageJson.message_data,
                    chatMessageJson.created_at,
                    chatMessageJson.updated_at,
                    chatMessageJson.deleted_at,
                );
                chatMessages.push(chatMessage);
            }
            const res = {chatMessages};
            return res;
        },
    },
});

// Action Creatorsをエクスポートする
export const messageActions = slice.actions;
// Reducerをエクスポートする
export const messageReducer = slice.reducer;
