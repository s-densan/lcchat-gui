import Redux from 'redux';

import * as Action from '../actions/DBActions';
import { IChatMessageList, initChatMessageList } from '../states/IChatMessage';
import createA2RMapper from '../utils/ActionToReducerMapper';

const a2RMapper = createA2RMapper<IChatMessageList>();
/** Reducer */
export const DBReducer: Redux.Reducer<IChatMessageList> = (state = initChatMessageList, action) => {
    switch (action.type) {
        case Action.INSERT_CHAT_MESSAGE_TO_DB:
        default:
            return a2RMapper.execute(state, action);
    }
};
