import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import os from 'os';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dialogActions } from '../slices/DialogSlice';
import { RootState } from '../slices/RootStore';
import { userActions } from '../slices/UserSlice';
import ChatMessageList from './ChatMessageList';
// import React, { Component, Fragment } from 'react';
import ChatMessagePostBox from './ChatMessagePostBox';
import InputDialog from './dialogs/InputDialog';
import OkDialog from './dialogs/OkDialog';

export function GridLayout() {
  const dialog = useSelector((state: RootState) => state.dialog);
  const message = useSelector((state: RootState) => state.message);
  const user = useSelector((state: RootState) => state.user);
  const [initial, setInitial] = useState<boolean>(false);
  const dispatch = useDispatch();

  const bottomRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    // 初回のみ実行
    if (initial === false) {
      // store.dispatch(createScrollToBottomAction(bottomRef));
      dispatch(userActions.loadUserFromComputerName({computerName: os.hostname()}));
      setInitial(true);
    }
    // 初期化が済んでもユーザがundefinedの場合
    if (user.user === undefined && dialog.dialogData === undefined && initial) {
      dispatch(dialogActions.openInputDialog({
        message: 'ユーザが登録されていません',
        name: 'ん？',
        title: 'ユーザ登録',
        enableCancel: false,
        onClickCancel: () => dispatch(dialogActions.closeDialog()),
        onClickOk: () => dispatch(dialogActions.closeDialog()),
        onClose: () => dispatch(dialogActions.closeDialog()),
      }));
    }
    if (bottomRef.current) {
      bottomRef.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
  }/*, [message.chatMessages.length]*/);
  /*
  for(var userData of userJson) {
    userDataStr += JSON.stringify(userData);
  }
  */

  const chatMessageListStyle = {
    display: 'flex',
    flexFlow: 'column',
    top: 0,
  };
  const chatMessagePostBoxStyle = {
    bottom: 0,
  };

  const dialogComponent = () => {
    if (dialog.dialogData === undefined) {
      return <div></div>;
    } else {
      switch (dialog.dialogData.type) {
        case 'input':
          return <InputDialog
            title={dialog.dialogData.title}
            message={dialog.dialogData.message}
            // onClickOk={dialog.dialogData.onClickOk}
            onClickOk={(e, inputText) => {
              dispatch(userActions.insertUser({userId: inputText, userName: inputText, computerName: os.hostname()}));
              dispatch(dialogActions.closeDialog());
            }}
            enableCancel={dialog.dialogData.enableCancel}
            onClose={dialog.dialogData.onClose}
            onClickCancel={dialog.dialogData.onClickCancel}
            open={dialog.dialogData.open}
          />;
        case 'ok':
          return <OkDialog
            title={dialog.dialogData.title}
            message={dialog.dialogData.message}
            onClickOk={dialog.dialogData.onClickOk}
            onClose={dialog.dialogData.onClose}
            open={dialog.dialogData.open}
          />;
      }
    }
  };
  const chatArea = () => {
    if (initial && user.user) {
      return  <div>
          <Paper style={chatMessageListStyle}>
            <ChatMessageList chatMessages={message.chatMessages} />
          </Paper>
          <div ref={bottomRef}>
            <Box component="div" style={chatMessagePostBoxStyle}>
              <ChatMessagePostBox />
            </Box>
          </div>
        </div>;
    } else {
      return <div></div>;
    }
  }
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <div style={{ overflow: 'hidden', minHeight: '100vh' }}>
        {dialogComponent()}
        {chatArea()}
      </div>
    </MuiThemeProvider>
  );
}
