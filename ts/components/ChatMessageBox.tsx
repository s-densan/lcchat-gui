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
import { IChatMessage } from '../states/IChatMessage';
import { RootState } from '../slices/RootStore';
// import store from '../Store';

export default function ChatMessageBox(props: IChatMessage) {
  const dispatch = useDispatch();
  const [editingMessage, setEditingMessage] = useState('');
  const [editMode, setEditMode] = useState(false);
  const postedAt = Moment(props.postedAt).format('YYYY-MM-DD hh:mm');
  const user = useSelector((state: RootState) => state.user);
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
    setEditingMessage(props.text);
    setEditMode(true);
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

  const onChangeChatMessageEditBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingMessage(e.target.value);
  };
  const onClickOkEditMessageButton = (e: React.MouseEvent) => {
    if (editingMessage !== props.text) {
      dispatch(messageActions.updateChatMessage({ chatMessageId: props.messageId, text: editingMessage }));
    }
    setEditMode(false);
  };
  const onClickCanselEditMessageButton = (e: React.MouseEvent) => {
    setEditMode(false);
  };
  const toMultiline = (text: string) => {
    return text.split('\n').map((line, idx, arr) => {
      return <div>{line}</div>;
    });
  };
  const messageArea = () => {
    if (editMode) {
      return <ListItemText key="message">
        <p>
          <TextField
            key="text"
            helperText=""
            name="text"
            multiline
            value={editingMessage}
            onChange={onChangeChatMessageEditBox}
            style={{ width: '100%' }} />
        </p>
        <p>
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
        </p>
      </ListItemText>;
    } else {
      return <ListItemText key="text2">
        <div style={{ color: '#00F' }}>
          {props.userName === undefined ? 'unknown' : props.userName}
        </div>
        <div>
          {toMultiline(props.text)}
        </div>
      </ListItemText>;
    }
  };
  const menuButton = () => {
    if (!editMode) {
      return <ListItemSecondaryAction
        key="notedit"
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
            {messageArea()}
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
          if (props.userId === user.user!.userId) {
            return <MenuItem
              key={option.key}
              selected={option.key === 'Pyxis'}
              onClick={option.func}
            >
              {option.caption}

            </MenuItem>;
          } else {
            return <MenuItem
              key={option.key}
              style={{ color: '#AAA' }}
            >
              {option.caption}

            </MenuItem>;
          }
        }
        )}
      </Menu>
    </div>

  );
}
