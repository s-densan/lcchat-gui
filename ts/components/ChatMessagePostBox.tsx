import Moment from 'moment';
import store from '../Store';
import Button from '@material-ui/core/Button';
import { createMuiTheme, createStyles, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { v4 as UUID } from 'uuid';
import {
  createPostChatMessageAction,
  createChangeChatBoxTextAction,
} from '../actions/ChatMessageActionCreators';

interface IProps {
  buttonCaption: string;
  chatBoxText: string;
}

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
export default function ChatMessagePostBox(props: IProps) {
  // const classes = useStyles();
  const [val, setVal] = useState('');
  const onChangeChatBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setVal(e.target.value.toUpperCase()); // if use local state
    const action = createChangeChatBoxTextAction(e.target.value);
    store.dispatch(action);
  }
  /**
   * 追加ボタンを押すと、チャット一覧にチャットを追加する
   */
  const onClickPost = (e: React.MouseEvent) => {
    // 投稿日時
    const nowDate = new Date();
    // メッセージIDと
    const messageId = UUID();
    // 投稿メッセージ
    const text = props.chatBoxText;
    // 投稿アクション生成
    const action = createPostChatMessageAction(
      messageId,
      text,
      'userId',
      'talkId',
      nowDate,
      'messageData',
      store,
    );
    alert(props.chatBoxText);
    store.dispatch(action);
  }

  return (
    <div>
      <TextField
        rows="4"
        helperText="投稿メッセージ"
        name="text"
        value={props.chatBoxText}
        onChange={onChangeChatBox}
      />
      <Button variant="contained" color="primary" onClick={onClickPost}>
        {props.buttonCaption}
      </Button>
    </div>
  );
}
