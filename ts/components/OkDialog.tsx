import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import React from 'react';

interface IProps {
    open: boolean;
    title: string;
    message: string;
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void);
}
export default function OkDialog(props: IProps) {

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
        <DialogActions>
          <Button onClick={props.onClick} color="primary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
