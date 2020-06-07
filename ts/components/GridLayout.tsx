import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';;
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import os from 'os';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dialogActions } from '../slices/DialogSlice';
import { messageActions } from '../slices/MessageSlice';
import { RootState } from '../slices/RootStore';
import { userActions } from '../slices/UserSlice';
import { windowActions } from '../slices/WindowSlice';
import ChatMessageList from './ChatMessageList';
import ChatMessagePostBox from './ChatMessagePostBox';
import { Clock } from './Clock';
import InputDialog from './dialogs/InputDialog';
import OkDialog from './dialogs/OkDialog';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { remote } from 'electron';

export function GridLayout() {
  const dialog = useSelector((state: RootState) => state.dialog);
  const message = useSelector((state: RootState) => state.message);
  const user = useSelector((state: RootState) => state.user);
  const [initial, setInitial] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(window.parent.screen.height);
  const dispatch = useDispatch();

  const bottomRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    // 初回のみ実行
    if (initial === false) {
      // store.dispatch(createScrollToBottomAction(bottomRef));
      dispatch(userActions.loadUserFromComputerName({computerName: os.hostname()}));
      setInitial(true);
      dispatch(windowActions.initWindowState({bottomRef}));
      // Windowリサイズイベント
      const win = remote.getCurrentWindow();
      const fixWindowHeight = () => {
        const [, h] = win.getSize();
        if (h !== windowHeight) {
          setWindowHeight(h);
        }
      };
      fixWindowHeight();
      if (win !== null) {
        win.on('resize', fixWindowHeight);
      }
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
    /*
    if (bottomRef.current) {
      bottomRef.current!.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
      });
    }
    */
  }/*, [message.chatMessages.length]*/);
  /*
  for(var userData of userJson) {
    userDataStr += JSON.stringify(userData);
  }
  */

  const chatMessageListStyle: CSSProperties = {
    display: 'flex',
    flexFlow: 'column',
    top: 0,
    height: windowHeight - 150,
    width: '100%',
    overflowY: 'scroll',

  };
  const chatMessagePostBoxStyle = {
    bottom: 0,
  };
  const onTimer = () => {
    dispatch(messageActions.loadChatMessages());
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
  };
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <div style={{ overflow: 'hidden', height: '95vh' }} >
        {dialogComponent()}
        {chatArea()}
        <Clock interval={10000} onTimer={onTimer}></Clock>
      </div>
    </MuiThemeProvider>
  );
}
