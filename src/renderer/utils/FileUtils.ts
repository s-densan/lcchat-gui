import { remote } from 'electron';
import path from 'path';
import { IAppConfig } from '../../common/AppConfig';

export const getAttachmentFilePath = (fileName: string): string => {
  const appPath = remote.app.getAppPath();
  const appConfig: IAppConfig = remote.getGlobal('appConfig');
  const dbFilePath = appConfig.dbFilePath.replace('${appPath}', appPath);
  const dbFileDirPath = path.dirname(dbFilePath);
  const attachmentFilePath = path.resolve(path.join(
    dbFileDirPath,
    'attachments',
    fileName,
  ));
  return attachmentFilePath;
};
