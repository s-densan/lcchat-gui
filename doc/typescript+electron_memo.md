# TypescriptでElectron

## 記録

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
![](./img/2019-12-01-23-39-27.png)


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

で、モジュールインポートの方式が今まで見てきたTypescriptのソースと異なるのだが、なんでだろう？
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
![](img/2019-11-25-20-35-02.png)
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
#### TypescriptでElectron始め
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
