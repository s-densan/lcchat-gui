import Button from '@material-ui/core/Button';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';

interface IProps {
  buttonCaption: string;
}
export default class ChatBox extends React.Component<IProps, {}> {
  public render() {
    return (
      <MuiThemeProvider theme={createMuiTheme()}>
        <div className="ChatBox">
          <TextField rows="4" helperText="投稿メッセージ" name="text" className="" />
          <Button variant="contained" color="primary">
            {this.props.buttonCaption}
          </Button>
        </div>
      </MuiThemeProvider>
    );
  }
}
