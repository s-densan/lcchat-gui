import Moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import Styled from 'styled-components';
import { createLoadChatMessagesAction , createShowChatMessagesAction } from '../actions/ChatMessageActionCreators';
import { IState } from '../IStore';
import { IChatMessageList } from '../states/IChatMessageBox';
import store from '../Store';
import { AddChatMessage } from './AddChatMessage';
import ChatMessageRow from './ChatMessageBox';
import { $COLOR_FOREGROUND_REVERSE, $COLOR_PRIMARY_0, $COLOR_PRIMARY_3 } from './FoundationStyles';
import { Loading } from './Loading';


class ChatMessageList extends React.Component<IChatMessageList, {}> {
    public componentDidMount() {
        store.dispatch(createLoadChatMessagesAction(store.dispatch));
        store.dispatch(createShowChatMessagesAction([]));
    }
    public render() {
        const { chatMessages: tasks } = this.props;
        const chatMessageListElems = tasks.sort((a, b) => { // ...(b)
            // postedAt
            return (a.postedAt < b.postedAt) ? -1 : (a.postedAt === b.postedAt) ? 0 : 1;
        }).reverse().map((it) => {
            return (
                <ChatMessageRow key={it.id} {...it} /> // ...(c)
            );
        });
        return (
            <div>
                <AddChatMessage text="" />
                {chatMessageListElems}
            </div>
        );
        // <Loading shown={this.props.shownLoading} />{/* <-追加 */}

    }
}

const mapStateToProps = (state: IState): IChatMessageList => {
    return state.chatMessageList;
};

export default connect(mapStateToProps)(ChatMessageList);
