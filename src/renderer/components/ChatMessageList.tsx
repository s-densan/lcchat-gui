// import Moment from 'moment';
import {
  List,
  ListItem,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { messageActions } from '../slices/MessageSlice';
import { windowActions } from '../slices/WindowSlice';
import { IChatMessage, IChatMessageList } from '../states/IChatMessage';
import AttachmentMessageBox from './AttachmentMessageBox';
import TextMessageBox from './TextMessageBox';

export default function ChatMessageList(props: IChatMessageList & { bottomRef: React.RefObject<HTMLDivElement> }) {
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
    windowActions.moveToBottom();
  });

  const { chatMessages: chatMessages } = props;
  const mapFunc = (it: IChatMessage) => {
    if (it.type === 'text') {
      return (
        <ListItem alignItems="center" key={it.id} >
          <TextMessageBox {...it} />
        </ListItem>
      );
    } else if (it.type === 'attachment') {
      return (
        <ListItem alignItems="center" key={it.id}>
          <AttachmentMessageBox {...it} />
        </ListItem>
      );
    } else {
      return (<div></div>);
    }
  };
  // const chatMessageListElems = tasks.sort(compFunc).reverse().map(mapFunc);
  const chatMessageListElems = chatMessages.map(mapFunc);
  // <AddChatMessage text="" />
  return (
    <div style={{ width: '97%', height: '100%', position: 'relative' }} >
      <List dense style={{
        width: '100%',
        verticalAlign: 'left',
        bottom: 0,
        height: '100%',
        position: 'absolute',
      }} >
        {chatMessageListElems}
        {/*最下部スクロール用*/}
        <div ref={props.bottomRef}></div>
      </List>
    </div>
  );
}
