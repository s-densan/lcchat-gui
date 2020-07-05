import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as UUID } from 'uuid';
import { messageActions } from '../slices/MessageSlice';
import { RootState } from '../slices/RootStore';
import { windowActions } from '../slices/WindowSlice';

export default function ChatMessagePostBox(props: { bottomRef?: React.RefObject<HTMLDivElement> }) {
  const dispatch = useDispatch();
  // const classes = useStyles();
  const [postMessageText, setPostMessageText] = useState('');
  const user = useSelector((state: RootState) => state.user);
  // 投稿ボタン表示文字
  const onChangeChatMessagePostBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPostMessageText(e.target.value); // if use local state
  };
  // メッセージボックスでキー押下時のイベント
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
    // 投稿アクション生成
    const action = messageActions.postChatMessage(
      {
        chatMessageId: messageId,
        text: postMessageText,
        userId: user.user === undefined ? '' : user.user.userId,
        userName: user.user === undefined ? '' : user.user.userData.userName,
        userAvaterText: user.user === undefined ? '' : user.user.userData.userName.slice(0, 2),
        talkId: 'talkId',
        postedAt: nowDate,
        messageData: 'messageData',
        bottomRef: props.bottomRef,
      },
    );
    // メッセージを空にする。
    setPostMessageText('');
    // alert(props.chatBoxText);
    dispatch(action);
    // 最下部へスクロール
    dispatch(windowActions.moveToBottom());
    // props.bottomRef!.current!.scrollIntoView();
    // dispatch(windowActions.moveToBottom(props.bottomRef));
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
