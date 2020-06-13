import {
    app,
    BrowserWindow,
    Menu,
    Tray,
    nativeImage,
    globalShortcut,
} from 'electron';
import { appConfig } from './AppConfig';

// レンダープロセスとなるブラウザ・ウィンドウのオブジェクト。
// オブジェクトが破棄されると、プロセスも終了するので、グローバルオブジェクトとする。
var win: BrowserWindow | undefined;

function createWindow() {
    // ブラウザウィンドウの作成
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        },
    })
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
    })
    // 閉じるボタンでタスクトレイに入れる
    win.on('close', (event) => {
        event.
        alert('tojiru');
        if (win) {
            win.hide();
        }
    });
    addTaskTray();
    setHotKey()
}

// このメソッドは、Electronが初期化を終了し、
// ブラウザウィンドウを作成する準備ができたら呼び出される。
// 一部のAPIは、このイベントが発生した後にのみ使用できる。
app.on('ready', createWindow)

// 全てのウィンドウオブジェクトが閉じたときのイベントハンドラ
app.on('window-all-closed', () => {
    // macOSでは、アプリケーションとそのメニューバーがCmd + Qで
    // 明示的に終了するまでアクティブになるのが一般的なため、
    // メインプロセスは終了させない
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', () => {
    // MacOSでは、ドックアイコンがクリックされ、
    // 他のウィンドウが開いていないときに、アプリケーションでウィンドウを
    // 再作成するのが一般的です。
    if (win === undefined) {
        createWindow()
    }
});



// ここから拡張
// const HOTKEY = "";
const HOTKEY = appConfig.hotkeys.toggleVisible;

function addTaskTray() {
    // タスクトレイに格納

    var trayIcon = new Tray(nativeImage.createFromPath(__dirname + "/img/test.ico"));

    // タスクトレイに右クリックメニューを追加
    var contextMenu = Menu.buildFromTemplate([
        {
            label: "表示",
            click: function () {
                if (win !== undefined) {
                    win.show(); win.focus();
                }
            },
        },
        {
            label: "終了",
            click: function () {
                if (win !== undefined) {
                    win.close();
                }
            },
        },
    ]);
    trayIcon.setContextMenu(contextMenu);

    // タスクトレイのツールチップをアプリ名に
    trayIcon.setToolTip(app.name);

    // タスクトレイが左クリックされた場合、アプリのウィンドウをアクティブに
    trayIcon.on("click", function () {
        if (win !== undefined) {
            win.show();
            win.focus();
        }
    });
    // タスクトレイに格納 ここまで
}
function setHotKey() {
    globalShortcut.register(HOTKEY, function () {
        if (win !== undefined) {
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
    })
}