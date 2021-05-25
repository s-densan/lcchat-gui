import child_process from 'child_process';
import FsEx from 'fs-extra';
import Moment from 'moment';
import os from 'os';
import Path from 'path';
import { v4 as UUID } from 'uuid';
// import { IAppConfig } from '../../common/AppConfig';
import { IUser } from '../slices/UserSlice';
import { IAttachment } from '../states/IAttachment';
import { IChatMessage, ITextMessageData } from '../states/IChatMessage';
// import {IGlobal} from '../../common/IGlobal';
import { ipcRenderer } from 'electron';

const sqlDatetimeFormat = 'YYYY-MM-DD HH:mm:ss.sss';

/*
ipcRenderer.invoke('global').then((global) =>{
  // console.log("-------------------------------------------");
  // console.log(typeof(global));
  // console.log(global);
  const appConfig = global.appConfig;
  lcchatCommand = appConfig.lcchatCuiCommand.replace('${appPath}', appPath);
  dbFilePath = appConfig.dbFilePath.replace('${appPath}', appPath);
})
*/


const runCommand = async (sql: string) => {
  const appPath = await ipcRenderer.invoke('getAppPath');
  const dbFilePathTmp = await ipcRenderer.invoke('getDBFilePath')
  const dbFilePath = dbFilePathTmp.replace('${appPath}', appPath)
  console.info(sql)
  console.info(dbFilePath)
  // 問い合わせコマンドファイル作成
  const requestFilePath = Path.join(os.tmpdir(), UUID() + '.json');
  const resultFilePath = Path.join(os.tmpdir(), UUID() + '.json');
  const inputData = { query: sql, dbFilePath, resultFilePath };
  const lcchatCuiCommand = await ipcRenderer.invoke('getLcchatCuiCommand')
  const lcchatCommand = lcchatCuiCommand.replace('${appPath}', appPath)
  console.info(lcchatCommand)

  FsEx.writeFileSync(requestFilePath, JSON.stringify(inputData));
  // コマンド実行
  const command = `${lcchatCommand} file ${requestFilePath}`;
  // 
  const stdout = child_process.execSync(command);
  // 結果Json
  const { data: data, ok: ok } = FsEx.readJsonSync(resultFilePath);
  // const stdout = child_process.execSync(lcchatCommand + ' stdin',  { input: JSON.stringify(inputData) });
  if (!ok) {
    throw Error(`sql command error: sql:${sql} stdout:${stdout}`);
  }

  return data;
};

export const loadChatMessagesDB = async () => {
  const sql = `
    SELECT messages.*, users.user_data, attachments.attachment_id, attachments.attachment_data
    FROM messages
    LEFT JOIN users
    ON users.user_id = messages.user_id
    LEFT JOIN attachments
    ON attachments.message_id = messages.message_id`;
  const data = await runCommand(sql);
  return data;
};
export const loadNewChatMessagesDB = async (lastLoadDatetime: Date) => {
  const sql = `
    SELECT messages.*, users.user_data, attachments.attachment_id, attachments.attachment_data
    FROM messages
    LEFT JOIN users
    ON users.user_id = messages.user_id
    LEFT JOIN attachments
    ON attachments.message_id = messages.message_id
    WHERE DATETIME("${Moment(lastLoadDatetime).format(sqlDatetimeFormat)}") < DATETIME(messages.updated_at)`;
  const data = await runCommand(sql);
  return data;
};

export const insertMessageDB = async (newMessage: IChatMessage) => {
  const sql = `INSERT
            INTO
                messages
            VALUES(
                "${newMessage.messageId}",
                "${newMessage.userId}",
                "$talk_id",
                "${newMessage.type}",
                "${JSON.stringify(newMessage.messageData).replace(/"/g, '""').replace('?', '?')}",
                DATETIME("${Moment(newMessage.postedAt).format(sqlDatetimeFormat)}"),
                "publish",
                DATETIME("${Moment(newMessage.createdAt).format(sqlDatetimeFormat)}"),
                DATETIME("${Moment(newMessage.updatedAt).format(sqlDatetimeFormat)}")
    )`;
  const data = await runCommand(sql);
  return data;
};

export const updateMessageTextDB = async (chatMessageId: string, messageData: ITextMessageData) => {
  const messageDataJson = JSON.stringify(messageData).replace(/"/g, '""').replace('?', '??');
  const sql = `UPDATE messages SET message_data = "${messageDataJson}" WHERE message_id = "${chatMessageId}"`;
  const data = await runCommand(sql);
  return data;
};
export const deleteMessageDB = async (chatMessageId: string) => {
  const sql = ` DELETE FROM messages WHERE message_id = "${chatMessageId}"`;
  const data = await runCommand(sql);
  return data;
};

export const loadUserFromComputerNameDB = async () => {
  const sql = `SELECT * FROM users`;
  const data = await runCommand(sql);
  return data;
};

export const insertUser = async (user: IUser) => {
  const nowDatetime = new Date();
  const sql = `INSERT
            INTO
                users
            VALUES(
                -- ユーザID
                "${user.userId}",
                -- ユーザデータ(SQLのエスケープをする)
                "${JSON.stringify(user.userData).replace(/"/g, '""').replace('?', '??')}",
                -- ステータス
                "active",
                -- 作成日時
                "${Moment(nowDatetime).format(sqlDatetimeFormat)}",
                -- 更新日時
                "${Moment(nowDatetime).format(sqlDatetimeFormat)}"
    )`;
  const data = await runCommand(sql);
  return data;
};

/**
 *
 */
export const insertAttachmentDB = async (newAttachment: IAttachment) => {
  const sql = `INSERT
            INTO
                attachments
            VALUES(
                "${newAttachment.attachmentId}",
                "${newAttachment.messageId}",
                "${JSON.stringify(newAttachment.attachmentData).replace(/"/g, '""').replace('?', '??')}",
                "available",
                "${Moment(newAttachment.createdAt).format(sqlDatetimeFormat)}",
                "${Moment(newAttachment.updatedAt).format(sqlDatetimeFormat)}"
    )`;
  const data = await runCommand(sql);
  return data;
};

export const deleteAttachmentDB = async (attachmentId: string) => {
  const sql = ` DELETE FROM attachments WHERE attachment_id = "${attachmentId}"`;
  const data = await runCommand(sql);
  return data;
};
