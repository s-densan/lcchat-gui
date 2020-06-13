import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux'; // 追加
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components/FoundationStyles';
import { GridLayout } from './components/GridLayout';
import { store } from './slices/RootStore'; // 追加


// タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
/*
trayIcon.on('clicked', function () {
    // mainWindow.focus();
});
*/
const container = document.getElementById('contents');
ReactDom.render(
    <div>
        <Provider store={store}>
            <GridLayout />
        </Provider>
    </div>,
    container,
);
