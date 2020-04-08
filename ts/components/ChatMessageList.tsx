// import Moment from 'moment';
import React from 'react';
// import Styled from 'styled-components';
import { createLoadChatMessagesAction , createShowChatMessagesAction } from '../actions/ChatMessageActionCreators';
import { IChatMessage, IChatMessageList } from '../states/IChatMessage';
import store from '../Store';
import { AddChatMessage } from './AddChatMessage';
import ChatMessageBox from './ChatMessageBox';
import { $COLOR_FOREGROUND_REVERSE, $COLOR_PRIMARY_0, $COLOR_PRIMARY_3 } from './FoundationStyles';
import { Loading } from './Loading';
import {
    List,
    ListItem,
    Menu,
    MenuItem,
    Box,
    Grid,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';





class ChatMessageList extends React.Component<IChatMessageList, {}> {
 
    public componentDidMount() {
        store.dispatch(createLoadChatMessagesAction(store.dispatch));
        store.dispatch(createShowChatMessagesAction([]));
    }
    public render() {
        const style = {
                root: {
                    width: '100%',
                    maxWidth: 360,
                },
            };


        const { chatMessages: tasks } = this.props;
        const compFunc = (a: IChatMessage, b: IChatMessage) => {
            // postedAt
            return (a.postedAt < b.postedAt) ? -1 : (a.postedAt === b.postedAt) ? 0 : 1;
        };
        const mapFunc = (it: IChatMessage) => {
            return (
                <ListItem alignItems="center" button>
                    <ChatMessageBox key={it.id} {...it} />
                </ListItem>
            );
        };
        // const chatMessageListElems = tasks.sort(compFunc).reverse().map(mapFunc);
        const chatMessageListElems = tasks.map(mapFunc);
        return (
            <div style={{width:800}}>
                <AddChatMessage text="" />
                <List dense style={{width:"100%"}}>
                    {chatMessageListElems}
                </List>
                <Grid container direction="column" style={{width:800}} >
                </Grid>

            </div>
        );
        /*
        const anchorEl = '';
        const handleClose = '';
        const fade = true;
        const chatMessageMenu =
            <Menu
                id="fade-menu"
                anchorEl={anchorEl}
                keepMounted
                open={open}
                onClose={handleClose}
                TransitionComponent={fade}
            >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
        */
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