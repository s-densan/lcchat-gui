import { AppBar, Drawer, MenuItem } from 'material-ui';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import React, { Component, Fragment } from 'react';
import ChatMessageList from './ChatMessageList';

const Header = () => <Fragment>Header</Fragment>;
const Content = () => <Fragment>Content</Fragment>;
const Footer = () => <Fragment>Footer</Fragment>;
const Menu = () => <Fragment>Menu</Fragment>;
class GridLayout extends Component<{}, {}>{
  public render() {
    return (
    <Fragment>
      <div style={styles.gridContainer}>
        <div style={styles.header}>
          <Header />
        </div>
        <div style={styles.content}>
      <MuiThemeProvider>
        <div>
          <Drawer
            docked={false}
            width={200}
            // open={this.props.open}
            // onRequestChange={() => this.props.onToggle()}
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
