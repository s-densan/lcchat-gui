// import Clone from 'clone';
import Redux from 'redux';

import * as Action from '../actions/ChatMessageActions';
import { createChatMessage, IChatMessageList, initChatMessageList } from '../states/IChatMessage';
import createA2RMapper from '../utils/ActionToReducerMapper';
import { saveStateDB } from '../utils/ChatDatabaseIF';

const a2RMapper = createA2RMapper<IChatMessageList>();

/** チャットメッセージ一覧を表示する */
a2RMapper.addWork<Action.IShowChatMessageAction>(
    Action.SHOW_CHAT_MESSAGES,
    (state, action) => {
        state.chatMessages = action.chatMessages;
    },
);

/** メッセージを投稿する */
a2RMapper.addWork<Action.IPostChatMessageAction>(
    Action.POST_CHAT_MESSAGE,
    (state, action) => {
        state.chatMessages.push(createChatMessage(
            action.chatMessageId,
            action.text,
            action.userId,
            action.talkId,
            action.postedAt,
            action.messageData,
            null,
            null,
            null,
        ));
    },
);

/** メッセージを削除する */
a2RMapper.addWork<Action.IDeleteAction>(
    Action.DELETE_CHAT_MESSAGE,
    (state, action) => {
        const {chatMessages: chatMessages} = state;
        const target = chatMessages.find((it) => it.id === action.chatMessageId);
        if (!target) { return; }
        // 指定したID以外のオブジェクトを抽出し、それを新しいリストとする
        state.chatMessages = chatMessages.filter((it) => it.id !== action.chatMessageId);
    },
);


/** チャットメッセージのメニューを表示する */
a2RMapper.addWork<Action.IShowChatMessageMenuAction>(
    Action.SHOW_CHAT_MESSAGE_MENU,
    (state, action) => {
        // do nothing
    },
);

/** Reducer 本体 */
export const ChatMessageReducer: Redux.Reducer<IChatMessageList> = (state = initChatMessageList, action) => {
    switch (action.type) {
        case Action.POST_CHAT_MESSAGE:
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
                (async () => {
                    await saveStateDB(newMessage);
                })();
                return {
                  chatMessages: messageList,
                  chatBoxText: '',
                };
            }
        default:
            return a2RMapper.execute(state, action);
    }
};
