import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'; // 追加
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components/FoundationStyles';
import GridLayout from './components/GridLayout';
import TaskList from './components/ChatMessageList';
import TaskStore from './Store'; // 追加

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
