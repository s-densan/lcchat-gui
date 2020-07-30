import { remote } from 'electron';
import child_process from 'child_process';
import FsEx from 'fs-extra';
import Path from 'path';
import { IUser } from '../slices/UserSlice';
import { IChatMessage } from '../states/IChatMessage';
import { IAppConfig } from '../../common/AppConfig';
import os from 'os';
import uuid from 'uuid';

const appPath = remote.app.getAppPath();
const appConfig: IAppConfig = remote.getGlobal('appConfig');

const lcchatCommand = appConfig.lcchatCuiCommand.replace('${appPath}', appPath);
const dbFilePath = appConfig.dbFilePath.replace('${appPath}', appPath)


const runCommand = (sql: string): any => {
  // 問い合わせコマンドファイル作成
  const requestFilePath = Path.join(os.tmpdir(), uuid() + '.json');
  const resultFilePath = Path.join(os.tmpdir(), uuid() + '.json');
  const inputData = { query: sql, dbFilePath: dbFilePath, resultFilePath: resultFilePath };

  FsEx.writeFileSync(requestFilePath, JSON.stringify(inputData));
  // コマンド実行
  const command = `${lcchatCommand} file ${requestFilePath}`;
  // 
  const stdout = child_process.execSync(command);
  // 結果Json
  console.log(stdout.toString());
  const { data: data, ok: ok } = FsEx.readJsonSync(resultFilePath);
  // const stdout = child_process.execSync(lcchatCommand + ' stdin',  { input: JSON.stringify(inputData) });
  if (!ok) {
    throw Error(`sql command error: sql:${sql} stdout:${stdout}`);
  }
  
  alert({ data: data, ok: ok })
  return data;
};
export const loadNewChatMessages = (latestMessageId: string, latestUpdatedAt: Date) => {
  const sql = `select messages.*, users.user_data from messages
               left join users
               on
                   users.user_id = messages.user_id and
                   messages.message_id <> ${latestMessageId} and
                   messages.created_at >= ${latestUpdatedAt}`;
  const data = runCommand(sql);
  return data;
};
export const loadChatMessagesDB2 = () => {
  const sql = `
    SELECT messages.*, users.user_data
    FROM messages
    LEFT JOIN users
    ON users.user_id = messages.user_id`;
  const data = runCommand(sql);
  alert(data);
  return data;
};
export const loadChatMessagesDB = async () => {
  const sql = ` SELECT * FROM messages `;
  const data = runCommand(sql);
  return data;
};

export const insertMessageDB = async (newMessage: IChatMessage) => {
  const sql = `INSERT
            INTO
                messages
            VALUES(
                "${newMessage.id}",
                "${newMessage.text}",
                "${newMessage.userId}",
                "$channel_id",
                "${newMessage.messageData}",
                "${newMessage.postedAt}",
                "${newMessage.createdAt}",
                "${newMessage.updatedAt}"
    )`.replace('\n', '');
  const data = runCommand(sql);
  return data;
};

export const updateMessageTextDB = (chatMessageId: string, text: string) => {
  const sql = `UPDATE messages SET text = "${text}" WHERE message_id = "${chatMessageId}"`;
  const data = runCommand(sql);
  return data;
};
export const deleteMessageDB = (chatMessageId: string) => {
  const sql = ` DELETE FROM messages WHERE message_id = "${chatMessageId}"`;
  const {stdout: stdout, result: result} = runCommand(sql);
  return result;
};

export const loadUserFromComputerNameDB = (computerName: string) => {
  const sql = `SELECT * FROM users`;
  const data = runCommand(sql);
  return data;
};

export const insertUser = (user: IUser) => {
  const sql = `INSERT
            INTO
                users
            VALUES(
                -- ユーザID
                "${user.userId}",
                -- ユーザデータ(SQLのエスケープをする)
                "${JSON.stringify(user.userData).replace(/"/g, '""')}",
                -- ステータス
                "active",
                -- 作成日時
                "${new Date()}",
                -- 更新日時
                "${new Date()}"
    )`.replace('\n', '');
  const data = runCommand(sql);
  return data;
};
