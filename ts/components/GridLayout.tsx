import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { app, BrowserWindow, Menu, nativeImage, Tray} from 'electron';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { dialogActions } from '../slices/DialogSlice';
import { RootState } from '../slices/RootStore';
import { IChatMessageList } from '../states/IChatMessage';
import ChatMessageList from './ChatMessageList';
// import React, { Component, Fragment } from 'react';
import ChatMessagePostBox from './ChatMessagePostBox';
import OkDialog from './OkDialog';
import { userActions } from '../slices/UserSlice';

/*
app.on('ready', (launchInfo:unknown) => {

  const mainWindow: BrowserWindow = new BrowserWindow({
    // ウィンドウ作成時のオプション
    width: 250,
    height: 70,
    transparent: true,    // ウィンドウの背景を透過
    frame: false,         // 枠の無いウィンドウ
    resizable: false,     // ウィンドウのリサイズを禁止
    show: false,          // アプリ起動時にウィンドウを表示しない
    skipTaskbar: true,    // タスクバーに表示しない
  });

  // index.html を開く
  mainWindow.loadURL('file://' + __dirname + '/index.html');

  // mainWindow.on('closed', () => {
  //   // mainWindow = null;
  // });
  // タスクトレイに格納

  const trayIcon = new Tray(nativeImage.createFromPath(__dirname + '/icon.png'));

  // タスクトレイに右クリックメニューを追加
  const contextMenu = Menu.buildFromTemplate([
    { label: '表示', click: () => { mainWindow.focus(); } },
    { label: '終了', click: () => { mainWindow.close(); } }
  ]);
  trayIcon.setContextMenu(contextMenu);

  // タスクトレイのツールチップをアプリ名に
  trayIcon.setToolTip(app.getName());

  // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
  //trayIcon.on('balloon-click', () => {
  //  mainWindow.focus();
  //});
    // タスクトレイに格納 ここまで
});
*/

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
      initialRef.current = true;
    }
    bottomRef.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }/*, [message.chatMessages.length]*/);
  const userJson = JSON.parse(user.user);
  var userDataStr = '';
  for(var userData of userJson) {
    userDataStr += JSON.stringify(userData);
  }


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
      <div>
        {JSON.stringify(userDataStr)}
      </div>
    </MuiThemeProvider>
  );
}
