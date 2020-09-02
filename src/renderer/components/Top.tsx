import GridLayout from './GridLayout'
import React, { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

export default function Top() {
  const open = () => {};
  const handleDrawerClose = () => {};
  return (
    <div>
      <Drawer
        className=""
        variant="persistent"
        anchor="left"
        open={open}
        classes={/*{
          paper: classes.drawerPaper,
        }*/}
      >
        <div>
          <IconButton onClick={handleDrawerClose}>
            {/*{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}*/}
          </IconButton>
        </div>
        <Divider />
        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <GridLayout />
    </div>
  );
}
