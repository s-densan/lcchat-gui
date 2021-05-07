import { Tray } from 'electron';
import { IAppConfig } from '../common/AppConfig';

export interface IGlobal {
    appConfig: IAppConfig;
    trayIcon: Tray;
    trayIconImagePath1: string,
    trayIconImagePath2: string,
}
