// import Moment from 'moment';
import Grid from '@material-ui/core/Grid';
import React from 'react';
// import Styled from 'styled-components';
import { createLoadChatMessagesAction , createShowChatMessagesAction } from '../actions/ChatMessageActionCreators';
import { IChatMessage, IChatMessageList } from '../states/IChatMessage';
import store from '../Store';
import { AddChatMessage } from './AddChatMessage';
import ChatMessageBox from './ChatMessageBox';
import { $COLOR_FOREGROUND_REVERSE, $COLOR_PRIMARY_0, $COLOR_PRIMARY_3 } from './FoundationStyles';
import { Loading } from './Loading';
import Box from '@material-ui/core/Box'

class ChatMessageList extends React.Component<IChatMessageList, {}> {
    public componentDidMount() {
        store.dispatch(createLoadChatMessagesAction(store.dispatch));
        store.dispatch(createShowChatMessagesAction([]));
    }
    public render() {
        const { chatMessages: tasks } = this.props;
        const compFunc = (a: IChatMessage, b: IChatMessage) => {
            // postedAt
            return (a.postedAt < b.postedAt) ? -1 : (a.postedAt === b.postedAt) ? 0 : 1;
        };
        const mapFunc = (it: IChatMessage) => {
            return (
                <Grid item xs={1}>
                    <Box style={{ borderBottom: 1, width: '200%'}} >
                        <ChatMessageBox key={it.id} {...it} />
                    </Box>
                </Grid>
            );
        };
        const chatMessageListElems = tasks.sort(compFunc).reverse().map(mapFunc);
        return (
            <div style={{width:800}}>
                <AddChatMessage text="" />
                <Grid container direction="column" style={{width:800}} >
                    {chatMessageListElems}
                </Grid>
            </div>
        );
        // <Loading shown={this.props.shownLoading} />{/* <-追加 */}

    }
}


/*
const mapStateToProps = (state: IState): IChatMessageList => {
    return state.chatMessageList;
};
*/

//export default connect(mapStateToProps)(ChatMessageList);
export default ChatMessageList;