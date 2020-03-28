import Button from '@material-ui/core/Button';
import { createMuiTheme, createStyles, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';

interface IProps {
  buttonCaption: string;
}

// スタイルを定義
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    },
    title: {
      borderBottom: `2px solid ${theme.palette.primary.main}`
    }
  })
);

export default class ChatBox extends React.Component<IProps, {}> {
  public render() {
    //const classes = useStyles();

    return (
        <div>
          <TextField rows="4" helperText="投稿メッセージ" name="text" />
          <Button variant="contained" color="primary">
            {this.props.buttonCaption}
          </Button>
        </div>
    );
  }
}
