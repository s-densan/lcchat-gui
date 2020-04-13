import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Component, Fragment } from 'react';
import ChatMessagePostBox from './ChatMessagePostBox';
import { IChatMessage, IChatMessageList } from '../states/IChatMessage';
import ChatMessageList from './ChatMessageList';
import { connect } from 'react-redux';
import store from '../Store';
import { IState } from '../IStore';

/**
 * コンポーネント プロパティ
 *
 * ここでは、初期値として扱う
 */
interface IProps {
    /** タスク名 */
    taskName: string;
    /** 期限 */
    deadline: Date;
}

const inputProps = {
  step: 300,
};
const Header = () => <Fragment>Header</Fragment>;
const Content = () => <Fragment>Content</Fragment>;
const Footer = () => <Fragment>Footer</Fragment>;
const Menu = () => <Fragment>Menu</Fragment>;
class GridLayout extends Component<IChatMessageList, {}> {
  public render() {
    return (     
      <MuiThemeProvider theme={createMuiTheme()}>
      <div>
        <ChatMessageList
          chatBoxText={this.props.chatBoxText}
          //children={this.props.children}
          chatMessages={this.props.chatMessages}/>
        <ChatMessagePostBox
          buttonCaption="メッセージ"
          chatBoxText={this.props.chatBoxText} />
      </div>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = (state: IState): IChatMessageList => {
    return state.chatMessageList;
};

export default connect(mapStateToProps)(GridLayout);