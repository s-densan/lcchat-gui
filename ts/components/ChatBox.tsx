import React from "react";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

interface IProps{
}
export default class ChatBox extends React.Component<IProps, {}> {
  render() {
    return (
      <MuiThemeProvider>
        <div className="ChatBox">
          <div className="">
            <TextField name='user_name' className=""  placeholder="Name" />
            <br />
            <TextField name='profile_image' className="" placeholder="Profile Image URL" />
          </div>
          <TextField rows="4" name='text' className="" />
          <Button variant="contained" color="primary">
            Primary
            </Button>

        </div>
      </MuiThemeProvider>
    );
  }
}
