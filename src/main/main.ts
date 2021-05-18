import {
    app,
    BrowserWindow,
    globalShortcut,
    Menu,
    nativeImage,
    Tray,
    screen,
    ipcMain,
    dialog
} from 'electron';
import { join } from 'path';
import {
    appConfig,
    initAppConfig,
    IAppConfig,
} from '../common/AppConfig';
import path from 'path';
import fs from 'fs';

import {IGlobal} from '../common/IGlobal';

process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';



// configファイル読み込み
initAppConfig();
// globalに値をセットするため型をanyに強制する
declare const global: IGlobal;
// レンダープロセスとなるブラウザ・ウィンドウのオブジェクト。
// オブジェクトが破棄されると、プロセスも終了するので、グローバルオブジェクトとする。
let win: BrowserWindow | undefined;
let trayIcon: Tray;
/*
// IPC通信でGlobalを渡す
ipcMain.handle('global', (e) => {
    console.log(global);
    return global;
})
ipcMain.on('global', (e) => {
    console.log(global);
    e.returnValue = global;
})
*/
ipcMain.handle('notify', (e) => {
    //const notify = new Notification();
    //e.returnValue = notify;
})
ipcMain.handle('getAppPath', () => {
    return app.getAppPath();
})
ipcMain.handle('getTrayIcon', () => {
    return trayIcon;
})
// rendererプロセスからアクセスできるようにglobalに設定
global.appConfig = appConfig;
// トレイアイコン
global.trayIconImagePath1 = join(app.getAppPath(), 'img', 'talk.png');
global.trayIconImagePath2 = join(app.getAppPath(), 'img', 'talk2.png');

ipcMain.handle('getTrayIconPath1', () => {
    return join(app.getAppPath(), 'img', 'talk.png');
})
ipcMain.handle('getTrayIconPath2', () => {
    return join(app.getAppPath(), 'img', 'talk2.png');
})

ipcMain.handle('getCurrentWindow', () => {
    return win;
})
ipcMain.handle('getReloadIntervalSecond', () => {
    return appConfig.reloadIntervalSecond ;
})
ipcMain.handle('getLcchatCuiCommand', () => {
    return appConfig.lcchatCuiCommand;
})
ipcMain.handle('getDBFilePath', () => {
    return appConfig.dbFilePath;
})
ipcMain.handle('saveFile', (e, d) => {
    
  const defaultFileName:string = d.defaultFileName
  const attachmentFilePath = d.attachmentFilePath
  const ext = path.extname(defaultFileName)
  if(win === undefined){
      return
  }
  const dialogOptions = {
      title: '保存先パス選択',
      defaultPath: defaultFileName,
      filters: [
      { name: 'Source File Extention', extensions: [ext.slice(1)/*ドットは除く*/] },
      { name: 'All Files', extensions: ['*'] },
      ],
  };
  dialog.showSaveDialog(win, dialogOptions).then(
    (value) => {
      if (value.filePath) {
        // キャンセルをしなかった場合
        fs.copyFileSync(attachmentFilePath, value.filePath);
      }
    },
  );
})
ipcMain.handle('getWindowSize', () => {
  if(win === undefined) {
      return undefined
  }
  return win.getSize()
})
ipcMain.handle('setWindowSize', (e, d) => {
  const windowHeight = d.windowHeight
  if (win !== undefined) {
    win.on('resize', windowHeight);
  }
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

