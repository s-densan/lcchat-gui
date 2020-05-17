import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { app, BrowserWindow, Menu, nativeImage, Tray} from 'electron';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dialogActions, IInputDialogState, IOkDialogState } from '../slices/DialogSlice';
import { RootState } from '../slices/RootStore';
import { IChatMessageList } from '../states/IChatMessage';
import ChatMessageList from './ChatMessageList';
// import React, { Component, Fragment } from 'react';
import ChatMessagePostBox from './ChatMessagePostBox';
import OkDialog from './dialogs/OkDialog';
import InputDialog from './dialogs/InputDialog';
import { userActions } from '../slices/UserSlice';


export function GridLayout() {
  const dialog = useSelector((state: RootState) => state.dialog);
  const message = useSelector((state: RootState) => state.message);
  const user = useSelector((state: RootState) => state.user);
  const initialRef = useRef<boolean>(false);
  const dispatch = useDispatch();

  const bottomRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    // 初回のみ実行
    if (initialRef.current === false) {
      // store.dispatch(createScrollToBottomAction(bottomRef));
      dispatch(userActions.loadUserFromComputerName({computerName: ''}));
      if (user.user === null) {
        dispatch(dialogActions.openInputDialog({
          message: 'ユーザが登録されていません',
          name: 'ん？',
          title: 'ユーザ登録',
          onClickCancel: () => dispatch(dialogActions.closeDialog()),
          onClickOk: () => dispatch(dialogActions.closeDialog()),
          onClose: () => dispatch(dialogActions.closeDialog()),
        }));
      }
      initialRef.current = true;
    }
    bottomRef.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
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

  const dialogComponent = () => {
    if (dialog.dialogData === undefined) {
      return <div></div>;
    } else {
      switch (dialog.dialogData.type) {
        case 'input':
          return <InputDialog
            title={dialog.dialogData.title}
            message={dialog.dialogData.message}
            onClickOk={dialog.dialogData.onClickOk}
            onClose={dialog.dialogData.onClose}
            onClickCancel={dialog.dialogData.onClickCancel}
            open={dialog.dialogData.open}
          />;
        case 'ok':
          return <OkDialog
            title={dialog.dialogData.title}
            message={dialog.dialogData.message}
            onClick={dialog.dialogData.onClickOk}
            onClose={dialog.dialogData.onClose}
            open={dialog.dialogData.open}
          />;
      }
    }
  };
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <div style={{ overflow: 'hidden', minHeight: '100vh' }}>
        {dialogComponent()}
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
      <div>
        {user.user !== null ? JSON.stringify(user.user) : ''}
      </div><div>
      </div>
    </MuiThemeProvider>
  );
}
