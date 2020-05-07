// import Moment from 'moment';
import {
    Grid,
    List,
    ListItem,
} from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
// import Styled from 'styled-components';
import { createLoadChatMessagesAction , createShowChatMessagesAction } from '../actions/ChatMessageActionCreators';
import { IChatMessage, IChatMessageList } from '../states/IChatMessage';
import store from '../Store';
import ChatMessageBox from './ChatMessageBox';

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
