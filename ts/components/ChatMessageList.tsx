// import Moment from 'moment';
import React, { useEffect, useRef } from 'react';
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





export default function ChatMessageList(props: IChatMessageList) {
    // ????????????Ref
    const initialRef = useRef<boolean>(false);
 
    useEffect(() => {
        // ???????????
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
            <ListItem alignItems="center" button>
                <ChatMessageBox key={it.id} {...it} />
            </ListItem>
        );
    };
    // const chatMessageListElems = tasks.sort(compFunc).reverse().map(mapFunc);
    const chatMessageListElems = tasks.map(mapFunc);
    return (
        <div style={{ width: 800 }} >
            <AddChatMessage text="" />
            <List dense style={{ width: '100%' }}>
                {chatMessageListElems}
            </List>
            <Grid container direction="column" style={{ width: 800 }} >
            </Grid>

        </div>
    );
}
