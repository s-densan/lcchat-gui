import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import MenuItem from '@material-ui/core/MenuItem';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import React, { Component, Fragment } from 'react';
import ChatBox from './ChatBox';
import ChatMessageList from './ChatMessageList';

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
class GridLayout extends Component<{}, {}> {
  public render() {
    return (     
      <div>
        <ChatMessageList />
        <ChatBox buttonCaption="メッセージ" />
      </div>
    );
    /*
    return (
      <Fragment>
        <div style={styles.gridContainer}>
          <div style={styles.header}>
            <Header />
          </div>
          <div style={styles.content}>
            <MuiThemeProvider theme={createMuiTheme()}>
              <div>
                <Drawer
                // open={this.onClickMenu}
                >
                  <MenuItem>React</MenuItem>
                  <MenuItem>Redux</MenuItem>
                  <MenuItem>React Router</MenuItem>
                  <MenuItem>Material UI</MenuItem>
                  <MenuItem>Electron</MenuItem>
                </Drawer>
                <AppBar
                  title="React Study"
                // onLeftIconButtonTouchTap={ () => this.props.onToggle()}
                />

                <TextField id="time" type="time" inputProps={inputProps} />;
                <ChatMessageList />
                <ChatBox buttonCaption="メッセージ" />
              </div>
            </MuiThemeProvider>
          </div>
          <div style={styles.menu}>
            <Menu />
          </div>
          <div style={styles.footer}>
            <Footer />
          </div>
        </div>
      </Fragment>
    );
  }
  private onClickMenu = (id: string, e: React.MouseEvent<HTMLElement>) => {
      // store.dispatch(createToggleCompleteAction(id, store));
      // do nothing
  }
}

export default GridLayout;
/*
export default function Layout() {
  return (
    <Fragment>
      <div style={styles.gridContainer}>
        <div style={styles.header}>
          <Header />
        </div>
        <div style={styles.content}>
          <ChatMessageList></ChatMessageList>
          <Content />
        </div>
        <div style={styles.menu}>
          <Menu />
        </div>
        <div style={styles.footer}>
          <Footer />
        </div>
      </div>
    </Fragment>
  );
}
*/

/*
const styles = {
  content: {
    backgroundColor: 'rgb(230, 255, 230)',
    gridArea: 'content',
  },
  footer: {
    backgroundColor: 'rgb(200, 200, 200)',
    gridArea: 'footer',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateAreas: `
        "menu header  header"
        "menu content content"
        "menu footer  footer"
    `,
    gridTemplateColumns: `1fr 2fr 2fr`,
    gridTemplateRows: `
      50px
      1fr
      50px
    `,
    height: '600px',
    width: '800px',
  },
  header: {
    backgroundColor: 'rgb(100, 200, 200)',
    gridArea: 'header',
  },
  menu: {
    backgroundColor: 'rgb(100, 100, 200)',
    gridArea: 'menu',
  },
};
*/
