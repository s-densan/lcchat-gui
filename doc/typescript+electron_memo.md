# TypeScriptでElectron

<!-- @import "[TOC]" {cmd="toc" depthFrom=2 depthTo=3 orderedList=true} -->

<!-- code_chunk_output -->

1. [Link](#link)
    1. [GitHub](#github)
2. [todo](#todo)
3. [記録](#記録)
    1. [20210508](#20210508)
    2. [20210507](#20210507)
    3. [20210506](#20210506)
    4. [20201104](#20201104)
    5. [20201031](#20201031)
    6. [20200828](#20200828)
    7. [20200822](#20200822)
    8. [20200820 通知アイコン変化](#20200820-通知アイコン変化)
    9. [20200817 Action実行後に次のAction実行](#20200817-action実行後に次のaction実行)
    10. [20200814 ファイル保存ダイアログ](#20200814-ファイル保存ダイアログ)
    11. [20200805](#20200805)
    12. [20200803](#20200803)
    13. [20200802](#20200802)
    14. [20200716](#20200716)
    15. [20200717](#20200717)
    16. [20200712](#20200712)
    17. [20200711](#20200711)
    18. [20200708](#20200708)
    19. [20200706](#20200706)
    20. [20200705](#20200705)
    21. [20200702](#20200702)
    22. [20200630](#20200630)
    23. [20200628](#20200628)
    24. [20200623 通知とか](#20200623-通知とか)
    25. [20200621 通知](#20200621-通知)
    26. [20200618 タリーズ滑川](#20200618-タリーズ滑川)
    27. [20200617 exe化](#20200617-exe化)
    28. [20200613 滑川図書館にて](#20200613-滑川図書館にて)
    29. [20200531](#20200531)
    30. [20200519](#20200519)
    31. [20200528 memo](#20200528-memo)
    32. [20200527](#20200527)
    33. [20200523](#20200523)
    34. [20200521](#20200521)
    35. [20200520](#20200520)
    36. [20200519](#20200519-1)
    37. [20200518 初回ログイン](#20200518-初回ログイン)
    38. [20200516 初回ログイン](#20200516-初回ログイン)
    39. [20200514](#20200514)
    40. [20200513](#20200513)
    41. [20200510](#20200510)
    42. [20200510](#20200510-1)
    43. [20200509 Electronのパッケージ化](#20200509-electronのパッケージ化)
    44. [20200506](#20200506)
    45. [20200505 DBアクセス](#20200505-dbアクセス)
    46. [20200426 SQL](#20200426-sql)
    47. [20200424 コマンド実行](#20200424-コマンド実行)
    48. [20200422 SQLite2](#20200422-sqlite2)
    49. [20200421 SQLite](#20200421-sqlite)
    50. [20200408](#20200408)
    51. [20200407](#20200407)
    52. [20200406](#20200406)
    53. [20200403](#20200403)
    54. [20200401](#20200401)
    55. [20200330](#20200330)
    56. [20200108](#20200108)
    57. [20191202](#20191202)
    58. [20191202](#20191202-1)
    59. [20191201-2](#20191201-2)
    60. [20191201](#20191201)
    61. [20191130](#20191130)
    62. [20191129](#20191129)
    63. [20191127 4日目～7日目](#20191127-4日目~7日目)
    64. [20191125 3日目](#20191125-3日目)
    65. [20191105](#20191105)

<!-- /code_chunk_output -->

## Link
### GitHub
https://github.com/s-densan/lcchat-gui
## todo
Trelloで管理
https://trello.com/b/Dmnn4KKp
## 記録

### 20210624
チャットメッセージ読み込みを直している途中。
うーーーん。
前回やったことを忘れてて辛い。
### 20210622
前回に引き続き。

- useDispatchでredux-thunkを使ったらthenができない件の解決法 (Typescript)
https://qiita.com/hiroya8649/items/73d80a52636a787fefa5
- typescriptでuseDispatchでRedux Thunkのthenが型エラーになる時の対応
https://tech.frenps.co.jp/archives/742

この2つを参照。
予め
```typescript
  type MyDispatch = ThunkDispatch<RootState, any, Action>;
  const dispatch = useDispatch<MyDispatch>();
```
としておくことで
```typescript
  useEffect(() => {
    // 初回のみ実行
    if (initial === false) {
      // store.dispatch(createScrollToBottomAction(bottomRef));
      console.log('loadUser')
      // dispatch(userActions.loadUserFromComputerName({computerName: os.hostname()}));
      const f = fetchUserById({computerName: os.hostname()})
      console.log(f)
      dispatch(f).then(()=>{
        console.log('dispatched')
        setInitial(true);
        // dispatch(windowActions.initWindowState({bottomRef}));
        // Windowリサイズイベント
        ///* 一時コメントアウト mainprocess に持っていく
        dispatch(windowActions.moveToBottom());
      })
    }
```
というのが可能になる。
### 20210616
#### reduxにて「Use custom middleware for async actions.」のエラー

https://teratail.com/questions/151413
```
export const fetchUsers = async(dispatch) => {
↓
export const fetchUsers = () => async(dispatch) => {

//dispatchを引数として渡していたためおこったバグでした
```
対応したけどなおんねーぞ！！！もうわからーんん。

#### redux-thunk入門、簡単まとめ
https://qiita.com/hiroya8649/items/c202742c99d2cc6159b8
そもそもthunkってなんやねん、という説明。

#### Redux Toolkit で Async Thunk が曲者なので詳しく解説する
https://times.hrbrain.co.jp/entry/2020/12/08/redux-toolkit-async-thunk

#### Redux-Thunkで非同期処理ができる仕組みを理解しよう
https://qiita.com/jima-r20/items/7fee2f00dbd1f302e373
![](img/2021-06-16-20-37-14.png)
これかなあ。重要と書いてあるし。
→→→→きききききたーーーー！！！
おいおい、前提としてthunk対応してなかったんかいなーーー。

次
#### useDispatchでredux-thunkを使ったらthenができない件の解決法 (Typescript)

https://qiita.com/hiroya8649/items/73d80a52636a787fefa5

ユーザ読み込むまで待ちたいんだよ。

### 20210615
元の機能が動くようになってほしい。
- DBの読み込み失敗（毎回ユーザを求められる、メッセージが読み込まれない）
- 編集ボタンでエラー


DB読み込み失敗する件、非同期処理をなんとかしなければ。
ここがわかりやすい。公式のサンプルはTypescriptでは相性が悪いっぽい。
https://future-architect.github.io/articles/20200501/

> 非同期なコードはReduxからも独立したコードとして書けるので（上記の2つめの関数の中にはRedux関係の呼び出しが発生していない）、こちらの方が他の環境に持っていくとか、テストするのはしやすいかなと思います。
> 
> JS側のサンプルだと、extraReducersに次のように追加するコードがありますが、これだとコード補完がされないので、TypeScriptの場合はちょっとかっこ悪くてもbuilder経由で登録する必要があります。
> 
> ```javascript
> extraReducers: {
>   [fetchLastCounter.fulfilled]: (state, action) => {
>      return {
>        ...state,
>        count: action.payload.count,
>      };
>   });
> }
> ```

### 20210601
#### Sliceでメインプロセスと通信するときにasyncを解決する
createAsyncThunkというのを使えばいいっぽい？？？
https://redux-toolkit.js.org/api/createAsyncThunk
理解不能！！
#### Electron の プロセス間通信 まとめ
https://garafu.blogspot.com/2020/07/interprocess-communication-electron.html
メインプロセス起点
非同期通信（send）
### 20210527
これでうまくいきそうなのだけどよくわからない。
https://kaleido01.com/js-to-react-part2/
### 20210525
色々消して、とりあえずエラーでず画面が表示されるようになった。次は機能を戻していくか。
### 20210520
> Uncaught Error: Objects are not valid as a React child (found: [object Promise]). If you meant to render a collection of children, use an array instead.
>     at throwOnInvalidObjectType (react-dom.development.js:13231)
>     at createChild (react-dom.development.js:13469)
>     at reconcileChildrenArray (react-dom.development.js:13719)
>     at reconcileChildFibers (react-dom.development.js:14125)
>     at reconcileChildren (react-dom.development.js:16990)
>     at updateHostComponent (react-dom.development.js:17632)
>     at beginWork (react-dom.development.js:19080)
>     at HTMLUnknownElement.callCallback (react-dom.development.js:3945)
>     at Object.invokeGuardedCallbackDev (react-dom.development.js:3994)
>     at invokeGuardedCallback (react-dom.development.js:4056)

#### Objects are not valid as a React child (found: [object Promise])
https://stackoverflow.com/questions/47658765/objects-are-not-valid-as-a-react-child-found-object-promise

```javascript
componentDidMount() {
  this.renderPosts();
}
```


なるほど、いかが悪そう。
```javascript
  // タイマークロック用エリア
  const clockArea = async () => {
    if (message.editingMessage === undefined) {
      const reloadIntervalSecond = await ipcRenderer.invoke('getReloadIntervalSecond')
      console.log('getReloadIntervalSecond:' + reloadIntervalSecond )
      // 編集中モードでない場合
      return <Clock interval={reloadIntervalSecond * 1000} onTimer={onTimer}></Clock>;
    } else {
      return <div></div>;
    }
  };
```

### 20210518

これか？オイラに足りない、非同期処理を同期処理にする方法は！？
→違ってました
#### MainProcessからRendererProcessにパラメータを渡す（Electron）
http://once-and-only.com/programing/electron/mainprocess%E3%81%8B%E3%82%89rendererprocess%E3%81%AB%E3%83%91%E3%83%A9%E3%83%A1%E3%83%BC%E3%82%BF%E3%82%92%E6%B8%A1%E3%81%99%EF%BC%88electron%EF%BC%89/#toc2
```javascript
async ()=>{
    const whatIWant = await ipcRenderer.invoke('somethingYouWantToPass');
    // do something
}
```
### 20210508
プロセス間通信がうまくいきません。
```
yarn run v1.22.5
$ electron ./

<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function (anonymous)],
  setTimeout: [Function (anonymous)] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function (anonymous)] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  },
  appConfig: [Object: null prototype] {
    dbAccessSynchronous: false,
    dbFilePath: '${appPath}/db/chatroom.db',
    lcchatCuiCommand: '"${appPath}/../lcchat/lcchat.exe"',
    reloadIntervalSecond: 10,
    useTasktray: true,
    isDebug: true,
    hotkeys: [Object: null prototype] {
      toggleVisible: 'CommandOrControl+Shift+Z'
    }
  },
  trayIconImagePath1: 'D:\\IdeaProjects\\lcchat-gui\\img\\talk.png',
  trayIconImagePath2: 'D:\\IdeaProjects\\lcchat-gui\\img\\talk2.png'
}
Error occurred in handler for 'global': Error: An object could not be cloned.
    at Object.on.e._reply (electron/js2c/browser_init.js:161:9791)
    at electron/js2c/browser_init.js:201:556
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function (anonymous)],
  setTimeout: [Function (anonymous)] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function (anonymous)] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  },
  appConfig: [Object: null prototype] {
    dbAccessSynchronous: false,
    dbFilePath: '${appPath}/db/chatroom.db',
    lcchatCuiCommand: '"${appPath}/../lcchat/lcchat.exe"',
    reloadIntervalSecond: 10,
    useTasktray: true,
    isDebug: true,
    hotkeys: [Object: null prototype] {
      toggleVisible: 'CommandOrControl+Shift+Z'
    }
  },
  trayIconImagePath1: 'D:\\IdeaProjects\\lcchat-gui\\img\\talk.png',
  trayIconImagePath2: 'D:\\IdeaProjects\\lcchat-gui\\img\\talk2.png'
}
Error occurred in handler for 'global': Error: An object could not be cloned.
    at Object.on.e._reply (electron/js2c/browser_init.js:161:9791)
    at electron/js2c/browser_init.js:201:556
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
Error occurred in handler for 'getCurrentWindow': Error: An object could not be cloned.
    at Object.on.e._reply (electron/js2c/browser_init.js:161:9791)
    at electron/js2c/browser_init.js:201:556
<ref *1> Object [global] {
  global: [Circular *1],
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function (anonymous)],
  setTimeout: [Function (anonymous)] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  },
  queueMicrotask: [Function: queueMicrotask],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function (anonymous)] {
    [Symbol(nodejs.util.promisify.custom)]: [Function (anonymous)]
  },
  appConfig: [Object: null prototype] {
    dbAccessSynchronous: false,
    dbFilePath: '${appPath}/db/chatroom.db',
    lcchatCuiCommand: '"${appPath}/../lcchat/lcchat.exe"',
    reloadIntervalSecond: 10,
    useTasktray: true,
    isDebug: true,
    hotkeys: [Object: null prototype] {
      toggleVisible: 'CommandOrControl+Shift+Z'
    }
  },
  trayIconImagePath1: 'D:\\IdeaProjects\\lcchat-gui\\img\\talk.png',
  trayIconImagePath2: 'D:\\IdeaProjects\\lcchat-gui\\img\\talk2.png'
}
Error occurred in handler for 'global': Error: An object could not be cloned.
    at Object.on.e._reply (electron/js2c/browser_init.js:161:9791)
    at electron/js2c/browser_init.js:201:556
    at processTicksAndRejections (internal/process/task_queues.js:93:5)
Error occurred in handler for 'getCurrentWindow': Error: An object could not be cloned.
    at Object.on.e._reply (electron/js2c/browser_init.js:161:9791)
    at electron/js2c/browser_init.js:201:556
```
### 20210507
前回のエラーについて、``TypeError: Cannot read property 'tap' of undefined``で検索。
https://qiita.com/faronan/items/a017d53a8405a44544f2
```
解決方法
https://github.com/vercel/next.js/discussions/19081
同様のエラーについて、こちらのIssueで案内されています。
Issueに従って、package.jsonに"webpack": "^4.44.1"を追加し、webpackのバージョンを固定することで解決しました。
Nest.jsの依存関係を確認したところ、webpackのバージョンは5.9.0が用いられているようです。
create-next-appでプロジェクトを作成する場合は、webpackのバージョンが変わることが少ないので、初めての気づきでした。
```
webpackのバージョンを落とせってさ。悔しい。

もう一回Buildしたがエラー。
```
yarn run v1.16.0
warning ..\..\..\package.json: No license field
$ webpack
[hardsource:e55a3bc6] Writing new cache e55a3bc6...
[hardsource:21121863] Writing new cache 21121863...
[hardsource:e55a3bc6] Tracking node dependencies with: yarn.lock.
[hardsource:21121863] Tracking node dependencies with: yarn.lock.
Hash: 9f98692c0db49b5b093d274e7bf324811af95f7f
Version: webpack 4.46.0
Child
    Hash: 9f98692c0db49b5b093d
    Time: 15872ms
    Built at: 2021/05/07 18:46:21
          Asset      Size  Chunks                   Chunk Names
        main.js  4.14 KiB    main  [emitted]        main
    main.js.map  3.53 KiB    main  [emitted] [dev]  main
    Entrypoint main = main.js main.js.map
    [./src/main/main.ts] 381 bytes {main} [built] [failed] [1 error]

    ERROR in ./src/main/main.ts
    Module build failed (from ./node_modules/ts-loader/index.js):
    TypeError: loaderContext.getOptions is not a function
        at getLoaderOptions (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\ts-loader\dist\index.js:90:41)
        at Object.loader (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\ts-loader\dist\index.js:14:21)
Child
    Hash: 274e7bf324811af95f7f
    Time: 15867ms
    Built at: 2021/05/07 18:46:21
           Asset      Size  Chunks                   Chunk Names
        index.js  4.17 KiB    main  [emitted]        main
    index.js.map  3.53 KiB    main  [emitted] [dev]  main
    Entrypoint main = index.js index.js.map
    [./src/renderer/index.tsx] 381 bytes {main} [built] [failed] [1 error]

    ERROR in ./src/renderer/index.tsx
    Module build failed (from ./node_modules/ts-loader/index.js):
    TypeError: loaderContext.getOptions is not a function
        at getLoaderOptions (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\ts-loader\dist\index.js:90:41)
        at Object.loader (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\ts-loader\dist\index.js:14:21)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
ポイントは``TypeError: loaderContext.getOptions is not a function``かな。
https://frontedcode.com/posts/backend/laravel/1
```
React+laravel+Typescript の環境を構築するために初めに、TS の型に関する依存関係をインストールされたと思います。
その中に、TS トランスパイラの一つとして ts-loader というものがありましたね。今回のエラーの原因はそれです。
問題は、この ts-loader というパッケージのバージョンが新しすぎた 事が原因です。
何か一つでもパッケージが、その Laravel のバージョンで認識できるパッケージより新しい場合、Laravel はエラーを吐かざる負えません。
今回は私は、Laravel6（最新は 8）の環境で行っているためそのようなバグがおこりやすくなったと言えるでしょう。
では、どのようにしてこのエラーを解消させるのでしょうか。
解決策
一度アンインストールして少し古いパッケージにすれば良いだけですね。
npm uninstall ts-loader
npm install ts-loader@8.2.0 --save
```
次は``ts-loader``のバージョンを落とせってさ。えー
落としたしたさ。

再Build
ようやく中身のエラーになってきた。
```
    ERROR in C:\Users\shimp\OneDrive\Documents\lcchat-gui\src\renderer\slices\MessageSlice.ts
    ./src/renderer/slices/MessageSlice.ts 450:56-60
    [tsl] ERROR in C:\Users\shimp\OneDrive\Documents\lcchat-gui\src\renderer\slices\MessageSlice.ts(450,57)
          TS2769: No overload matches this call.
      The last overload gave the following error.
        Argument of type 'Buffer[]' is not assignable to parameter of type 'WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 
"string"): string; }'.
          Type 'Buffer[]' is not assignable to type 'string'.

    ERROR in C:\Users\shimp\OneDrive\Documents\lcchat-gui\src\renderer\slices\MessageSlice.ts
    ./src/renderer/slices/MessageSlice.ts 453:54-58
    [tsl] ERROR in C:\Users\shimp\OneDrive\Documents\lcchat-gui\src\renderer\slices\MessageSlice.ts(453,55)
          TS2769: No overload matches this call.
      The last overload gave the following error.
        Argument of type 'Buffer[]' is not assignable to parameter of type 'WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 
"string"): string; }'.
          Type 'Buffer[]' is not assignable to type 'string'.

    ERROR in C:\Users\shimp\OneDrive\Documents\lcchat-gui\src\renderer\slices\MessageSlice.ts
    ./src/renderer/slices/MessageSlice.ts 462:50-54
    [tsl] ERROR in C:\Users\shimp\OneDrive\Documents\lcchat-gui\src\renderer\slices\MessageSlice.ts(462,51)
          TS2769: No overload matches this call.
      The last overload gave the following error.
        Argument of type 'Buffer[]' is not assignable to parameter of type 'WithImplicitCoercion<string> | { [Symbol.toPrimitive](hint: 
"string"): string; }'.
          Type 'Buffer[]' is not assignable to type 'string'.
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
``Buffer[]``と``ArrayBuffer``が区別されるようになった？ようわからん。
``Buffer[]``->``ArrayBuffer``に変更してみてBuild。とりあえず通りました。
``yarn start``
画面表示されず。コンソールにメッセージ。
```
Uncaught ReferenceError: require is not defined
    at Object.electron (external "electron":1)
    at __webpack_require__ (bootstrap:19)
    at Object../src/renderer/slices/MessageSlice.ts (MessageSlice.ts:9)
    at __webpack_require__ (bootstrap:19)
    at Object../src/renderer/slices/RootStore.ts (RootStore.ts:6)
    at __webpack_require__ (bootstrap:19)
    at Object../src/renderer/index.tsx (index.tsx:9)
    at __webpack_require__ (bootstrap:19)
    at bootstrap:83
    at bootstrap:83
```
![](img/2021-05-07-19-02-04.png)

``Uncaught ReferenceError: require is not defined electron``で検索。

https://stackoverflow.com/questions/44391448/electron-require-is-not-defined
```
As of version 5, the default for nodeIntegration changed from true to false. You can enable it when creating the Browser Window:

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });
});
```
``main.ts``の``BrowserWindow``の初期化時に``contextIsolation: false``をつけたら何故か動いた。なぞー。
```typescript
    win = new BrowserWindow({
        height: appHeight,
        width: appWidth,
        x: desktopSize.width - appWidth,
        y: desktopSize.height - appHeight,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        title: 'Communication App'
    });
```
```typescript
    win = new BrowserWindow({
        height: appHeight,
        width: appWidth,
        x: desktopSize.width - appWidth,
        y: desktopSize.height - appHeight,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        },
        title: 'Communication App'
    });
```

画面はとりあえず表示できたが、Warningを解決しておこうか。
![](img/2021-05-07-19-14-51.png)

```
electron/js2c/renderer_init.js:13 (electron) The remote module is deprecated. Use https://github.com/electron/remote instead.
log @ electron/js2c/renderer_init.js:13
```
https://simple-minds-think-alike.hatenablog.com/entry/disable-electron-remote-module
```
remote moduleを無くすためのアプリケーション側の対応
現状 remote モジュールを使って、レンダラプロセスからあたかもローカルオブジェクトのようにメインプロセス内のオブジェクトを使っている場合、今後どうしたら良いのか。 対応としては2つあるようです。

①明示的にIPC通信で処理するように置き換える
remote moduleを使ってメインプロセス内のオブジェクトを参照し、暗黙的にIPC通信が行われることによって様々な問題が発生するので、明示的なIPC通信に置き換えていくことを推奨しているようです。

f:id:moritamorie:20200830103205p:plain

② 移管されるelectron-userland/remoteを使う
build-inで提供されている remote moduleは将来的に削除され、electron-userland/remoteに移管されるのでそれを使い続けるというのもできるようです。
```
remoteは使っちゃだめだって。
ipc通信の解説
https://camisole-h.hatenablog.jp/entry/2019/12/19/004701

```
Electron Security Warning (Insecure Content-Security-Policy) This renderer process has either no Content Security
    Policy set or a policy with "unsafe-eval" enabled. This exposes users of
    this app to unnecessary security risks.

For more information and help, consult
https://electronjs.org/docs/tutorial/security.
This warning will not show up
once the app is packaged.
(anonymous) @ electron/js2c/renderer_init.js:113
```
https://qiita.com/kuraiL22/items/80e8e77d62cbe39d0b34
```
electron上で、http経由のコンテンツを読み込んだ時に発生。
デバック中は、local上でReactを動かしているので発生する。
パッケージ化すれば発生しないエラー。
process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1';
を、 electron.js にて追記すれば表示されなくなる。
```
とのこと。消しとこ。


### 20210506

開発続けたくて再始動。
えーどうすればいいんだっけ？

- ``yarn start``でアプリ実行
- ``yarn upgrade``でライブラリ更新

できればライブラリ周りを最新化したい。
upgrade後の話で
- electron 最新12 現在 10
- react 最新17 現在17(OK)
- typescript 最新4.2 現在4.0


https://blog.katsubemakito.net/nodejs/update-require-module
![](img/2021-05-06-21-15-52.png)
```
ncu -u
```
```
 @ltd/j-toml               ^0.5.107  →   ^1.12.2
 @material-ui/core           ^4.8.0  →   ^4.11.4
 @material-ui/icons          ^4.9.1  →   ^4.11.2
 @reduxjs/toolkit            ^1.3.6  →    ^1.5.1
 @types/fs-extra             ^9.0.1  →   ^9.0.11
 @types/jest                ^26.0.8  →  ^26.0.23
 @types/material-ui         ^0.21.7  →   ^0.21.8
 @types/react-datepicker      3.1.1  →     3.1.8
 @types/styled-components    ^5.1.2  →    ^5.1.9
 css-loader                  ^5.0.0  →    ^5.2.4
 electron-packager          ^15.1.0  →   ^15.2.0
 fs-extra                    ^9.0.1  →   ^10.0.0
 graceful-fs                 ^4.2.3  →    ^4.2.6
 jest                       ^26.2.2  →   ^26.6.3
 moment                     ^2.24.0  →   ^2.29.1
 react                      ^17.0.1  →   ^17.0.2
 react-datepicker             3.3.0  →     3.8.0
 react-dom                  ^17.0.1  →   ^17.0.2
 react-dropzone             ^11.0.2  →   ^11.3.2
 react-redux                 ^7.1.3  →    ^7.2.4
 redux                       ^4.0.4  →    ^4.1.0
 styled-components           ^5.1.1  →    ^5.3.0
 ts-jest                    ^26.3.0  →   ^26.5.6
 uuid                        ^8.3.0  →    ^8.3.2
 @types/react-dom           ^16.9.4  →   ^17.0.3
 @types/react-redux          ^7.1.5  →   ^7.1.16
 electron                   ^10.1.0  →   ^12.0.6
 ts-loader                   ^8.0.3  →    ^9.1.2
 typescript                  ^4.0.2  →    ^4.2.4
 webpack                    ^4.41.2  →   ^5.36.2
 webpack-cli                 ^4.1.0  →    ^4.6.0
```
むっちゃ上がるぜ。

インストールはこれでいいっぽい。
```
yarn install
```
で、yarn buildが動かないんだけど。
```
$ webpack
[webpack-cli] TypeError: Cannot read property 'tap' of undefined
    at Object.exports.tap (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\hard-source-webpack-plugin\lib\util\plugin-compat.js:118:25)
    at new CacheSerializerFactory (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\hard-source-webpack-plugin\lib\CacheSerializerFactory.js:94:18)
36)
    at createCompiler (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:74:12)
    at C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:44:48
    at Array.map (<anonymous>)
    at createMultiCompiler (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:44:33)
    at create (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:118:16)
    at webpack (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:131:47)
    at WebpackCLI.f [as webpack] (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\index.js:54:15)
error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```
### 20201104
Webpack以外を更新。
webpack.config.jsのloadersやらuseやらが怪しいんだけどなあ。
![](https://pbs.twimg.com/media/Eh2lzFRVgAEyry3?format=jpg&name=medium)
https://blog.hiroppy.me/entry/webpack5
それに対して以下のような設定をしていた。
```
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
        }],
```
で、直してみたんだけど
```
[webpack-cli] TypeError: Cannot read property 'tap' of undefined
    at Object.exports.tap (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\hard-source-webpack-plugin\lib\util\plugin-compat.js:118:25)
    at new CacheSerializerFactory (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\hard-source-webpack-plugin\lib\CacheSerializerFactory.js:94:18)
    at HardSourceWebpackPlugin.apply (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\hard-source-webpack-plugin\index.js:219:36)
    at createCompiler (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:71:12)
    at C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:41:48    at Array.map (<anonymous>)
    at createMultiCompiler (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:41:33)
    at create (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:110:15)
    at webpack (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\webpack.js:139:31)
    at f (C:\Users\shimp\OneDrive\Documents\lcchat-gui\node_modules\webpack\lib\index.js:35:15)
error Command failed with exit code 2.
```
うーんだめ。
### 20201031
``yarn update --latest``実行してやったらビルド時にエラー。
```
[webpack-cli] Invalid configuration object. Webpack has been initialized using a configuration object that does not match the API schema.
 - configuration[0].module.rules[2] has an unknown property 'loaders'. These properties are valid:
   object { compiler?, dependency?, descriptionData?, enforce?, exclude?, generator?, include?, issuer?, loader?, mimetype?, oneOf?, options?, parser?, realResource?, resolve?, resource?, resourceFragment?, resourceQuery?, rules?, sideEffects?, test?, type?, use? }
   -> A rule description with conditions and effects for modules.
 - configuration[1].module.rules[2] has an unknown property 'loaders'. These properties are valid:
   object { compiler?, dependency?, descriptionData?, enforce?, exclude?, generator?, include?, issuer?, loader?, mimetype?, oneOf?, options?, parser?, realResource?, resolve?, resource?, resourceFragment?, resourceQuery?, rules?, sideEffects?, test?, type?, use? }
   -> A rule description with conditions and effects for modules.
error Command failed with exit code 2.
```
しゃーない、バージョン戻し。
多分webpack5のせいな気がするんだけど。
### 20200828
Electronアプでしたら破壊的変更でremoteが設定なしに使えなくなってた。
https://www.electronjs.org/docs/breaking-changes
### 20200822
``yarn upgrade --latest``でパッケージを最新化。気持ちがいいね。バグの原因になりそうだけど。
![](img/2020-08-22-21-03-51.webp)
### 20200820 通知アイコン変化
新着があると通知アイコンを赤くする。

### 20200817 Action実行後に次のAction実行
https://teratail.com/questions/130390
https://qiita.com/muiyama/items/63386fd65c7e9f06f5d4
https://github.com/redux-saga/redux-saga/blob/master/README_ja.md
### 20200814 ファイル保存ダイアログ
https://www.google.com/search?q=electron+%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E4%BF%9D%E5%AD%98%E3%83%80%E3%82%A4%E3%82%A2%E3%83%AD%E3%82%B0&oq=electron+%E3%83%95%E3%82%A1%E3%82%A4%E3%83%AB%E4%BF%9D%E5%AD%98%E3%83%80%E3%82%A4%E3%82%A2%E3%83%AD%E3%82%B0&aqs=chrome..69i57j69i61.14495j0j4&sourceid=chrome&ie=UTF-8
公式 : https://www.electronjs.org/docs/api/dialog
### 20200805
Reactでドラッグアンドドロップに対応する。

- [React]ドラッグ&ドロップのファイルアップロードを簡単実装！「react-dropzone」の紹介
https://www.aizulab.com/blog/react-dropzone/


Electronでローカルファイル画像を表示する

- ローカルファイルシステムからのElectron JS画像
https://www.it-swarm.dev/ja/electron/%e3%83%ad%e3%83%bc%e3%82%ab%e3%83%ab%e3%83%95%e3%82%a1%e3%82%a4%e3%83%ab%e3%82%b7%e3%82%b9%e3%83%86%e3%83%a0%e3%81%8b%e3%82%89%e3%81%aeelectron-js%e7%94%bb%e5%83%8f/838519275/
### 20200803
jestについて
https://typescript-jp.gitbook.io/deep-dive/intro-1/jest
### 20200802
nimのユニットテストについて。
https://qiita.com/honeytrap15/items/3bb0dcd63e12983ab975
ついでにnimbleを使って管理してみる。

typescriptのユニットテストについて。
https://qiita.com/karak/items/9d0ebf7bc50085624913
テストツールが複数あるらしく、どうもjestを推している人が多いみたい。
```
yarn add jest ts-jest @types/jest
```

### 20200716
Rustを試したけどうーーーんということで、
nimに手を出してみようかな（だからなぜマイナーなのに手を出す。。。）
#### nim言語でSQLiteを扱ってみる

https://nnahito.com/articles/33
```nim
import db_sqlite
import os,times


proc dbTest(dbFilePath : string, sqlFilePath: string) = 
  var f : File = open(sqlFilePath, FileMode.fmRead)
  defer:
    close(f)
    echo "closed"
  let query = f.readAll()
  let db = open(dbFilePath, "", "", "")
  db.exec(sql(query))
  echo "テーブル作ったヨン"


let sqlPath = "../sql/create_table/create_room.sql"
let sqlDirPath = "../sql/create_table"
# let sqlPath = "create_room.sql"
let dbPath = "aaa.db"

for kind, path in os.walkDir(sqlDirPath):
  if path.splitFile[2] == ".sql":
    echo(path)
    dbTest(dbPath, path)
```
かんたんに作れます。すげー。
### 20200717
nimたん、代数的データ型行けてるじゃないですか。
書きづらいけど。
ちゃんとコンパイル時にチェックしてくれます。
```nim
type
  FooEnum = enum
    Stringer, Numberer
  Foo = object
    case kind: FooEnum
    of Stringer:
      x: string
    of Numberer:
      x1: int
      y: int


let
  a = Foo(kind: Stringer, x: "hi")
  b = Foo(kind: Stringer, x: "hello")
  c = Foo(kind: Numberer, x1:444, y: 333)
proc FooTest(t: Foo) = 
  case t.kind:
  of Stringer:
    echo t.x
    # echo t.y # error
  of Numberer:
    echo t.y
    echo t.x1
    # echo t.x # error
    echo "num"
  echo t
FooTest(a)
FooTest(b)
FooTest(c)
```
### 20200712
Rustで作るという案。
#### 競技プログラミングにおけるPythonとRustの対応関係まとめ - Qiita
https://qiita.com/wotsushi/items/4a6797f52080453a0440
比較が非常にわかりやすい。

### 20200711
Haxe cppだとSQLiteコマンドに日本語(英語以外?)が含まれる場合にエラーとなるようで、困った。
なんだろこの縛り。。。
nekoも一緒に配布していいかな。。。

### 20200708
exeパック時のパス見つからない問題を解決。
app.getAppPathを起点にすればだいたい解決するみたい。頑張って見直した。
これで仮リリースできるかな。
これは些細だけど、ノートPCでHaxe cppのコンパイルできない。なんで？

### 20200706
メインプロセスでConfigファイルを読み込んで、レンダラプロセスで参照したい。

#### ElectronのBrowserWindow間で直接メッセージをやりとりする

https://taku-o.hatenablog.jp/entry/20181013/1539424953
global/getGlobalを使う。

ただし、typescriptだとglobalに型がついていて、追加できない。
declareで無理やりanyにする。
#### taku-o / hello-electron-003-to-sub-msg

https://github.com/taku-o/hello-electron-003-to-sub-msg/blob/master/electron.ts
#### アンビエント宣言(declare)と型定義ファイル(d.ts)

型をあとから強制する
https://www.wakuwakubank.com/posts/501-typescript-declaration/
### 20200705
electronプログラムのアプリディレクトリの取得
https://qiita.com/ikasumi_wt/items/6cda005500f1d3dc6b2d
### 20200702
electron-packagerのignoreオプションが余計なファイルを巻き込みすぎるのを何とかした

https://taku-o.hatenablog.jp/entry/20171204/1512415038

不要ファイルを無視する方法
```sh
electron-packager . MYukkuriVoice --platform=darwin --arch=x64 --electronVersion=1.7.9 --icon=icns/myukkurivoice.icns \
  --overwrite --asar.unpackDir=vendor \
  --ignore="^/\.gitignore" \
  --ignore="^/\.gitmodules" \
  --ignore="^/bin" \
  --ignore="^/docs" \
  --ignore="^/icns" \
  --ignore="^/test" \
  --ignore="^/README.md" \
  --ignore="^/vendor/aqk2k_mac" \
  --ignore="^/vendor/aqtk1-mac" \
  --ignore="^/vendor/aqtk2-mac" \
  --ignore="^/vendor/aqtk10-mac"
```
### 20200630 
GitHubで実行ファイル（ソースコードを含まない）をZIPファイルで配布してみる
https://qiita.com/keita69sawada/items/da6d8f6b6fb8f05ca670

### 20200628 

おかしなところがあるものの、とりあえず完成。
配布方法というか、GitHubでの管理方法を調べる。
まずはbitbucketから引っ越ししよう。
#### ElectronのMenuのカスタマイズ
https://qiita.com/ferretdayo/items/bcbbf8246cdfa8d2ee2a
メニューの作り方
#### HTMLでテキストを下寄せに配置する方法を現役エンジニアが解説【初心者向け】
https://techacademy.jp/magazine/29525
下寄せCSS

- 親要素positionにrelativeを指定する
- 子要素positionにabsolute
- 子要素bottomに0

```tsx
<div style={{ width: '97%', height:'100%', position: 'relative' }} >
    <List dense style={{
        width: '100%',
        verticalAlign: 'left',
        bottom: 0,
        position: 'absolute'
    }} >
        {chatMessageListElems}
    </List>
</div>
```

### 20200623 通知とか
#### tsxのコメント
tsxでコメントを書く場合は{}をつけてtsのコメントを書く。
```tsx
{/*
  ここはコメント
*/}
```
#### Momentで24時間制
``hh``ではなく``HH``
```ts
const postedAt = Moment(props.postedAt).format('YYYY-MM-DD HH:mm');
```
#### 通知クリックでshow,focus
通知オブジェクトのon関数呼び出し
第一引数は``click``
#### 実行パス取得
アイコン画像のパスを指定するのに必要。
``__dirname``を使っていたが、これだとjsファイルの場所になってしまう。
なのでカレントディレクトリを取得するために``process.cwd()``とする。

```
process.argv[1] から、node コマンドに指定された a.js のパス( ~/hoge/Foo.js/a.js )を取得できます

process.cwd() から、node コマンド実行時のワーキングディレクトリパス( ~/hoge/Foo.js )を取得できます

__dirname には、現在実行中のソースコードが格納されているディレクトリパスが格納されています。

~/hoge/Foo.js/a.js 内部で __dirname を取得すると ~/hoge/Foo.js になります
~/hoge/Foo.js/b/b.js 内部で __dirname を取得すると ~/hoge/Foo.js/b になります
~/hoge/Foo.js/c/c.js 内部で __dirname を取得すると ~/hoge/Foo.js/c になります
ソースコード(a.js, b.js, c.js)を結合し、1ファイル化(a.js)した場合は、 __dirname の値が変化します
require("path").resolve("") で cwd を基準とした絶対パスを求める事ができます

```
https://gist.github.com/uupaa/da42698d6b2d2cbb3cca
#### アイコン画像

ここのを拝借。
https://icooon-mono.com/15528-%e4%bc%9a%e8%a9%b1%e3%82%a2%e3%82%a4%e3%82%b3%e3%83%b3/
[![](./img/icooon-mono.com/i/icon_15528/icon_155281_64.webp)](https://icooon-mono.com/i/icon_15528/icon_155281_64.png)
### 20200621 通知
@ドトール豊田文苑堂
通知させようとしたところ以下のエラー。
レンダラーからはremoteでNotificationオブジェクトにアクセスする必要があるっぽい。
``Electron: Notification is not a constructor``

https://stackoverflow.com/questions/51028866/electron-notification-is-not-a-constructor
```
I think you should write

new electron.remote.Notification({....})
instead of

new electron.Notification({....})
```
ノートPCの不調か、アクションセンターが起動しない事もあったけど、
再起動したら通知された。
![](img/2020-06-21-20-34-21.webp)

### 20200618 タリーズ滑川
electron exe化

サイズを小さくする方法
https://tsuwatch.hatenablog.com/entry/2017/05/29/130829
resourceフォルダ以下はこれだけで良いようで。
```
.\RESOURCES\APP
│  index.html
│  package.json
│
├─dist
│      index.js
│      main.js
│
└─img
        test.ico
```
### 20200617 exe化
electron-packagerでexe化を目指す。
その他の依存ファイルをコピーするため、バッチにしよう。
あと、どうもアドミンじゃないと設定の一部が反映されない？
```
$ D:\IdeaProjects\lcchat-gui\node_modules\.bin\electron-packager . lcchat-gui --platform=darwin,win32 --arch=x64
Packaging app for platform win32 x64 using electron v7.3.1
Cannot create symlinks (on Windows hosts, it requires admin privileges); skipping darwin platform
```
### 20200613 滑川図書館にて
Trelloボード作成。 
https://trello.com/b/Dmnn4KKp/lcchat
メインプロセスとレンダラプロセスでデータを共有したい。
https://qiita.com/sprout2000/items/5253a8dee40197359949


```
Cannot read property 'readFileSync' of undefined
```
意味不。メインプロセスがうまいことライブラリの解決？ターゲットの設定？ができていないみたい。
https://www.subarunari.com/entry/electronWebpackConfig
→うまくいった。

タスクトレイ常駐
https://taku-o.hatenablog.jp/entry/2019/02/05/224111
### 20200531 
サボりすぎー
Todo追加
- チャット　ウィンドウ表示位置
- リアクションのカスタマイズ テキストリアクションとか
- ドラッグ・アンド・ドロップで添付する機能をチャットに追加
### 20200519 
### 20200528 memo
これからReactを勉強する人が最初に見るべきスライド７選 | UX MILK
https://uxmilk.jp/43555
### 20200527
メモ。
Electronでホットリロード開発をしたい！

https://qiita.com/ganariya/items/982803466e22dc53eaeb
```
cmd /c yarn add electron-reload
```
で、組み込んでみたけど、これjsを編集しないとリロードされないんか。いまいち使えない。
消しとく。
```
cmd /c yarn remove electron-reload
```
### 20200523
画面のリサイズイベント補足。
electronのイベントを使用。
https://qiita.com/seltzer/items/258d579b50d3a99e5bb7
### 20200521
クロックタイマー実装。
参考：
https://blog.ikappio.com/drawing-with-setinterval-on-react/
### 20200520
ユーザ関係がいい感じになってきた。
次は定期的に新着メッセージを確認する仕組みを作る。
多分一番の山場。

- まずはボタンを押すと新着メッセージのみ追加する仕組み
- その後、更新メッセージの変更
- 同様に削除も
- さらに定期的に自動同期する仕組み。

### 20200519
ログインチェック後、失敗したならばログイン画面を出したい。
アクションの後続としてアクションを実行する方法は？
https://teratail.com/questions/130390
wakaran
### 20200518 初回ログイン
![](img/2020-05-18-23-24-56.webp)
→エラー。
理解不能理解不能理解不能
``userData = ""``にすると通る。再び理解不能理解不能理解不能
### 20200516 初回ログイン
#### react-reduxでページ読み込み時、actionを呼び出す方法

https://qiita.com/gaku3601/items/062a52748acc5e368453
componentDidMountを使う方法
だけど最近はHookを使うほうが良いかと。

https://ja.reactjs.org/docs/hooks-effect.html
でもuseEffect内でdispatchしても反応しない？


https://qiita.com/keiya01/items/fc5c725fed1ec53c24c5
```js
    useEffect(
        () => {
            const time = setInterval(() => {
                dispatch({ type: "ADD_COUNT" });
            }, state.tick);

            return () => clearInterval(time);
        },
        [ state.tick ]
    );
```
こんな感じ

### 20200514 
#### Electronタスクトレイ
- Electronでタスクトレイ常駐のアプリを作る
  https://officeforest.org/wp/2019/05/15/electron%E3%81%A7%E3%82%BF%E3%82%B9%E3%82%AF%E3%83%88%E3%83%AC%E3%82%A4%E5%B8%B8%E9%A7%90%E3%81%AE%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92%E4%BD%9C%E3%82%8B/
- Electronでデスクトップウィジェットを作るまで
  https://qiita.com/SallyAcolyte/items/94ed26ab62b8b32b1b2c

``main.js``に書かなきゃならない？ので注意。
#### Electron ホットキー

globalShortcutを使う。
これも``main.js``に書く。
tsにできないのかしら。

- Electronで、ショートカットキー（globalShortcut）
  https://programmer-jobs.blogspot.com/2016/06/electron-globalshortcut.html

- Electronでデスクトップウィジェットを作るまで
  https://qiita.com/SallyAcolyte/items/94ed26ab62b8b32b1b2c
  画面活性化について

### 20200513 


tsのbuild時に以下のようなメッセージが大量に表示された。
```
[hardsource:815366b5] Could not freeze (webpack)/buildin/module.js: Cannot read property 'hash' of undefined
```
https://teratail.com/questions/235183
ここより、node_modules/.cacheを削除してみると良いとのことで実施。
```
ERROR in ./node_modules/@sgarciac/bombadil/node_modules/moment/moment.js
Module build failed: Error: ENOENT: no such file or directory, open 'D:\IdeaProjects\lcchat-gui\node_modules\@sgarciac\bombadil\node_modules\moment\moment.js'
 @ ./node_modules/@sgarciac/bombadil/lib/tools.js 3:13-30
 @ ./node_modules/@sgarciac/bombadil/lib/parser.js
 @ ./node_modules/@sgarciac/bombadil/lib/tables.js
 @ ./ts/utils/AppConfig.ts
 @ ./ts/reducers/ChatMessageReducer.ts
 @ ./ts/Store.ts
 @ ./ts/index.tsx
```
なんか違うエラーが出た。``yarn upgrade``してみる。

なんだかんだやってたらうまくいった。

#### 状態管理のわかりやすいのがあった。
https://www.jacepark.com/how-to-use-redux-easily-with-redux-toolkit-in-react-native/
### 20200510 
#### Reduxが辛いのでredus toolkitというのを導入してみる。
https://redux-toolkit.js.org/introduction/quick-start
#### Redux Toolkit で Redux の煩わしさから解放される

https://qiita.com/__sakito__/items/e446d0f0974f2e12a5f5

#### HookとRedux ToolkitでReact Reduxに入門する

https://www.hypertextcandy.com/learn-react-redux-with-hooks-and-redux-starter-kit
#### Redux Toolkit で React.js の状態管理をもっと簡単にする方法[TypeScript版]

https://www.webopixel.net/javascript/1601.html
### 20200510 
いっぱい投稿したら出るエラー。
対策したはずなんだけど。
![](img/2020-05-10-17-24-47.webp)

### 20200509 Electronのパッケージ化
exeにする。

- Electronの手習い〜Electron環境からパッケージ化まで〜
https://qiita.com/tagosaku324/items/c720499080d523bbe1d7

```
yarn add electron-packager
yarn run electron-packager . sample --platform=win32 --arch=ia32
```
SQLインターフェイス用のhaxeプログラムについて、リトライ機能をつけた。
### 20200506
#### 一番下までスクロールする
https://dev.classmethod.jp/articles/react-scroll-into-view-on-load/
https://codepen.io/meltedice/pen/QWjLaad?editors=1111
#### 横に並べたり右端にアイコンを固定したり。
https://material-ui.com/components/lists/#interactive
### 20200505 DBアクセス
DBから読み込み、書き込み機能実装。
JSONからの読み込みで戸惑う。
Reduxの複雑さ、同じようなコードをたくさん書かなきゃいけない煩雑さが嫌になってきた。
乗り換えよっかな。

DB情報を読み込むタイミングを検討。
とりあえず10秒毎にでもしときゃいいのかな。

今日参考にしたサイトメモ
#### 忘れやすい、複雑なJSONの要素をfor...in文で取り出す方法

https://www.weed.nagoya/entry/2016/05/11/105145
### 20200426 SQL
HaxeのSQL実行機能と連携して、SQL打てるようにした。
![](img/2020-04-26-22-55-15.webp)
### 20200424 コマンド実行
sqliteは諦めて外部プログラムを呼び出せるよう、コマンド実行方法を調査。
```ts
    child_process.exec('dir', (error, stdout, stderr) => {
        if (error) {
            // エラー時は標準エラー出力を表示して終了
            alert(stderr);
            return;
        } else {
            // 成功時は標準出力を表示して終了
            alert(stdout);
        }
    })
```
### 20200422 SQLite2
【俺メモ】CentOS7にNode.js＋SQLite3環境をインストール

https://qiita.com/nullpointer_t/items/792c35d068d37ed8ce2a

んー？？
いかが必要かも。
https://github.com/mapbox/node-pre-gyp
```
Add node-pre-gyp to dependencies
Add aws-sdk as a devDependency
Add a custom install script
Declare a binary object

```
![](img/2020-04-22-21-22-59.webp)
謎のエラーが出るのです。
これ、Windowsだとだめなやつかな？

→シンプルなプロジェクトだと動く。
```js
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('D:\\IdeaProjects\\sqlitetest\\test.db');
 
db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
 
db.close();
```

typescriptだと以下。
```ts

import {Database} from 'sqlite3';
var db = new Database('D:\\IdeaProjects\\sqlitetest\\test.db');
 
db.serialize(function() {
  db.run("CREATE TABLE lorem (info TEXT)");
 
  var stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  for (var i = 0; i < 10; i++) {
      stmt.run("Ipsum " + i);
  }
  stmt.finalize();
 
  db.each("SELECT rowid AS id, info FROM lorem", function(err, row) {
      console.log(row.id + ": " + row.info);
  });
});
 
db.close();
```

ヒント
https://github.com/LedgerHQ/ledgerjs/issues/278
https://github.com/mapbox/node-sqlite3/issues/909


### 20200421 SQLite
#### Node.js で SQLite を扱う


https://neos21.hatenablog.com/entry/2018/04/22/080000

``yarn``で``sqlite3``と``@types/sqlite3``を導入。

### 20200408
```
Uncaught Error: Invalid hook call. Hooks can only be called inside of the body of ...
```
わからんのじゃ！
うーん、material-uiのサイトを参考にしてたが、うまく行かない。
https://material-ui.com/components/lists/#simple-list
→Hookというものを使っていて、それがクラス式のコンポーネントの記載方法に対応していないらしい。
→``ChatMessagePostBox``を書き直してみたよ！なれない。
#### Invalid Hook Call Warning

https://ja.reactjs.org/warnings/invalid-hook-call-warning.html
なんか、クラスの中でフック（useから始まるなにか）を使っちゃいけないんだって。え、どうしろと？
#### フックに関するよくある質問
https://ja.reactjs.org/docs/hooks-faq.html#what-can-i-do-with-hooks-that-i-couldnt-with-classes
わかった。フックはクラスじゃ使えないわ。
もっというと、クラスで作る設計を置き換える新しい作り方っぽい。えーそうなん？なんでやろ。
#### React Hooksとは？各Hooksの使い方やルールを紹介

https://microcms.io/blog/what-is-react-hooks/
わかりやすい開設。うむ、流れはクラスから関数でコンポーネントを実現するのか。
あんま直感的じゃないけど、副作用を極力排除するならそうなるのか。

#### React+Reduxで書く時に気をつけていること/悩み3：hooks便利すぎ問題
https://www.fundely.co.jp/blog/tech/2019/11/20/180045/#section4
ここもわかりやすい。Hook有無比較がいい。
### 20200407
デザインをいじり始めて沼。
#### 『React』 +『Redux』 + 『Firebase』でLINE風のChat機能を作ろう！ 【Component編】

https://qiita.com/micropig3402/items/3431c998df582a441fa5
![](img/2020-04-07-21-49-04.webp)
お、悪くない。色々いじっていけそう。
### 20200406
#### Material-UI で Menu を作るときは anchorEl を忘れるな！

https://qiita.com/nacky00/items/d5a2a55735210bfc9c57
### 20200403
https://qiita.com/EBIHARA_kenji/items/1a043794014dc2f3a7db
> store と component を連結させる
> 一通りのものが揃いましたが、まだ react と redux の連結ができていません。component でその設定をします。
> 
> すべてのコンポーネントで連携する必要はありません。先に述べた、container となるコンポーネントを redux と連携します。

この設定がわかんなかった。Stateのトップレベルのコンポーネントと、Store(その中のState)を紐付ける。
そして下位のコンポーネントはPropsで伝搬させる。なるほどー。やっとわかってきた。
React+Redux、わっかりづらいなあー

### 20200401
ReduxとかFluxがよくわからん。手持ちの本はFlux、参考にしたサイトはRedux。
並列に並べていいものかもよくわからん。調査！
https://qiita.com/syossan27/items/7e1b2e07ac68b96bdaa7
どうも、FluxはReduxから派生したものらしい。
### 20200330
なぜかnueに浮気をしつつ。

でもwebpackあたりでしくってる。
どうしくったかよくわからない。
https://qiita.com/kenboo/items/996daf12a3eb17b7c89f
### 20200108
改めて、開発再開です。
デザインが絶望的なので、なんかいい感じのサンプルとか解説とかを漁る。
https://hisa-web.net/archives/382
ちが

https://qiita.com/junara/items/b8251bcb75760467aca4
スタイル適用方法。いいね。
https://cieloazul310.github.io/2019/06/typescript-material-ui-v4/
typescript
### 20191202
webpackのビルドを10倍高速化するプラグインの紹介
https://qiita.com/kmdsbng/items/d23f9b5f5fbc8869baad

### 20191202
Electron+React.jsで作るチャットアプリ

http://jesus9387.hatenablog.com/entry/2017/10/24/182438
### 20191201-2
どうも``import OS from 'os'``が悪さをしているように見える。なんでやねん。
と思ったけど、やっぱfs-extraも悪さしているみたい。みんな悪い子。
なにか設定が足りんのかしら。
![](./img/2019-12-01-23-39-27.webp)


→きたー！！これか、requireが働いていなかったのか。クソかよ。
Electron + Node.js 使用時の “Uncaught ReferenceError: require is not defined” への対処
https://qiita.com/okadato623/items/f8b7573ad911ca97ba49

``main.js``の``createWindow``を以下のように変える。
Before
```js
function createWindow() {
    // ブラウザウィンドウの作成
    win = new BrowserWindow({
        width: 800,
        height: 600
    })
    // index.html をロードする
    win.loadFile('index.html')
    // 起動オプションに、 "--debug"があれば開発者ツールを起動する
    if (process.argv.find((arg) => arg === '--debug')) {
        win.webContents.openDevTools()
    }
    // ブラウザウィンドウを閉じたときのイベントハンドラ
    win.on('closed', () => {
        // 閉じたウィンドウオブジェクトにはアクセスできない
        win = null
    })
}
```
After
```js
function createWindow() {
    // ブラウザウィンドウの作成
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
 
    })
    // index.html をロードする
    win.loadFile('index.html')
    // 起動オプションに、 "--debug"があれば開発者ツールを起動する
    if (process.argv.find((arg) => arg === '--debug')) {
        win.webContents.openDevTools()
    }
    // ブラウザウィンドウを閉じたときのイベントハンドラ
    win.on('closed', () => {
        // 閉じたウィンドウオブジェクトにはアクセスできない
        win = null
    })
}
```
### 20191201
TypeScript の async/await を Electron で使ってみる
https://aquasoftware.net/blog/?p=694

Electron+typescriptでasyncが使えない件だが、ここのサンプルはちゃんと動くのです。不思議。
Reactだとだめなんかな。
→なんか動かんくなった。もうわからんよ。複雑すぎる。

で、モジュールインポートの方式が今まで見てきたTypeScriptのソースと異なるのだが、なんでだろう？
モジュール側1
```ts
export const waitAsync = async function waitAsync(n: number): Promise<number> {
    var startTime = Date.now();
    var timeInterval = await new Promise<number>((resolve) => setTimeout(() => resolve(Date.now() - startTime), n));
    tryLog(`waited ${timeInterval}ms (@${process.type})`);
    return timeInterval;
}
```
モジュール側2
```ts
module.exports.waitAsync = async function waitAsync(n: number): Promise<number> {
    var startTime = Date.now();
    var timeInterval = await new Promise<number>((resolve) => setTimeout(() => resolve(Date.now() - startTime), n));
    tryLog(`waited ${timeInterval}ms (@${process.type})`);
    return timeInterval;
}
```
インポート側1
```ts
import {waitAsync, process} from './asyncTest';
```
インポート側2
```ts
var asyncClient = require('./asyncTest');
```

### 20191130 
いろんなやり方で環境構築。
https://qiita.com/maecho/items/c34de805101ae489532e
#### 関東最速
https://qiita.com/IzumiSy/items/b7d8a96eacd2cd8ad510
```
npx create-react-app ts-react-app --typescript
npm install --save redux react-redux
npm install -D @types/react-redux
npm install --save typescript-fsa typescript-fsa-reducers
```
いいかんじ。
次はelectron対応。
なんかようわからんけど、いずれにしてもElectronを入れるにはbabelとかいう謎のものを入れる必要がありそう。
```
npm i babel-core babel-loader babel-preset-env -D
```
### 20191129 
さっぱりわからん。真っ白画面になる。どうもasyncとかawaitとかのあたりがだめっぽい。それかファイル保存しているところか。
やってみたこと
```
yarn add async
yarn add await
yarn add @types/async
yarn add typescript-async
yarn add promise
yarn add @types/promise
```
### 20191127 4日目～7日目
一気に。中身は詳しくわからんけど、なんか雰囲気はつかめてきた。

- [4日目](https://qiita.com/EBIHARA_kenji/items/80adee2214d439209f98)
- [5日目](https://qiita.com/EBIHARA_kenji/items/6da1cebb65a18279d096)
- [6日目](https://qiita.com/EBIHARA_kenji/items/26fa0d004cbaeea807e4)
- [7日目](https://qiita.com/EBIHARA_kenji/items/19b13207b7a8055043c4)

インストールしたもの。
```
yarn add moment @types/moment
yarn add styled-components @types/styled-components
yarn add reset-css
yarn add style-loader css-loader
yarn add react-datepicker@1.7.0 @types/react-datepicker@1.1.7
yarn add fs-extra @types/fs-extra
```
### 20191125 3日目
いいかげんGUIも作っていこうかと。
https://qiita.com/EBIHARA_kenji/items/25e59f7132b96cb886f3
前回は2日目まで終わっていたので、[3日目](https://qiita.com/EBIHARA_kenji/items/1a043794014dc2f3a7db)をすすめる。
途中でインストールが必要だったのでメモ。
```
yarn add uuid
yarn add @types/uuid
yarn add clone
yarn add @types/clone
```
実行コマンド
```
yarn build
yarn start
```
![](img/2019-11-25-20-35-02.webp)
おお、手順通りにするだけでそれっぽい画面がでけたで！素敵！

``yarn watch``を使えるように、``package.json``をいじる。
```json
{
  "name": "test2",
  "version": "1.0.0",
  "description": "",
  "main": "main.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "start": "electron ./",
    "watch": "webpack --watch"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/clone": "^0.1.30",
    "@types/uuid": "^3.4.6",
    "clone": "^2.1.2",
    "react": "^16.11.0",
    "react-dom": "^16.11.0",
    "react-redux": "^7.1.1",
    "redux": "^4.0.4",
    "styled-components": "^4.4.1",
    "uuid": "^3.3.3"
  },
  "devDependencies": {
    "@types/react": "^16.9.11",
    "@types/react-dom": "^16.9.3",
    "@types/react-redux": "^7.1.5",
    "@types/redux": "^3.6.0",
    "electron": "^7.0.1",
    "ts-loader": "^6.2.1",
    "tslint": "^4.5.1",
    "tslint-loader": "^3.5.4",
    "typescript": "^3.6.4",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  }
}
```

### 20191105
#### TypeScriptでElectron始め
ここ見ながらセットアップ。ただし、npmの代わりにyarnを使ってみる。
https://qiita.com/necomeshi/items/1861ff80e689a377899a

```
yarn add typescript
yarn add electron
yarn add webpack
yarn add webpack-cli
yarn add ts-loader
```

package.jsonの設定。
こちらを参照。
https://qiita.com/toricor_/items/6ef7f53c4e11aa5167e9
```json
{
  "dependencies": {
    "electron": "^7.0.1",
    "ts-loader": "^6.2.1",
    "typescript": "^3.6.4",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc",
    "watch": "tsc -w",
    "tsc": "tsc",
    "init": "tsc --init"
  }
}
```
んーつまった。webpackってなんやねん。

こっちので挑戦。
https://qiita.com/EBIHARA_kenji/items/25e59f7132b96cb886f3

```
npm install --save react react-dom redux react-redux styled-components
npm install --save-dev electron typescript tslint webpack webpack-cli ts-loader tslint-loader
npm install --save-dev @types/react @types/react-dom @types/redux @types/react-redux
```

コンパイルでエラー。
```
./node_modules/.bin/webpack
Hash: 578cb98298d788bb0bef
Version: webpack 4.41.2
Time: 710ms
ERROR in ./ts/index.tsx
Module build failed (from ./node_modules/tslint-loader/index.js):
Error: Tslint should be of version 4+
    at Object.module.exports (C:\Users\shimp\OneDrive\Documents\pkb\main\doc\プロジェクト\その他\20190421_電算倶楽部システム管理\制作
物\test2\node_modules\tslint-loader\index.js:136:11)  
```
tslintのバージョンを指定してインストール。
```
npm install --save-dev  tslint@^4.0.0
```
んー、ちがう。

``npm install --save-dev @types/react @types/react-dom @types/redux @types/react-redux``をし忘れていたみたい。


おお、ちゃんと画面がでたべ！！





#### 一方
https://qiita.com/seibe/items/769e932b21544b075688
https://lib.haxe.org/t/electron/
```
haxelib install electron
```

新規のプロジェクトフォルダを作成し、メインソースである``Main.hx``を作成。
チュートリアル通り
```haxe
class Main {
  static public function main():Void {
    trace("Hello World");
  }
}
```
これはできたが…
electronインストールわからん。

うーんわからん。あきらめた。
