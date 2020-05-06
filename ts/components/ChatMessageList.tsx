// import Moment from 'moment';
import {
    Box,
    Grid,
    List,
    ListItem,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React, { useEffect, useRef } from 'react';
// import Styled from 'styled-components';
import { createLoadChatMessagesAction , createShowChatMessagesAction } from '../actions/ChatMessageActionCreators';
import { createScrollToBottomAction } from '../actions/WindowActions';
import { IChatMessage, IChatMessageList } from '../states/IChatMessage';
import store from '../Store';
import { AddChatMessage } from './AddChatMessage';
import ChatMessageBox from './ChatMessageBox';
import { $COLOR_FOREGROUND_REVERSE, $COLOR_PRIMARY_0, $COLOR_PRIMARY_3 } from './FoundationStyles';
import { Loading } from './Loading';


export default function ChatMessageList(props: IChatMessageList) {
    // ????????????Ref
    const initialRef = useRef<boolean>(false);
 
    useEffect(() => {
        // 初回のみ実行
        if (initialRef.current === false) {
            store.dispatch(createLoadChatMessagesAction(store.dispatch));
            store.dispatch(createShowChatMessagesAction([]));
            initialRef.current = true;
        }
    });

    const { chatMessages: tasks } = props;
    const compFunc = (a: IChatMessage, b: IChatMessage) => {
        // postedAt
        return (a.postedAt < b.postedAt) ? -1 : (a.postedAt === b.postedAt) ? 0 : 1;
    };
    const mapFunc = (it: IChatMessage) => {
        return (
            <ListItem alignItems="center" >
                <ChatMessageBox key={it.id} {...it} />
            </ListItem>
        );
    };
    // const chatMessageListElems = tasks.sort(compFunc).reverse().map(mapFunc);
    const chatMessageListElems = tasks.map(mapFunc);
            // <AddChatMessage text="" />
    return (
        <div style={{ width: '100%' }} >
            <List dense style={{ width: '100%' }}>
                {chatMessageListElems}
            </List>
            <Grid container direction="column" style={{ width: '100%' }} >
            </Grid>

        </div>
    );
}
