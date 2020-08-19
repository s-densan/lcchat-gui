import { Avatar, ListItemAvatar } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { remote } from 'electron';
import fs from 'fs';
import Moment from 'moment';
import path from 'path';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IAppConfig } from '../../common/AppConfig';
import { messageActions } from '../slices/MessageSlice';
import { RootState } from '../slices/RootStore';
import { IAttachmentMessage } from '../states/IChatMessage';
import { getAttachmentFilePath } from '../utils/FileUtils';
// import store from '../Store';

export default function ChatMessageBox(props: IAttachmentMessage) {
  const dispatch = useDispatch();
  const [, setEditingMessage] = useState('');
  // 編集モード
  // const [editMode, setEditMode] = useState(false);
  // 投稿日時
  const postedAt = Moment(props.postedAt).format('YYYY-MM-DD HH:mm');
  const userState = useSelector((state: RootState) => state.user);
  const messageState = useSelector((state: RootState) => state.message);
  // 添付ファイルパス
  const attachmentFilePath = getAttachmentFilePath(props.attachment.attachmentData.fileName);
  // もとファイルパス
  const sourceFilePath = props.attachment.attachmentData.sourceFilePath;
  // image
  const imageRef = React.createRef<HTMLImageElement>();
  const [loaded, setLoaded] = useState(false);
  const [imageData, setImageData] = useState<Buffer | undefined>(undefined);

  if (imageRef.current) {
    imageRef.current.onload = () => {
      console.log('loaded');
      setLoaded(true);

    };
  }
  /**
   * 削除ボタンを押すと、タスクを削除する
   */
  const onClickDelete = (e: React.MouseEvent) => {
    const action = messageActions.deleteChatMessage({ chatMessageId: props.messageId });
    dispatch(messageActions.deleteChatMessage({ chatMessageId: props.messageId }));
    // クリックイベントを親要素の伝播させない
    setAnchorEl(null);
    e.stopPropagation();
  };
  /**
   * 編集ボタン
   */
  const onEditChatMessage = (e: React.MouseEvent) => {
    // クリックイベントを親要素の伝播させない
    setAnchorEl(null);
    // setEditingMessage(props.messageData.text);
    dispatch(messageActions.startEditMessage({ message: props }));
    e.stopPropagation();
  };
  /**
   * 添付ファイル保存ボタン
   */
  const onClickSaveAttachmentFile = (e: React.MouseEvent) => {
    // クリックイベントを親要素の伝播させない
    setAnchorEl(null);
    const win = remote.getCurrentWindow();
    const defaultFileName = path.basename(sourceFilePath);
    const ext = path.extname(defaultFileName);
    const dialogOptions = {
      title: '保存先パス選択',
      defaultPath: defaultFileName,
      filters: [
        { name: 'Source File Extention', extensions: [ext.slice(1)/*ドットは除く*/] },
        { name: 'All Files', extensions: ['*'] },
      ],
    };
    remote.dialog.showSaveDialog(win, dialogOptions).then(
      (value) => {
        if (value.filePath) {
          // キャンセルをしなかった場合
          fs.copyFileSync(attachmentFilePath, value.filePath);
        }
      },
    );
    /*
    const saveFilePath = remote.dialog.showSaveDialogSync(win, dialogOptions);
    if (saveFilePath) {
      // // setEditingMessage(props.messageData.text);
      // dispatch(messageActions.startEditMessage({ message: props }));
      // e.stopPropagation();
    } else {
      // キャンセル
    }
    */

  };
  const onOpenMenu = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
    // store.dispatch(createDeleteChatMessageAction(props.messageId, store));
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
  };

  // メニュークリック
  const options = [
    /*
    {
      caption: '編集',
      func: onEditChatMessage,
      key: 'edit',
    },
    */
    {
      caption: '削除',
      func: onClickDelete,
      key: 'delete',
      onlyAuthor: true,
    },
    {
      caption: '添付ファイルを保存',
      func: onClickSaveAttachmentFile,
      key: 'saveAttachmentFile',
      onlyAuthor: false,
    },
  ];
  const ITEM_HEIGHT = 20;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const editMessage = () => {
    // 検討中
  }
  const onClickOkEditMessageButton = () => {
    editMessage();
  };
  const onClickCanselEditMessageButton = () => {
    dispatch(messageActions.endEditMessage());
  };
  // メッセージ編集ボックスでキー押下時のイベント
  const messageArea = () => {
    if (messageState.editingMessage !== undefined && messageState.editingMessage.messageId === props.messageId) {
      // 編集モードの場合
      return <ListItemText>
        <div>
          未実装
        </div>
        <div>
          <Button
            // variant="contained"
            color="primary"
            onClick={onClickOkEditMessageButton}
          // style={{ width: '20%' }}
          >OK</Button>
          <Button
            // variant="contained"
            color="primary"
            onClick={onClickCanselEditMessageButton}
          // style={{ width: '20%' }}
          >キャンセル</Button>
        </div>
      </ListItemText>;
    } else {
      // 編集モードでない場合
      if (isImageFile(sourceFilePath)) {
        // 画像ファイル
        // const imgSource = require(attachmentFilePath);
        fs.readFile(attachmentFilePath, (err, val) => {
          if (val) {
            setImageData(val);
          }
        });
        if (imageData) {
          // 画像ファイル読み込み済みの場合
          return (
            <ListItemText>
              <div>
                {/*<img src={imgSource} width="50%" ref={imageRef} />*/}
                {/*<img src={attachmentFilePath} width="50%" alt={attachmentFilePath} ref={imageRef}></img>*/}
                <img src={`data:image/png;base64,${imageData.toString('base64')}`}
                     width="50%"
                     alt={attachmentFilePath}
                     ref={imageRef} />
              </div>
              <div>
                {path.basename(sourceFilePath)}
              </div>
            </ListItemText>
          );
        } else {
          return (
            <ListItemText>
              <div>
                Loading
              </div>
            </ListItemText>
          );
        }
      } else if (isAudioFile(sourceFilePath)){
        // 音楽ファイル
        return (
          <ListItemText>
            <div>
              <audio controls>
                <source src={attachmentFilePath} />
                <p>音楽再生に対応していません。</p>
              </audio>
            </div>
            <div>
              {path.basename(sourceFilePath)}
            </div>
          </ListItemText>
        );
      } else if (isVideoFile(sourceFilePath)) {
        // 動画ファイル
        return (
          <ListItemText>
            <div>
              <video controls width="50%">
                <source src={attachmentFilePath} />
                <p>動画再生に対応していません。</p>
              </video>
            </div>
            <div>
              {path.basename(sourceFilePath)}
            </div>
          </ListItemText>
        );
      } else {
        // その他のファイル
        return (
          <ListItemText>
            <div>
              <FileCopyIcon>Filled</FileCopyIcon>
            </div>
            <div>
              {path.basename(sourceFilePath)}
            </div>
          </ListItemText>
        );
      }
    }
  };
  const menuButton = () => {
    if (messageState.editingMessage === undefined) {
      return <ListItemSecondaryAction
        style={{ alignContent: 'flex-end' }}>
        <IconButton
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={onOpenMenu}
          edge="end"
        >
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>;
    }
  };
  const userNameColor = (props.userId === userState.user!.userId) ? '#A00' : '#00F';

  return (
    <div style={{ width: '100%' }}>
      <Box boxShadow={1} px={1} style={{ width: '100%' }}>
        <List>
          <ListItem alignItems="flex-start" key="toriaezu">
            <ListItemAvatar key="avater">
              <Avatar
                alt="Remy Sharp"
              // src="xxxx.jpg"
              >
                {props.userAvaterText}
              </Avatar>
            </ListItemAvatar>
            <div style={{ width: '100%' }}>
              <span style={{ color: userNameColor }}>
                {props.userName === undefined ? 'unknown' : props.userName}
              </span>
              <span>   </span>
              <span style={{ color: '#77F' }}>
                {postedAt}
              </span>
              {messageArea()}
            </div>
            {menuButton()}
          </ListItem>
        </List>
      </Box>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        // keepMounted
        open={open}
        onClose={onCloseMenu}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5 * options.length,
            width: 'auto',
          },
        }}
      >
        {options.map((option) => {
          if (option.onlyAuthor ||
            (props.userId === userState.user!.userId &&
              messageState.editingMessage === undefined)
          ) {
            // 管理者限定メニューでない、または
            // 管理者でログインしている場合、使用可能なメニューを表示する
            return <MenuItem
              key={option.key}
              selected={option.key === 'Pyxis'}
              onClick={option.func}
            >
              {option.caption}

            </MenuItem>;
          } else {
            // 上記以外の場合
            // 使用不可メニューを表示する。
            return <MenuItem
              key={option.key}
              style={{ color: '#AAA' }}
            >
              {option.caption}

            </MenuItem>;
          }
        },
        )}
      </Menu>
    </div>

  );
}

const isImageFile = (filePath: string): boolean => {
  const ext = path.extname(filePath).toLowerCase();
  return /(jpe?g|gif|png|webp|bmp)/.test(ext);
};

const isAudioFile = (filePath: string): boolean => {
  const ext = path.extname(filePath).toLowerCase();
  return /(mp3|aac|m4a|ogg|wav)/.test(ext);
};
const isVideoFile = (filePath: string): boolean => {
  const ext = path.extname(filePath).toLowerCase();
  return /(mp4|mkv|m4v)/.test(ext);
};