// import Clone from 'clone';
import Redux from 'redux';

import * as ChatMessageAction from '../actions/ChatMessageActions';
import { createChatMessage, IChatMessageList, initChatMessageList } from '../states/IChatMessage';
import createA2RMapper from '../utils/ActionToReducerMapper';
import { appConfig } from '../utils/AppConfig';
import { insertMessageDB } from '../utils/ChatDatabaseIF';

const a2RMapper = createA2RMapper<IChatMessageList>();

/** チャットメッセージ一覧を表示する */
a2RMapper.addWork<ChatMessageAction.IShowChatMessageAction>(
    ChatMessageAction.SHOW_CHAT_MESSAGES,
    (state, action) => {
        state.chatMessages = action.chatMessages;
    },
);

/** メッセージを投稿する */
a2RMapper.addWork<ChatMessageAction.IPostChatMessageAction>(
    ChatMessageAction.POST_CHAT_MESSAGE,
    (state, action) => {
        state.chatMessages.push(createChatMessage(
            action.chatMessageId,
            action.text,
            action.userId,
            action.talkId,
            action.postedAt,
            action.messageData,
            new Date(),
            new Date(),
            null,
        ));
    },
);

/** メッセージを更新する */
a2RMapper.addWork<ChatMessageAction.IUpdateChatMessageAction>(
    ChatMessageAction.UPDATE_CHAT_MESSAGE,
    (state, action) => {
        const {chatMessages: chatMessages} = state;
        const newChatMessages = chatMessages.map((it) => {
            if (it.messageId === action.chatMessageId) {
                // テキストのみ更新
                return {
                    createdAt : it.createdAt,
                    deletedAt : it.deletedAt,
                    id : it.id,
                    messageData : it.messageData,
                    messageId : it.messageId,
                    postedAt : it.postedAt,
                    talkId : it.talkId,
                    text : action.text,
                    updatedAt : it.updatedAt,
                    userId : it.userId,
                };
            } else {
                return it;
            }
        });
        state.chatMessages = newChatMessages;
    },
);

/** メッセージを削除する */
a2RMapper.addWork<ChatMessageAction.IDeleteChatMessageAction>(
    ChatMessageAction.DELETE_CHAT_MESSAGE,
    (state, action) => {
        const {chatMessages: chatMessages} = state;
        const target = chatMessages.find((it) => it.messageId === action.chatMessageId);
        if (!target) { return; }
        // 指定したID以外のオブジェクトを抽出し、それを新しいリストとする
        state.chatMessages = chatMessages.filter((it) => it.messageId !== action.chatMessageId);
    },
);

/** チャットメッセージのメニューを表示する */
a2RMapper.addWork<ChatMessageAction.IShowChatMessageMenuAction>(
    ChatMessageAction.SHOW_CHAT_MESSAGE_MENU,
    (state, action) => {
        // do nothing
    },
);

/** Reducer 本体 */
const ChatMessageReducer: Redux.Reducer<IChatMessageList> = (state = initChatMessageList, action) => {
    switch (action.type) {
        case ChatMessageAction.POST_CHAT_MESSAGE:
            if (action.text === '') {
                return state;
            } else {
                const newMessage = createChatMessage(
                        action.chatMessageId,
                        action.text,
                        action.userId,
                        action.talkId,
                        action.postedAt,
                        action.messageData,
                        null,
                        null,
                        null,
                );
                const messageList = state.chatMessages.concat(newMessage);
                /*
                (async () => {
                })();
                */
                // データの保存を非同期で実行する。
                // 同期設定
                const synchronous = false;
                if (appConfig.dbAccessSynchronous) {
                    (async () => {
                        await insertMessageDB(newMessage);
                    })();
                } else {
                    insertMessageDB(newMessage);
                }
                return {
                  chatBoxText: '',
                  chatMessages: messageList,
                };
            }

//        case from.SCROLL_TO_BOTTOM_ACTION:
//            action.bottomRef.current!.scrollIntoView({
//                behavior: 'smooth',
//                block: 'end',
//            });
//            return state;
        default:
            return a2RMapper.execute(state, action);
    }
};
