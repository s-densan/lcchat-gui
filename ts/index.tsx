import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'; // 追加
import { ThemeProvider } from 'styled-components';
import TaskList from './components/ChatMessageList';
import { GlobalStyle } from './components/FoundationStyles';
import GridLayout from './components/GridLayout';
import TaskStore from './Store'; // 追加
import Box from '@material-ui/core/Box'

const container = document.getElementById('contents');
ReactDom.render(
    <div>
        <Provider store={TaskStore}>
            <GridLayout />
        </Provider>
        <ThemeProvider theme={{}}>
            <GlobalStyle theme="" />
        </ThemeProvider>
    </div>,
    container,
);
