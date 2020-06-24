// import Moment from 'moment';
import {
    Grid,
    List,
    ListItem,
    Paper,
} from '@material-ui/core';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { messageActions } from '../slices/MessageSlice';
import { IChatMessage, IChatMessageList } from '../states/IChatMessage';
import ChatMessageBox from './ChatMessageBox';
import { windowActions } from '../slices/WindowSlice';

export default function ChatMessageList(props: IChatMessageList & {bottomRef: React.RefObject<HTMLDivElement>}) {
    const dispatch = useDispatch();
    // 初期化フラグ(True:初期化済み、False:未初期化)
    const [initialed, setInitialed] = useState<boolean>(false);
    useEffect(() => {
        // 初回のみ実行
        if (initialed === false) {
            dispatch(messageActions.loadChatMessages());
            // dispatch(messageActions.showChatMessage({ chatMessages: [] }));
            setInitialed(true);
        }
        /*
        if (bottomRef) {
            const current = bottomRef.current;
            if (current !== null) {
                current.scrollIntoView({
                    behavior: 'smooth',
                    block: 'end',
                });
            }
        }
        */
        windowActions.moveToBottom(props.bottomRef);
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
        <div style={{ width: '97%', margin: 'auto' }} >
            <List dense style={{ width: '100%' }}>
                {chatMessageListElems}
            </List>
            <div ref={props.bottomRef}>{/*bottom*/}</div>
        </div>
    );
}
