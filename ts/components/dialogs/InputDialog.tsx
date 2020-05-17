import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { useState } from 'react';
import { TextField } from '@material-ui/core';

interface IProps {
    open: boolean;
    title: string;
    message: string;
    onClickOk: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
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
          <Button onClick={props.onClickOk} color="primary">
            OK
          </Button>
        </DialogActions>
        <DialogActions>
          <Button onClick={props.onClickCancel} color="primary">
            キャンセル
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

