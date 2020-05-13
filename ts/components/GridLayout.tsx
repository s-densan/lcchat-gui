import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IChatMessageList } from '../states/IChatMessage';
import { dialogActions } from '../stores/dialogSlice';
import { RootState } from '../stores/RootStore';
import ChatMessageList from './ChatMessageList';
// import React, { Component, Fragment } from 'react';
import ChatMessagePostBox from './ChatMessagePostBox';
import OkDialog from './OkDialog';

export function GridLayout() {
  const dialog = useSelector((state: RootState) => state.dialog);
  const message = useSelector((state: RootState) => state.message);
  const initialRef = useRef<boolean>(false);
  const dispatch = useDispatch();

  const bottomRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    // 初回のみ実行
    if (initialRef.current === false) {
      // store.dispatch(createScrollToBottomAction(bottomRef));
      initialRef.current = true;
    }
    bottomRef.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });

  }/*, [message.chatMessages.length]*/);

  const chatMessageListStyle = {
    display: 'flex',
    flexFlow: 'column',
    top: 0,
  };
  const chatMessagePostBoxStyle = {
    bottom: 0,
  };
  const onClickTest = () => {
    const dialogData = {
      message: 'テストだってば',
      name: 'n',
      onClick: () => dispatch(dialogActions.closeDialog()),
      onClose: () => dispatch(dialogActions.closeDialog()),
      title: 'これはテスト',
    };
    dispatch(dialogActions.openOkDialog(dialogData));
  };
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <OkDialog
        title={dialog.title}
        message={dialog.message}
        onClick={dialog.onClick}
        onClose={dialog.onClose}
        open={dialog.open}
      />
      <div style={{ overflow: 'hidden', minHeight: '100vh' }}>
        <Paper style={chatMessageListStyle}>
          <ChatMessageList chatMessages={message.chatMessages} />
        </Paper>
        <div ref={bottomRef}>
          <Box component="div" style={chatMessagePostBoxStyle}>
            <ChatMessagePostBox />
          </Box>
        </div>
      </div>
      <Button onClick={onClickTest}>open</Button>
    </MuiThemeProvider>
  );
}
