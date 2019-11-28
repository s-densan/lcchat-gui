import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'; // 追加
import UserForm from './components/UserForm'; // 追加
import TaskList from './components/TaskList';
import UserStore from './UserStore'; // 追加
import TaskStore from './TaskStore'; // 追加
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components/FoundationStyles';


const container = document.getElementById('contents');
/*
ReactDom.render(
    <Provider store={UserStore}>
        <UserForm />
    </Provider>,
    container,
);
*/
ReactDom.render(
    <div>
        <Provider store={TaskStore}>
            <TaskList />
        </Provider>
        <ThemeProvider theme={{}}>
            <GlobalStyle theme="" />
        </ThemeProvider>
    </div>,
    container,
);
