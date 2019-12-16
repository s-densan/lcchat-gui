import Clone from 'clone';
import Redux from 'redux';

import * as Action from '../actions/ChatMessageActions';
import { createChatMessage, IChatMessageList, initChatMessageList } from '../states/IChatMessageBox';
import createA2RMapper from '../utils/ActionToReducerMapper';

const a2RMapper = createA2RMapper<IChatMessageList>();

/** タスク一覧を表示する */
a2RMapper.addWork<Action.IShowChatMessageAction>(
    Action.SHOW_CHAT_MESSAGES,
    (state, action) => {
        state.chatMessages = Clone(action.chatMessages);
    },
);

/** メッセージを追加する */
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
/** Reducer 本体 */
export const ChatMessageReducer: Redux.Reducer<IChatMessageList> = (state = initChatMessageList, action) => {
    return a2RMapper.execute(state, action);
};
