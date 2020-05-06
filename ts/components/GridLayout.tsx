import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
// import React, { Component, Fragment } from 'react';
import ChatMessagePostBox from './ChatMessagePostBox';
import { IChatMessage, IChatMessageList } from '../states/IChatMessage';
import ChatMessageList from './ChatMessageList';
import { connect } from 'react-redux';
import store from '../Store';
import { IState } from '../IStore';
import Button from '@material-ui/core/Button';
import React, { useEffect, useRef } from 'react';
//import { createScrollToBottomAction } from '../actions/WindowActions';

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

export function GridLayout(props: IChatMessageList) {
  const initialRef = useRef<boolean>(false);

  const bottomRef = React.createRef<HTMLDivElement>();
  useEffect(() => {
    // 初回のみ実行
    if (initialRef.current === false) {
      // store.dispatch(createScrollToBottomAction(bottomRef));
      initialRef.current = true;
    }
    bottomRef.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });

  }, [props.chatMessages.length]);

  const chatMessageListStyle = {
    top: 0,
    display: 'flex',
    flexFlow: 'column',
  };
  const chatMessagePostBoxStyle = {
    bottom: 0,
  };
  const onClickTest = (e: React.MouseEvent) => {
    bottomRef.current!.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  };
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <div style={{ overflow: 'hidden', minHeight: '100vh' }}>
        <Button
          onClick={onClickTest}
        >
          aaaa
          </Button>
        <Paper style={chatMessageListStyle}>
          <ChatMessageList
            chatBoxText={props.chatBoxText}
            // children={this.props.children}
            chatMessages={props.chatMessages} />
        </Paper>
        <div ref={bottomRef}>
          <Box component="div" style={chatMessagePostBoxStyle}>
            <ChatMessagePostBox bottomRef={bottomRef} />
          </Box>
        </div>
      </div>
    </MuiThemeProvider>
  );
}

const mapStateToProps = (state: IState): IChatMessageList => {
  return state.chatMessageList;
};

export default connect(mapStateToProps)(GridLayout);
