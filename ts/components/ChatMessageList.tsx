import Moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import Styled from 'styled-components';
import { AddTask } from './AddChatMessage';
import { $COLOR_FOREGROUND_REVERSE, $COLOR_PRIMARY_0, $COLOR_PRIMARY_3 } from './FoundationStyles';
import { Loading } from './Loading';
import ChatMessageRow from './ChatMessageBox';
import { createLoadChatMessagesAction as createLoadChatMessageAction } from '../actions/ChatMessageActionCreators';
import { createShowChatMessagesAction as createShowChatMessageAction } from '../actions/ChatMessageActionCreators';
import { IState } from '../IStore';
import { IChatMessageList } from '../states/IChatMessageBox';
import store from '../Store';

//#region styled
const MainContainer = Styled.div`
    margin: 10px auto 0 auto;
    max-width: 600px;
    min-width: 300px;
    width: 80%;
`;

const Header = Styled.h1`
    background-color: ${$COLOR_PRIMARY_3};
    color: ${$COLOR_FOREGROUND_REVERSE};
    font-size: 160%;
    padding: 1em;
    text-align: center;
`;

const AddButton = Styled.button`
    border-radius: 5px;
    background-color: ${$COLOR_PRIMARY_0};
    color: ${$COLOR_FOREGROUND_REVERSE};
    width: 100%;
    padding: 1em;
`;

const TaskList = Styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 1em;
`;

//#endregion


class ChatMessageList extends React.Component<IChatMessageList, {}> {
    public componentDidMount() {
        store.dispatch(createLoadChatMessageAction(store.dispatch));
        store.dispatch(createShowChatMessageAction([]));
    }
    public render() {
        const { chatMessages: tasks } = this.props;
        const chatMessageListElems = tasks.sort((a, b) => { // ...(b)
            var aval = a.createdAt === null ? new Date(1900, 1) : a.createdAt;
            var bval = b.createdAt === null ? new Date(1900, 1) : b.createdAt;
                
            return (aval < bval) ? -1
                : (aval.getTime() === bval.getTime()) ? 0 : 1;
        }).map((it) => {
            return (
                <ChatMessageRow key={it.id} {...it} /> // ...(c)
            );
        });
        return (
            <div>
                <Header>TODO</Header>
                <MainContainer>
                    <AddTask taskName="" deadline={Moment().add(1 , 'days').toDate()} />
                    <TaskList>
                        {chatMessageListElems}
                    </TaskList>
                </MainContainer>
            </div>
        );
                // <Loading shown={this.props.shownLoading} />{/* <-追加 */}

    }
}

const mapStateToProps = (state: IState): IChatMessageList => {
    return state.chatMessageList;
};

export default connect(mapStateToProps)(ChatMessageList);
