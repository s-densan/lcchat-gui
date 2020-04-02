import Moment from 'moment';
import store from '../Store';
import Button from '@material-ui/core/Button';
import { createMuiTheme, createStyles, makeStyles, MuiThemeProvider, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React from 'react';
import { v4 as UUID } from 'uuid';
import {
  createPostChatMessageAction,
  createChangeChatBoxTextAction,
} from '../actions/ChatMessageActionCreators';

interface IProps {
  buttonCaption: string;
  chatBoxText: string;
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
  public constructor(props: IProps) {
    super(props);
    /*
    this.state = {
      postedAt: new Date(),
      text : "",
    }*/
  }
  
  public render() {
    //const classes = useStyles();

    return (
        <div>
          <TextField
            rows="4"
            helperText="投稿メッセージ"
            name="text"
            value={this.props.chatBoxText}
            onChange={this.onChangeChatBox}
            />
          <Button variant="contained" color="primary" onClick={this.onClickPost}>
            {this.props.buttonCaption}
          </Button>
        </div>
    );
  }
  /**
   * 追加ボタンを押すと、チャット一覧にチャットを追加する
   */
  private onChangeChatBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const action = createChangeChatBoxTextAction(e.target.value);
    store.dispatch(action);
  }
  /**
   * 追加ボタンを押すと、チャット一覧にチャットを追加する
   */
  private onClickPost = (e: React.MouseEvent) => {
    // 投稿日時
    const nowDate = new Date();
    // メッセージIDと
    const messageId = UUID();
    // 投稿メッセージ
    const text = this.props.chatBoxText;
    // 投稿アクション生成
    const action = createPostChatMessageAction(
      messageId,
      text,
      'userId',
      'talkId',
      nowDate,
      'messageData',
      store,
    );
    store.dispatch(action);
    const m = Moment(nowDate).add(1, 'days');
    this.setState({
      postedAt: m.toDate(),
      text: '',
    });
  }
}
