import {
    app,
    BrowserWindow,
    globalShortcut,
    Menu,
    nativeImage,
    Tray,
    screen,
    ipcMain,
} from 'electron';
import { join } from 'path';
import {
    appConfig,
    initAppConfig,
    IAppConfig,
} from '../common/AppConfig';

import {IGlobal} from '../common/IGlobal';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';



// configファイル読み込み
initAppConfig();
// globalに値をセットするため型をanyに強制する
declare const global: IGlobal;
<<<<<<< HEAD
// レンダープロセスとなるブラウザ・ウィンドウのオブジェクト。
// オブジェクトが破棄されると、プロセスも終了するので、グローバルオブジェクトとする。
let win: BrowserWindow | undefined;
let trayIcon: Tray;
=======
>>>>>>> 57f7ef41f5fb62b5fb6c6076f5990343af12657b
// IPC通信でGlobalを渡す
ipcMain.handle('global', (e) => {
    console.log(global);
    return global;
})
ipcMain.on('global', (e) => {
    console.log(global);
    e.returnValue = global;
})
ipcMain.handle('notify', (e) => {
    //const notify = new Notification();
    //e.returnValue = notify;
})
<<<<<<< HEAD
ipcMain.handle('getAppPath', () => {
    return app.getAppPath();
})
ipcMain.handle('getTrayIcon', () => {
    return trayIcon;
=======
ipcMain.handle('getAppPath', (e) => {
    e.returnValue = app.getAppPath();
>>>>>>> 57f7ef41f5fb62b5fb6c6076f5990343af12657b
})
// rendererプロセスからアクセスできるようにglobalに設定
global.appConfig = appConfig;
// トレイアイコン
global.trayIconImagePath1 = join(app.getAppPath(), 'img', 'talk.png');
global.trayIconImagePath2 = join(app.getAppPath(), 'img', 'talk2.png');


ipcMain.handle('getCurrentWindow', () => {
    return win;
})

function createWindow() {
    // ウィンドウ位置設定
    const desktopSize = screen.getPrimaryDisplay().workAreaSize;
    const appHeight = 800
    const appWidth = 800
    // ブラウザウィンドウの作成
    win = new BrowserWindow({
        height: appHeight,
        width: appWidth,
        x: desktopSize.width - appWidth,
        y: desktopSize.height - appHeight,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            //enableRemoteModule: true,
        },
        title: 'Communication App'
    });
    // index.html をロードする
    win.loadFile('index.html');
    // 起動オプションに、 "--debug"があれば開発者ツールを起動する
    if (process.argv.find((arg) => arg === '--debug')) {
        win.webContents.openDevTools();
    }
    // ブラウザウィンドウを閉じたときのイベントハンドラ
    win.on('closed', () => {
        // 閉じたウィンドウオブジェクトにはアクセスできない
        win = undefined;
    });

    // 最小化ボタンでタスクトレイに入れる
    if (appConfig.useTasktray) {
        win.on('minimize', () => {
            if (win) {
                win.hide();
            }
        });
        trayIcon = addTaskTray();
        setHotKey();
    }

}

// このメソッドは、Electronが初期化を終了し、
// ブラウザウィンドウを作成する準備ができたら呼び出される。
// 一部のAPIは、このイベントが発生した後にのみ使用できる。
app.on('ready', createWindow);

// 全てのウィンドウオブジェクトが閉じたときのイベントハンドラ
app.on('window-all-closed', () => {
    // macOSでは、アプリケーションとそのメニューバーがCmd + Qで
    // 明示的に終了するまでアクティブになるのが一般的なため、
    // メインプロセスは終了させない
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    // MacOSでは、ドックアイコンがクリックされ、
    // 他のウィンドウが開いていないときに、アプリケーションでウィンドウを
    // 再作成するのが一般的です。
    if (!win) {
        createWindow();
    }
});
app.on('browser-window-focus', () => {
    if (trayIcon) {
        const image = nativeImage.createFromPath(global.trayIconImagePath1);
        trayIcon.setImage(image);
    }
});

// ここから拡張
// const HOTKEY = "";
// console.log(JSON.stringify(appConfig));
const HOTKEY = appConfig.hotkeys.toggleVisible;

function addTaskTray(): Tray {
    // タスクトレイに格納

    const tray = new Tray(nativeImage.createFromPath(global.trayIconImagePath1));

    // タスクトレイに右クリックメニューを追加
    const contextMenu = Menu.buildFromTemplate([
        {
            label: '表示',
            click() {
                if (win) {
                    win.show();
                    win.focus();
                }
            },
        },
        {
            label: '終了',
            click() {
                if (win) {
                    win.close();
                }
            },
        },
    ]);
    tray.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    tray.setToolTip(app.name);

    // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
    tray.on('click', () => {
        if (win) {
            win.show();
            win.focus();
        }
    });
    return tray;
    // タスクトレイに格納 ここまで
}
function setHotKey() {
    globalShortcut.register(HOTKEY, () => {
        if (win) {
            // ホットキーでウィンドウをアクティベート
            if (win.isVisible()) {
                if (win.isFocused()) {
                    // win.minimize()
                    win.hide();
                } else {
                    win.focus();
                }
            } else {
                win.show();
                win.focus();
            }
        }
    });
}

// ElectronのMenuの設定
if (!appConfig.isDebug) {
    Menu.setApplicationMenu(new Menu());
}

