import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface IProps {
    open: boolean;
    title: string;
    message: string;
    enableCancel: boolean;
    onClickOk: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent> | undefined, inputText: string) => void);
    onClickCancel: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void);
}
export default function InputDialog(props: IProps) {
  const [inputText, setInputText] = useState('');

  // メッセージボックスでキー押下時のイベント
  const onKeyPressInputBox = (e: React.KeyboardEvent) => {
    if (e.which === 13 /* Enter */) {
      // マウスイベントはundefined
      props.onClickOk(undefined, inputText);
    }
  };

  const buttons =
    props.enableCancel ?
        <DialogActions>
          <Button onClick={(e) => props.onClickOk(e, inputText)} color="primary">
            OK
          </Button>
          <Button onClick={(e) => props.onClickCancel(e)} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      :
        <DialogActions>
          <Button onClick={(e) => props.onClickOk(e, inputText)} color="primary">
            OK
          </Button>
        </DialogActions> ;
  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {props.message}
          </DialogContentText>
        </DialogContent>
        <DialogContent>
          <TextField
            key="text"
            helperText=""
            name="text"
            value={inputText}
            onChange={(e) => { setInputText(e.target.value); }}
            onKeyPress={onKeyPressInputBox}
            style={{ width: '100%' }} />
        </DialogContent>
        {buttons}
      </Dialog>
    </div>
  );
}
