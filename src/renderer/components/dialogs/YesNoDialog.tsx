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
  onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>, yesClick: boolean) => void);
  onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void);
}
export default function YesNoDialog(props: IProps) {

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
          <Button onClick={(e) => props.onClick(e, true)} color="primary">
            YES
          </Button>
          <Button onClick={(e) => props.onClick(e, false)} color="primary" autoFocus>
            NO
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
