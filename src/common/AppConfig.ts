// import Toml from '@ltd/j-toml';
import {TomlReader} from '@sgarciac/bombadil/lib/tables';
import { app } from 'electron';
import fs from 'fs';
import path from 'path';

// アプリケーション設定
export interface IAppConfig {
    dbAccessSynchronous: boolean;
    dbFilePath: string;
    hotkeys: {
        toggleVisible: string;
    };
    lcchatCuiCommand: string;
    reloadIntervalSecond: number;
    useTasktray: boolean;
    isDebug: boolean;
}

export const initAppConfig = () => {
    const fileName = 'appconfig.toml';
    // ファイルパスは、アプリフォルダ以下のconfig/appconfig.toml
    const filePath = path.join(app.getAppPath(), 'config', fileName);
    const tomlFileData: string = fs.readFileSync(filePath).toString();
    const reader = new TomlReader();
    reader.readToml(tomlFileData);
    appConfig = reader.result;
}
export let appConfig: IAppConfig;
