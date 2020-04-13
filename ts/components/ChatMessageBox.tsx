import Moment from 'moment';
import React from 'react';

import { Avatar, ListItemAvatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import ListItemText from '@material-ui/core/ListItemText';
import { createDeleteChatMessageAction, createShowChatMessageMenuAction} from '../actions/ChatMessageActionCreators';
import { IChatMessage } from '../states/IChatMessage';
import store from '../Store';

export default function ChatMessageBox(props: IChatMessage) {
    const postedAt = Moment(props.postedAt).format('YYYY-MM-DD hh:mm');
    /**
     * ボックスをクリックすると、メニュー表示する
     */
    const onClickBox = (id: string, e: React.MouseEvent<HTMLElement>) => {
        store.dispatch(createShowChatMessageMenuAction(id/*, store*/));
        alert('test');
        // store.dispatch(createDeleteChatMessageAction(id, store));
    };
    /**
     * 削除ボタンを押すと、タスクを削除する
     */
    const onClickDelete = (id: string, e: React.MouseEvent) => {
        store.dispatch(createDeleteChatMessageAction(id, store));
        // クリックイベントを親要素の伝播させない
        e.stopPropagation();
    };
    return (
        <div>
            <ListItemAvatar>
                <Avatar
                    alt="Remy Sharp"
                    src="https://hellogiggles.com/wp-content/uploads/2015/03/11/micro-pig-LondonPignic.jpg"
                />
            </ListItemAvatar>
            <ListItemText primary={props.text}>
                <p onClick={onClickBox.bind}> {props.text} </p>
            </ListItemText>
        </div>

    );
}

