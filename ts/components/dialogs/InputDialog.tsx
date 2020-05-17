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
    onClickOk: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, inputText: string) => void);
    onClickCancel: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void);
}
export default function InputDialog(props: IProps) {
  const [inputText, setInputText] = useState('');

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
            style={{ width: '100%' }} />
        </DialogContent>
        <DialogActions>
          <Button onClick={(e) => props.onClickOk(e, inputText)} color="primary">
            OK
          </Button>
          <Button onClick={(e) => props.onClickCancel(e)} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
