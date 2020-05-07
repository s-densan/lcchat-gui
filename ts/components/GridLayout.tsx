import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { IState } from '../IStore';
import { IChatMessageList } from '../states/IChatMessage';
import ChatMessageList from './ChatMessageList';
// import React, { Component, Fragment } from 'react';
import ChatMessagePostBox from './ChatMessagePostBox';

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
    display: 'flex',
    flexFlow: 'column',
    top: 0,
  };
  const chatMessagePostBoxStyle = {
    bottom: 0,
  };
  return (
    <MuiThemeProvider theme={createMuiTheme()}>
      <div style={{ overflow: 'hidden', minHeight: '100vh' }}>
        <Paper style={chatMessageListStyle}>
          <ChatMessageList
            chatBoxText={props.chatBoxText}
            // children={this.props.children}
            chatMessages={props.chatMessages} />
        </Paper>
        <div ref={bottomRef}>
          <Box component="div" style={chatMessagePostBoxStyle}>
            <ChatMessagePostBox />
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
