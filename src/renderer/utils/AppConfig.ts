// import Toml from '@ltd/j-toml';
import {TomlReader} from '@sgarciac/bombadil/lib/tables';
import fs from 'fs';

// アプリケーション設定
interface IAppConfig {
    dbAccessSynchronous: boolean;
    testText: string;
    dbFileName: string;
    useJson: boolean;
    hotkeys: {
        toggleVisible: string;
    };
}

const filePath = 'appconfig.toml';
const tomlFileData: string = fs.readFileSync(filePath).toString();
const reader = new TomlReader();
reader.readToml(tomlFileData);
export const appConfig: IAppConfig = reader.result; // -> {whatever: 1}

// const data = Toml.parse(``, 0.5, '\n')
