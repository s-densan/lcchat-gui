import Clone from 'clone';
import Redux from 'redux';

import * as Action from '../actions/TaskActions';
import { createChatMessage, initChatMessageList, IChatMessageList } from '../states/IChatMessageBox';
import createA2RMapper from '../utils/ActionToReducerMapper';

const a2RMapper = createA2RMapper<IChatMessageList>();

/** タスク一覧を表示する */
a2RMapper.addWork<Action.IShowTaskAction>(
    Action.SHOW_TASKS,
    (state, action) => {
        state.chatMessages = Clone(action.chatMessages);
    },
);

/** タスクを追加する */
a2RMapper.addWork<Action.IAddTaskAction>(
    Action.ADD_TASK,
    (state, action) => {
        state.chatMessages.push(createChatMessage(
            action.id,
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


/** タスクを削除する */
a2RMapper.addWork<Action.IDeleteAction>(
    Action.DELETE_TASK,
    (state, action) => {
        const {chatMessages: tasks} = state;
        const target = tasks.find((it) => it.id === action.chatMessageId);
        if (!target) { return; }
        // 指定したID以外のオブジェクトを抽出し、それを新しいリストとする
        state.chatMessages = tasks.filter((it) => it.id !== action.chatMessageId);
    },
);
/** Reducer 本体 */
export const TaskReducer: Redux.Reducer<IChatMessageList> = (state = initChatMessageList, action) => {
    return a2RMapper.execute(state, action);
};
