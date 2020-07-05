// import Toml from '@ltd/j-toml';
import {TomlReader} from '@sgarciac/bombadil/lib/tables';
import fs from 'fs';
import path from 'path';
import { app, App, BrowserWindow } from 'electron';

// アプリケーション設定
interface IAppConfig {
    dbAccessSynchronous: boolean;
    dbFileName: string;
    useJson: boolean;
    hotkeys: {
        toggleVisible: string;
    };
    lcchatCuiCommand: string;
}

export const initAppConfig = (configPath : string) => {
    const fileName = 'appconfig.toml';
    // ファイルパスは、アプリフォルダ以下のconfig/appconfig.toml
    console.log(JSON.stringify(app));
    const filePath = path.join(app.getAppPath(), 'config', fileName);
    const tomlFileData: string = fs.readFileSync(filePath).toString();
    const reader = new TomlReader();
    reader.readToml(tomlFileData);
    appConfig = reader.result;
}
export let appConfig : IAppConfig;
