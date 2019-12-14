import React, { Fragment } from 'react';
const Header = () => <Fragment>Header</Fragment>;
const Content = () => <Fragment>Content</Fragment>;
const Footer = () => <Fragment>Footer</Fragment>;
const Menu = () => <Fragment>Menu</Fragment>;
export default function Layout() {
  return (
    <Fragment>
      <div style={styles.gridContainer}>
        <div style={styles.header}>
          <Header />
        </div>
        <div style={styles.content}>
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
