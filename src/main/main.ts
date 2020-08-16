import {
    app,
    BrowserWindow,
    globalShortcut,
    Menu,
    nativeImage,
    Tray,
    screen,
} from 'electron';
import { join } from 'path';
import {
    appConfig,
    initAppConfig,
    IAppConfig,
} from '../common/AppConfig';

interface IGlobal {
    appConfig: IAppConfig;
}


// configファイル読み込み
initAppConfig();
// rendererプロセスからアクセスできるようにglobalに設定
global.appConfig = appConfig;
// globalに値をセットするため型をanyに強制する
declare const global: IGlobal;


// レンダープロセスとなるブラウザ・ウィンドウのオブジェクト。
// オブジェクトが破棄されると、プロセスも終了するので、グローバルオブジェクトとする。
let win: BrowserWindow | undefined;

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
        addTaskTray();
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

// ここから拡張
// const HOTKEY = "";
// console.log(JSON.stringify(appConfig));
const HOTKEY = appConfig.hotkeys.toggleVisible;

// GC回避のためグローバル
let trayIcon: Tray | undefined = undefined;
function addTaskTray() {
    // タスクトレイに格納

    trayIcon = new Tray(nativeImage.createFromPath(join(process.cwd(), 'img', 'talk.png')));

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
    trayIcon.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    trayIcon.setToolTip(app.name);

    // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
    trayIcon.on('click', () => {
        if (win) {
            win.show();
            win.focus();
        }
    });
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

