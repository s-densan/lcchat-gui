# TypescriptでElectron

## 記録

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
![](img/2019-11-25-20-35-02.png)
おお、手順通りにするだけでそれっぽい画面がでけたで！素敵！

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
