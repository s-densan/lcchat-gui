import Moment from 'moment';
import React from 'react';

import Box from '@material-ui/core/Box';
import { createDeleteChatMessageAction} from '../actions/ChatMessageActionCreators';
import { IChatMessage } from '../states/IChatMessage';
import store from '../Store';

const MEDIA_BODY_STYLE = {
  color: '#888',
  fontSize: '.9em',
};

const TIME_STYLE = {
  marginLeft: 5,
};

const TEXT_STYLE = {
  whiteSpace: 'normal',
  wordBreak: 'break-word',
};

class ChatMessageBox extends React.Component<IChatMessage, {}> {
    public render() {
        const deadlineString = Moment(this.props.postedAt).format('YYYY-MM-DD hh:mm');
        return (
            <div className="media-body">
                <Box border={5}>
                    <span>{this.props.text}</span>
                    <span style={TIME_STYLE}>{this.props.id}</span>
                <p onClick={this.onClickBox.bind}> {this.props.text} </p>
                </Box>
            </div>

            /*
            <Task expiration={it.deletedAt !== null}
                onClick={this.onClickBox.bind(this, it.id)}>
                <TaskCheckBox>
                    <TaskCheck>
                        {it.deletedAt === null ? '✔' : null}
                    </TaskCheck>
                </TaskCheckBox>
                <TaskBody>
                    <TaskName>{it.text}</TaskName>
                    <Deadline>⏰{deadlineString}</Deadline>
                </TaskBody>
                <TaskRemove onClick={this.onClickDelete.bind(this, it.id)}>❌</TaskRemove>
            </Task>
            */
        );
    }
    /**
     * ボックスをクリックすると、タスク完了 <-> 未完了 がトグルする
     */
    private onClickBox = (id: string, e: React.MouseEvent<HTMLElement>) => {
        // store.dispatch(createToggleCompleteAction(id, store));
        // do nothing
    }
    /**
     * 削除ボタンを押すと、タスクを削除する
     */
    private onClickDelete = (id: string,  e: React.MouseEvent) => {
        store.dispatch(createDeleteChatMessageAction(id, store));
        // クリックイベントを親要素の伝播させない
        e.stopPropagation();
    }
}

export default ChatMessageBox;
