import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {hostname} from 'os';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { v4 as UUID } from 'uuid';
import { messageActions } from '../slices/MessageSlice';
import { appConfig } from '../utils/AppConfig';

export default function ChatMessagePostBox() {
  const dispatch = useDispatch();
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
  const onClickPost = () => {
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
    const action = messageActions.postChatMessage(
      {
        chatMessageId: messageId,
        text: postMessageText,
        userId: userName,
        talkId: 'talkId',
        postedAt: nowDate,
        messageData: 'messageData',
      }
    );
    // メッセージを空にする。
    setPostMessageText('');
    // alert(props.chatBoxText);
    dispatch(action);
    // store.dispatch(createScrollToBottomAction(props.bottomRef));
    // store.dispatch(createReloadChatMessagesAction(store.dispatch));
  };
  // ボタンオブジェクト
  const postButton =
    <Button
      variant="contained"
      color="primary"
      disabled={(postMessageText.trim() === '')}
      onClick={onClickPost}
      style={{ width: '20%' }}
    >投稿</Button>;

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
      {postButton}
    </div>
  );
}
