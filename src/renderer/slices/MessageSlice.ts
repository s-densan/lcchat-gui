import { createSlice } from '@reduxjs/toolkit';
import clone from 'clone';
import { createTextMessage, IChatMessage, IChatMessageList, ITextMessageData, createAttachmentMessage} from '../states/IChatMessage';
import { insertMessageDB } from '../utils/ChatDatabaseIF';
import { deleteMessageDB, loadChatMessagesDB2, updateMessageTextDB} from '../utils/ChatDatabaseIF';
import { remote } from 'electron';

// Stateの初期状態
const initialState: IChatMessageList & {editingMessage: IChatMessage | undefined} = {
    chatMessages: [],
    editingMessage: undefined,
};

// Sliceを生成する
const slice = createSlice({
    initialState,
    name: 'message',
    reducers: {
        deleteChatMessage: (state, action) => {
            const chatMessageId: string = action.payload.chatMessageId;
            const { chatMessages: chatMessages } = state;
            const target = chatMessages.find((it) => it.messageId === chatMessageId);
            if (!target) { return; }
            // 指定したID以外のオブジェクトを抽出し、それを新しいリストとする
            const newState = clone(state);
            newState.chatMessages = chatMessages.filter((it) => it.messageId !== chatMessageId);
            deleteMessageDB(chatMessageId);
            return newState;
        },
        loadChatMessages: (state) => {
            // DB読み込み後に実行する
            const chatMessages: IChatMessage[] = [];
            const chatMessagesJson: any = loadChatMessagesDB2();
            
            for (const chatMessageJson of chatMessagesJson) {
                var userName: string;
                const chatMessageData = JSON.parse(chatMessageJson.messageData);
                const userData = JSON.parse(chatMessageJson.userData);
                if (chatMessageJson.userData) {
                    userName = userData.userName;
                } else {
                    userName = 'unknown';
                }
                //alert(JSON.stringify(chatMessageJson))
                //alert(JSON.stringify(chatMessageJson.messageData))
                // console.log(chatMessageData)
                //alert(chatMessageData.text)
                switch(chatMessageJson.kind){
                    case 'text':
                        const chatMessage = createTextMessage(
                            chatMessageJson.messageId,
                            chatMessageData.text,
                            chatMessageJson.userId,
                            userName,
                            userName.slice(0, 2),
                            'dummyTalkId',
                            chatMessageJson.postedAt,
                            chatMessageJson.createdAt,
                            chatMessageJson.updatedAt,
                        );
                        chatMessages.push(chatMessage);
                    case 'attachment':
                        const chatAMessage = createAttachmentMessage(
                            chatMessageJson.messageId,
                            chatMessageData.attachmentPath,
                            chatMessageJson.userId,
                            userName,
                            userName.slice(0, 2),
                            'dummyTalkId',
                            chatMessageJson.postedAt,
                            chatMessageJson.createdAt,
                            chatMessageJson.updatedAt,
                        );
                        chatMessages.push(chatAMessage);
                }
            }
            const res = {
                chatMessages,
                editingMessage: state.editingMessage,
            };
            if (state.chatMessages.length !== 0 && state.chatMessages.length < chatMessages.length) {
                const num = chatMessages.length - state.chatMessages.length;
                const notify = new remote.Notification({ body: `新着メッセージが${num}あります`, title: 'LcChat - 新規メッセージ' });
                notify.show();
                // 通知メッセージクリック時イベント
                notify.on('click', () => {
                    // 全ウィンドウを表示してフォーカスする
                    const wins = remote.BrowserWindow.getAllWindows();
                    for (const win of wins) {
                        win.show();
                        win.focus();
                    }
                });
            }
            return res;
        },
        postTextMessage: (state, action) => {
            if (action.payload.text === '') {
                return state;
            } else {
                const newMessage = createTextMessage(
                    action.payload.chatMessageId,
                    action.payload.text,
                    action.payload.userId,
                    action.payload.userName,
                    action.payload.userAvaterText,
                    action.payload.talkId,
                    action.payload.postedAt,
                    null,
                    null,
                );
                const messageList = state.chatMessages.concat(newMessage);
                insertMessageDB(newMessage);
                action.payload.bottomRef!.current!.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
                return {
                    chatMessages: messageList,
                    editingMessage: state.editingMessage,
                };
            }
        },
        postAttachmentMessage: (state, action) => {
            if (action.payload.attachmentPath === '') {
                return state;
            } else {
                const newMessage = createAttachmentMessage(
                    action.payload.chatMessageId,
                    action.payload.attachmentPath,
                    action.payload.userId,
                    action.payload.userName,
                    action.payload.userAvaterText,
                    action.payload.talkId,
                    action.payload.postedAt,
                    null,
                    null,
                );
                const messageList = state.chatMessages.concat(newMessage);
                insertMessageDB(newMessage);
                action.payload.bottomRef!.current!.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
                return {
                    chatMessages: messageList,
                    editingMessage: state.editingMessage,
                };
            }
        },
        showChatMessage: (state, action) => {
            return {
                chatMessages: action.payload.chatMessages,
                editingMessage: state.editingMessage,
            };
        },
        updateChatMessage: (state, action) => {
            const { chatMessages: chatMessages }: IChatMessageList = state;
            const newChatMessages: IChatMessage[] = chatMessages.map((it) => {
                if (it.messageId === action.payload.chatMessageId) {
                    const messageData: ITextMessageData = {
                        text: action.payload.text,
                    };
                    // テキストのみ更新
                    updateMessageTextDB(action.payload.chatMessageId, messageData);
                    const res : IChatMessage = {
                        createdAt: it.createdAt,
                        id: it.id,
                        type: "text",
                        messageData: messageData,
                        messageId: it.messageId,
                        postedAt: it.postedAt,
                        talkId: it.talkId,
                        updatedAt: it.updatedAt,
                        userId: it.userId,
                        userName: it.userName,
                        userAvaterText: it.userAvaterText,
                    };
                    return res;
                } else {
                    return it;
                }
            });
            return {
                chatMessages: newChatMessages,
                editingMessage: state.editingMessage,
            };
        },
        startEditMessage: (state, action) => {
            return {
                chatMessages: state.chatMessages,
                editingMessage: action.payload.message,
            };
        },
        endEditMessage: (state) => {
            return {
                chatMessages: state.chatMessages,
                editingMessage: undefined,
            };
        },
    },
});

// Action Creatorsをエクスポートする
export const messageActions = slice.actions;
// Reducerをエクスポートする
export const messageReducer = slice.reducer;
