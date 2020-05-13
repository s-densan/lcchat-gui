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
import {
    createDeleteChatMessageAction,
    createShowChatMessageMenuAction,
    createUpdateChatMessageAction,
} from '../actions/ChatMessageActionCreators';
import { IChatMessage } from '../states/IChatMessage';
// import store from '../Store';

export default function ChatMessageBox(props: IChatMessage) {
    const [editingMessage, setEditingMessage] = useState('');
    const [editMode, setEditMode] = useState(false);
    const postedAt = Moment(props.postedAt).format('YYYY-MM-DD hh:mm');
    /**
     * ボックスをクリックすると、メニュー表示する
     */
    const onClickBox = (id: string, e: React.MouseEvent<HTMLElement>) => {
        store.dispatch(createShowChatMessageMenuAction(id/*, store*/));
        // store.dispatch(createDeleteChatMessageAction(id, store));
    };
    /**
     * 削除ボタンを押すと、タスクを削除する
     */
    const onClickDelete = (e: React.MouseEvent) => {
        store.dispatch(createDeleteChatMessageAction(props.messageId));
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
            store.dispatch(createUpdateChatMessageAction(props.messageId, editingMessage));
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
            return <ListItemText>
                <p>
                    <TextField
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
            return <ListItemText>
                {toMultiline(props.text)}
            </ListItemText>;
        }
    };
    const menuButton = () => {
        if (!editMode) {
            return <ListItemSecondaryAction style={{ alignContent: 'flex-end' }}>
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
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                            <Avatar
                                alt="Remy Sharp"
                                // src="xxxx.jpg"
                            >
                                SU
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
                {options.map((option) => (
                    <MenuItem
                        key={option.key}
                        selected={option.key === 'Pyxis'}
                        onClick={option.func}>
                        {option.caption}
                    </MenuItem>
                ))}
            </Menu>
        </div>

    );
}
