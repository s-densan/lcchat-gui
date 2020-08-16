import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as UUID } from 'uuid';
import { messageActions } from '../slices/MessageSlice';
import { RootState } from '../slices/RootStore';
import { windowActions } from '../slices/WindowSlice';
import fs from 'fs';

export default function ChatMessagePostBox(props: { bottomRef?: React.RefObject<HTMLDivElement> }) {
  // ドラッグアンドドロップ
  const {acceptedFiles, getRootProps} = useDropzone();
  const dispatch = useDispatch();
  // const classes = useStyles();
  const [postMessageText, setPostMessageText] = useState('');
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (acceptedFiles.length === 1) {
      // ファイルパスが存在する場合
      if (fs.existsSync(acceptedFiles[0].path)) {
        const srcFilePath = acceptedFiles[0].path;
        // 投稿日時
        const nowDate = new Date();
        // メッセージIDと
        const messageId = UUID();
        const newMessage = {
          sourceFilePath: srcFilePath,
          chatMessageId: messageId,
          userId: user.user === undefined ? '' : user.user.userId,
          userName: user.user === undefined ? '' : user.user.userData.userName,
          userAvaterText: user.user === undefined ? '' : user.user.userData.userName.slice(0, 2),
          talkId: 'talkId',
          postedAt: nowDate,
          bottomRef: props.bottomRef,
        };

        const action = messageActions.postAttachmentMessage(newMessage);
        dispatch(action);

      }
    }
  }, [acceptedFiles]);
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
  const onClickPaste = () => {
  };

  /*
  const attachmentFile = () => {
    // ファイルパスが存在する場合
    if (fs.existsSync(attachmentFilePath)) {
      const filePath = attachmentFilePath;
      const ext = path.extname(filePath).toLowerCase();
      if (/(jpe?g|gif|png|webp)/.test(ext)) {
        return <div><CardMedia image={'file://' + filePath} title=""></CardMedia>
          <img src={'file://' + filePath} title="" width="32" height="32"></img></div>;
      } else {
        return <div>{ext}</div>;
      }
    }
  };
  */

  const postMessage = () => {
    // 投稿日時
    const nowDate = new Date();
    // メッセージIDと
    const messageId = UUID();
    // 投稿アクション生成
    const action = messageActions.postTextMessage(
      {
        chatMessageId: messageId,
        text: postMessageText,
        userId: user.user === undefined ? '' : user.user.userId,
        userName: user.user === undefined ? '' : user.user.userData.userName,
        userAvaterText: user.user === undefined ? '' : user.user.userData.userName.slice(0, 2),
        talkId: 'talkId',
        postedAt: nowDate,
        messageData: { text: postMessageText },
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

  const style = {
    display: 'flex',
    flexFlow: 'row',
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
  }
  return (
    <div {...getRootProps()} style={style}>
      <TextField
        rows="4"
        helperText="投稿メッセージ"
        name="text"
        value={postMessageText}
        onChange={onChangeChatMessagePostBox}
        onKeyPress={onKeyPressMessagePostBox}
        style={{width: '100%', marginRight: 'auto'}}
      />
      <Button
        variant="contained"
        color="primary"
        disabled={(postMessageText.trim() === '')}
        onClick={onClickPost}
        style={{
          width: '40px',
          height: '40px',
          marginLeft: '4px',
          marginRight: '4px',
        }}
      >投稿</Button>
      <Button
        variant="contained"
        color="primary"
        disabled={false}
        onClick={onClickPaste}
        style={{ width: '105px', height: '40px' }}
      >貼付け</Button>
    </div>
  );
}
