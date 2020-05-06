import Button from '@material-ui/core/Button';
import { createMuiTheme, createStyles, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Moment from 'moment';
import {hostname} from 'os';
import React, { memo, useState } from 'react';
import { v4 as UUID } from 'uuid';
// import createScrollToBottomAction from '../action/WindowActions';
import {
  createPostChatMessageAction,
  createReloadChatMessagesAction,
} from '../actions/ChatMessageActionCreators';
import store from '../Store';

// スタイルを定義
const useStyles = makeStyles((theme: Theme) => {
  createStyles(
    {
      root: {
        padding: theme.spacing(2),
      },
      title: {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
    },
  );
});

export default function ChatMessagePostBox(props: { bottomRef: React.RefObject<HTMLDivElement> }) {
  // const classes = useStyles();
  const [postMessageText, setPostMessageText] = useState('');
  // 投稿ボタン表示文字
  const buttonText = postMessageText.trim() === '' ? 'boo' : '投稿';
  const onChangeChatMessagePostBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostMessageText(e.target.value); // if use local state
  };
  const onKeyPressMessagePostBox = (e: React.KeyboardEvent) => {
    if (e.which === 13 /* Enter */) {
      postMessage();
    }
  };
  /**
   * 追加ボタンを押すと、チャット一覧にチャットを追加する
   */
  const onClickPost = (e: React.MouseEvent) => {
    postMessage();
  };

  const postMessage = () => {
    // 投稿日時
    const nowDate = new Date();
    // メッセージIDと
    const messageId = UUID();
    // ユーザ名（今の所ホスト名）
    const userName = hostname();
    // 投稿アクション生成
    const action = createPostChatMessageAction(
      messageId,
      postMessageText,
      userName,
      'talkId',
      nowDate,
      'messageData',
      store,
    );
    // メッセージを空にする。
    setPostMessageText('');
    // alert(props.chatBoxText);
    store.dispatch(action);
    // store.dispatch(createScrollToBottomAction(props.bottomRef));
    // store.dispatch(createReloadChatMessagesAction(store.dispatch));
  };

  return (
    <div>
      <TextField
        rows="4"
        helperText="投稿メッセージ"
        name="text"
        value={postMessageText}
        onChange={onChangeChatMessagePostBox}
        onKeyPress={onKeyPressMessagePostBox}
        style={{ width: '80%' }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={onClickPost}
        style={{ width: '20%'}}
      >
        {buttonText}
      </Button>
    </div>
  );
}
