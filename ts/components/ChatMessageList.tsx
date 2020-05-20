// import Moment from 'moment';
import {
    Grid,
    List,
    ListItem,
} from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { messageActions } from '../slices/MessageSlice';
// import Styled from 'styled-components';
import { IChatMessage, IChatMessageList } from '../states/IChatMessage';
// import store from '../Store';
import ChatMessageBox from './ChatMessageBox';

export default function ChatMessageList(props: IChatMessageList) {
    const dispatch = useDispatch();
    // ????????????Ref
    const initialRef = useRef<boolean>(false);
    useEffect(() => {
        // 初回のみ実行
        if (initialRef.current === false) {
            dispatch(messageActions.loadChatMessages());
            // dispatch(messageActions.showChatMessage({ chatMessages: [] }));
            initialRef.current = true;
        }
    });

    const { chatMessages: chatMessages } = props;
    const mapFunc = (it: IChatMessage) => {
        return (
            <ListItem alignItems="center" >
                <ChatMessageBox key={it.id} {...it} />
            </ListItem>
        );
    };
    // const chatMessageListElems = tasks.sort(compFunc).reverse().map(mapFunc);
    const chatMessageListElems = chatMessages.map(mapFunc);
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
