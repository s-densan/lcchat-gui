import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CardMedia from '@material-ui/core/CardMedia';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as UUID } from 'uuid';
import { messageActions } from '../slices/MessageSlice';
import { RootState } from '../slices/RootStore';
import { windowActions } from '../slices/WindowSlice';
import fs from 'fs';
import path from 'path';
import { useDropzone } from 'react-dropzone';
import { remote } from 'electron';

export default function ChatMessagePostBox(props: { bottomRef?: React.RefObject<HTMLDivElement> }) {
  // ドラッグアンドドロップ
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const dispatch = useDispatch();
  // const classes = useStyles();
  const [postMessageText, setPostMessageText] = useState('');
  const [attachmentFilePath, setAttachmentFilePath] = useState('');
  const user = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if(acceptedFiles.length == 1){
      // ファイルパスが存在する場合
      if (fs.existsSync(acceptedFiles[0].path)) {
        const srcFilePath = acceptedFiles[0].path;
        const dstFilePath = path.join(remote.app.getAppPath(), path.basename(srcFilePath));
        const ext = path.extname(srcFilePath).toLowerCase();
        if (/(jpe?g|gif|png|webp)/.test(ext)) {
          fs.copyFileSync(srcFilePath, dstFilePath);
          setAttachmentFilePath(dstFilePath);
          // 投稿日時
          const nowDate = new Date();
          // メッセージIDと
          const messageId = UUID();
          const newMessage = {
              chatMessageId: messageId,
              attachmentPath: dstFilePath,
              userId: user.user === undefined ? '' : user.user.userId,
              userName: user.user === undefined ? '' : user.user.userData.userName,
              userAvaterText: user.user === undefined ? '' : user.user.userData.userName.slice(0, 2),
              talkId: 'talkId',
              postedAt: nowDate,
              bottomRef: props.bottomRef,
            };
          messageActions.postAttachmentMessage(newMessage);

          alert(JSON.stringify(newMessage));
        } else {
          // do nothing
        }
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

  const attachmentFile = () => {
    // ファイルパスが存在する場合
    if (fs.existsSync(attachmentFilePath)) {
      const filePath = attachmentFilePath;
      const ext = path.extname(filePath).toLowerCase();
      if (/(jpe?g|gif|png|webp)/.test(ext)) {
        return <div><CardMedia image={"file://" + filePath} title=""></CardMedia>
        <img src={"file://" + filePath} title="" width="32" height="32"></img></div>;
      } else {
        return <div>{ext}</div>;
      }
    }
  };

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
  const postButton =
    <Button
      variant="contained"
      color="primary"
      disabled={(postMessageText.trim() === '')}
      onClick={onClickPost}
      style={{ width: '20%' }}
    >投稿</Button>;

  return (
    <div {...getRootProps()}>
      <TextField
        rows="4"
        helperText="投稿メッセージ"
        name="text"
        value={postMessageText}
        onChange={onChangeChatMessagePostBox}
        onKeyPress={onKeyPressMessagePostBox}
        style={{ width: '30%' }}
      />{attachmentFile()}
      {postButton}
      {attachmentFilePath}
    </div>
  );
}
