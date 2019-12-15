import Moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import Styled from 'styled-components';
import { createLoadChatMessagesAction , createShowChatMessagesAction } from '../actions/ChatMessageActionCreators';
import { IState } from '../IStore';
import { IChatMessageList } from '../states/IChatMessageBox';
import store from '../Store';
import { AddTask } from './AddChatMessage';
import ChatMessageRow from './ChatMessageBox';
import { $COLOR_FOREGROUND_REVERSE, $COLOR_PRIMARY_0, $COLOR_PRIMARY_3 } from './FoundationStyles';
import { Loading } from './Loading';

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
        store.dispatch(createLoadChatMessagesAction(store.dispatch));
        store.dispatch(createShowChatMessagesAction([]));
    }
    public render() {
        const { chatMessages: tasks } = this.props;
        const chatMessageListElems = tasks.sort((a, b) => { // ...(b)
            // postedAt??????
            return (a.postedAt < b.postedAt) ? -1 : (a.postedAt === b.postedAt) ? 0 : 1;
        }).reverse().map((it) => {
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
