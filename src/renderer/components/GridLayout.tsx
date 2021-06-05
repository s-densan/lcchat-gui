import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';;
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { CSSProperties } from '@material-ui/core/styles/withStyles';
import { ipcRenderer} from 'electron';
import { current } from 'immer';
import os from 'os';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IAppConfig } from '../../common/AppConfig';
import { dialogActions } from '../slices/DialogSlice';
import { messageActions } from '../slices/MessageSlice';
import { RootState } from '../slices/RootStore';
import { userActions } from '../slices/UserSlice';
import { windowActions } from '../slices/WindowSlice';
import ChatMessageList from './ChatMessageList';
import ChatMessagePostBox from './ChatMessagePostBox';
import Clock from './Clock';
import InputDialog from './dialogs/InputDialog';
import OkDialog from './dialogs/OkDialog';
import {IGlobal} from '../../common/IGlobal';




export default function GridLayout() {

  const dialog = useSelector((state: RootState) => state.dialog);
  const message = useSelector((state: RootState) => state.message);
  const user = useSelector((state: RootState) => state.user);
  const windowSlice = useSelector((state: RootState) => state.window);
  const [initial, setInitial] = useState<boolean>(false);
  const [windowHeight, setWindowHeight] = useState<number>(window.parent.screen.height);
  const dispatch = useDispatch();
  var appConfig: IAppConfig;

  // var currentWindow: BrowserWindow;
  ipcRenderer.on("resize", (event, arg) => {
    const [_, h] = arg
    setWindowHeight(h)
  });

  // Electronから情報取得
  // すべてのPromiseの実行完了まで待機する。

  const bottomRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    // 初回のみ実行
    if (initial === false) {
      // store.dispatch(createScrollToBottomAction(bottomRef));
      dispatch(userActions.loadUserFromComputerName({computerName: os.hostname()}));
      setInitial(true);
      // dispatch(windowActions.initWindowState({bottomRef}));
      // Windowリサイズイベント
      ///* 一時コメントアウト mainprocess に持っていく
      /*
      async () => {
        const fixWindowHeight = async () => {
          const [, h] = await ipcRenderer.invoke('getCurrentWindow')
          if (h !== windowHeight) {
            setWindowHeight(h);
          }
        };
        await fixWindowHeight();
      }
      */
     /*
      const fixWindowHeight = () => {
          const [, h] = win.getSize()
          if (h !== windowHeight) {
            setWindowHeight(h);
          }
        }
      };
      if (win) {
        win.on('resize', fixWindowHeight);
      }
      */
      dispatch(windowActions.moveToBottom());
    }
    // 初期化が済んでもユーザがundefinedの場合
    if (user.user === undefined && dialog.dialogData === undefined && initial) {
      // ユーザ登録ダイアログ表示アクション
      dispatch(dialogActions.openInputDialog({
        message: 'ユーザが登録されていません',
        name: 'ん？',
        title: 'ユーザ登録',
        enableCancel: false,
        // キャンセル時・クローズ時は何もしない
        // onClickCancel: () => dispatch(dialogActions.closeDialog()),
        onClickCancel: () => { },
        onClickOk: () => dispatch(dialogActions.closeDialog()),
        // onClose: () => dispatch(dialogActions.closeDialog()),
        onClose: () => { },
      }));
    }
    // スクロール位置がbottomの場合かつチャットメッセージのロードが完了して1件以上存在する場合
    // bottomRefまでスクロールし、scrollUnsetアクションをディスパッチする。
    if (windowSlice.scrollPosition === 'bottom' && message.chatMessages.length > 0) {
      if (bottomRef.current) {
        bottomRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
      }
      dispatch(windowActions.scrollUnset());
    }
  }/*, [message.chatMessages.length]*/);

  const windowHeightVh = (windowHeight - 150) / windowHeight * 100;
  const chatMessageListStyle: CSSProperties = {
    display: 'flex',
    flexFlow: 'column',
    top: 0,
    height: windowHeight - 150,
    // height: `${windowHeightVh}vh`,
    width: '100%',
    overflowY: 'scroll',
    transform: 'translateZ(0)',

  };
  const chatMessagePostBoxStyle = {
    bottom: 0,
    width: '100%',
  }
  // DBファイルから新規メッセージ読み込み
  const onTimer = () => {
    console.info('GridLayout.onTimer')
    dispatch(messageActions.loadNewChatMessages())
  }
  // タイマークロック用エリア
  const clockArea = () => {
    if (message.editingMessage === undefined) {
      //const reloadIntervalSecond = await ipcRenderer.invoke('getReloadIntervalSecond')
      // const reloadIntervalSecond = useEffect(async () => {await ipcRenderer.invoke('getReloadIntervalSecond')}, [])
      // const reloadIntervalSecond = 1
      const [posts, setPosts] = React.useState();
      React.useEffect(() => {
        const ggg = async () => {
          const reloadIntervalSecond = await ipcRenderer.invoke('getReloadIntervalSecond')
          console.log('getReloadIntervalSecond:' + reloadIntervalSecond )
          // 編集中モードでない場合
          return <Clock interval={reloadIntervalSecond * 1000} onTimer={onTimer}></Clock>;
        }
        ggg()
      }, [])
    } else {
      return <div></div>;
    }
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
              const userInfo = { 
                userId: inputText,
                userName: inputText,
                computerName: os.hostname(),
              };
              dispatch(userActions.insertUser(userInfo));
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
      return <div style={{width: '100%'}}>
        {/*</div><Paper style={chatMessageListStyle}>*/}
        <Paper style={chatMessageListStyle}>
          <ChatMessageList chatMessages={message.chatMessages} bottomRef={bottomRef} />
        </Paper>
        <Box component="div" style={chatMessagePostBoxStyle}>
          <ChatMessagePostBox bottomRef={bottomRef} />
        </Box>
      </div>;
    } else {
      return <div></div>;
    }
  };
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      {/**/}
      <div style={{ overflow: 'hidden', height: '95vh' }}>
        { /*
          // ファイル選択ダイアログを表示する場合
          <input {...getInputProps()} />
        */ }

        {dialogComponent()}
        {chatArea()}
        {clockArea()}
      </div>
      <div>
        {/*
        <Button onClick={notificationTest}>aa</Button>
        */}
      </div>
    </MuiThemeProvider>
  );
}
