import Clone from 'clone';
import Redux from 'redux';

import { CHANGE_USER_NAME, IChangeUserNameAction } from '../actions/UserNameEvents';
import IChatUser, { initChatUser } from '../states/IChatUser';

export const UserReducer: Redux.Reducer<IChatUser> = (childState = initChatUser, action) => { // --(a)
    let newChildState: IChatUser = childState; // --(b)
    switch (action.type) {
        case CHANGE_USER_NAME: // --(c)
            {
                newChildState = Clone(childState); // --(d)
                newChildState.userName = (action as IChangeUserNameAction).name; // --(e)
            }
            break;
    }
    return newChildState;
};