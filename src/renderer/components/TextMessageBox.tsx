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
import TextField from '@material-ui/core/TextField';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Moment from 'moment';
import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { messageActions } from '../slices/MessageSlice';
import { RootState } from '../slices/RootStore';
import { ITextMessage } from '../states/IChatMessage';
// import store from '../Store';


export default function TextMessageBox(props: ITextMessage) {
  const dispatch = useDispatch();
  // 
  const [editingMessage, setEditingMessage] = useState('');
  // 編集モード
  // const [editMode, setEditMode] = useState(false);
  // 投稿日時
  const postedAt = Moment(props.postedAt).format('YYYY-MM-DD HH:mm');
  const userState = useSelector((state: RootState) => state.user);
  const messageState = useSelector((state: RootState) => state.message);
  /**
   * 削除ボタンを押すと、タスクを削除する
   */
  const onClickDelete = (e: React.MouseEvent) => {
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
    setEditingMessage(props.messageData.text);
    dispatch(messageActions.startEditMessage({ message: props }));
    e.stopPropagation();
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
    {
      caption: '編集',
      func: onEditChatMessage,
      key: 'edit',
    },
    {
      caption: '削除',
      func: onClickDelete,
      key: 'delete',
    },
  ];
  const ITEM_HEIGHT = 20;
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const editMessage = () => {
    if (editingMessage !== props.messageData.text) {
      dispatch(messageActions.updateChatMessage({ chatMessageId: props.messageId, text: editingMessage }));
    }
    dispatch(messageActions.endEditMessage());
  }
  const onChangeChatMessageEditBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingMessage(e.target.value);
  };
  const onClickOkEditMessageButton = () => {
    editMessage();
  };
  const onClickCanselEditMessageButton = () => {
    dispatch(messageActions.endEditMessage());
  };
  const toMultiline = (text: string) => {
    if (text) {
      return text.split('\n').map((line, idx) => {
        return <div key={idx}>{line}</div>;
      });
    } else {
      return '';
    }
  };
  // メッセージ編集ボックスでキー押下時のイベント
  const onKeyPressChatMessageEditBox = (e: React.KeyboardEvent) => {
    if (e.which === 13 /* Enter */) {
      editMessage();
    }
  };
  const messageArea = () => {
    if (messageState.editingMessage !== undefined && messageState.editingMessage.messageId === props.messageId) {
      // 編集モードの場合
      return <ListItemText style={{width: '100%'}}>
        <div>
          <TextField
            helperText=""
            name="text"
            multiline
            type="text"
            value={editingMessage}
            onKeyPress={onKeyPressChatMessageEditBox}
            onChange={onChangeChatMessageEditBox}
            style={{ width: '100%' }} />
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
      return <ListItemText>
        <div>
          {toMultiline(props.messageData.text)}
        </div>
      </ListItemText>;
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
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
              // src="xxxx.jpg"
              >
                {props.userAvaterText}
              </Avatar>
            </ListItemAvatar>
            <div style={{ width: '100%'}}>
              <ListItemText>
                <div style={{ width: '100%' }}>
                  <span style={{ color: userNameColor }}>
                    {props.userName === undefined ? 'unknown' : props.userName}
                  </span>
                  <span>   </span>
                  <span style={{ color: '#77F' }}>
                    {postedAt}
                  </span>
                </div>
              </ListItemText>
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
            maxHeight: ITEM_HEIGHT * 4.5,
            width: 'auto',
          },
        }}
      >
        {options.map((option) => {
          if (props.userId === userState.user!.userId && messageState.editingMessage === undefined) {
            return <MenuItem
              selected={option.key === 'Pyxis'}
              onClick={option.func}
              key={option.key}
            >
              {option.caption}

            </MenuItem>;
          } else {
            return <MenuItem
              style={{ color: '#AAA' }}
              key={option.key}
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
