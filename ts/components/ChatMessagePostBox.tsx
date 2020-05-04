import Moment from 'moment';
import store from '../Store';
import Button from '@material-ui/core/Button';
import { createMuiTheme, createStyles, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState, memo } from 'react';
import { v4 as UUID } from 'uuid';
import {
  createPostChatMessageAction,
  createReloadChatMessagesAction,
} from '../actions/ChatMessageActionCreators';


// スタイルを定義
const useStyles = makeStyles((theme: Theme) =>
  createStyles(
    {
      root: {
        padding: theme.spacing(2),
      },
      title: {
        borderBottom: `2px solid ${theme.palette.primary.main}`,
      },
    },
  )
);
export default function ChatMessagePostBox(props: {}) {
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
    // 投稿アクション生成
    const action = createPostChatMessageAction(
      messageId,
      postMessageText,
      'userId',
      'talkId',
      nowDate,
      'messageData',
      store,
    );
    // メッセージを空にする。
    setPostMessageText('');
    // alert(props.chatBoxText);
    store.dispatch(action);
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
      />
      <Button variant="contained" color="primary" onClick={onClickPost}>
        {buttonText}
      </Button>
    </div>
  );
}
