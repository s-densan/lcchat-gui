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


const runCommand = (sql: string): { stdout: Buffer, result: any } => {
  // 問い合わせコマンドファイル作成
  const requestFilePath = Path.join(os.tmpdir(), uuid() + '.json');
  const resultFilePath = Path.join(os.tmpdir(), uuid() + '.json');
  const inputData = { query: sql, dbFilePath: dbFilePath, resultFilePath: resultFilePath };
  // alert(JSON.stringify(inputData));

  FsEx.writeFileSync(requestFilePath, JSON.stringify(inputData));
  // コマンド実行
  const command = `${lcchatCommand} file ${requestFilePath}`;
  // alert(command);
  // alert(JSON.stringify(inputData));
  // 
  const stdout = child_process.execSync(command);
  // alert(stdout.toString());
  // 結果Json
  console.log(stdout.toString());
  const resultData = FsEx.readJsonSync(resultFilePath);
  // const stdout = child_process.execSync(lcchatCommand + ' stdin',  { input: JSON.stringify(inputData) });
  return { stdout: stdout, result: JSON.stringify(resultData) };
};
export const loadNewChatMessages = (latestMessageId: string, latestUpdatedAt: Date) => {
  const sql = `select messages.*, users.user_data from messages
               left join users
               on
                   users.user_id = messages.user_id and
                   messages.message_id <> ${latestMessageId} and
                   messages.created_at >= ${latestUpdatedAt}`;
  const { stdout: stdout, result: result } = runCommand(sql);
  return result;
};
export const loadChatMessagesDB2 = () => {
  const sql = `select messages.*, users.user_data from messages left join users on users.user_id = messages.user_id`;
  const { stdout: stdout, result: result } = runCommand(sql);
  return result;
};
export const loadChatMessagesDB = async () => {
  const sql = ` SELECT * FROM messages `;
  const { stdout: stdout, result: result } = runCommand(sql);
  return result;
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
                "${newMessage.updatedAt}",
                "${newMessage.deletedAt}"
    )`.replace('\n', '');
  const { stdout: stdout, result: result } = runCommand(sql);
  return result;
};

export const updateMessageTextDB = (chatMessageId: string, text: string) => {
  const sql = `UPDATE messages SET text = "${text}" WHERE message_id = "${chatMessageId}"`;
  const {stdout: stdout, result: result} = runCommand(sql);
  return result;
};
export const deleteMessageDB = (chatMessageId: string) => {
  const sql = ` DELETE FROM messages WHERE message_id = "${chatMessageId}"`;
  const {stdout: stdout, result: result} = runCommand(sql);
  return result;
};

export const loadUserFromComputerNameDB = (computerName: string) => {
  const sql = `SELECT * FROM users`;
  const {stdout: stdout, result: result} = runCommand(sql);
  return result;
};

export const insertUser = (user: IUser) => {
  const sql = `INSERT
            INTO
                users
            VALUES(
                -- ユーザID
                "${user.userId}",
                -- ユーザ名
                "${user.userData.userName}",
                -- ユーザデータ(SQLのエスケープをする)
                "${JSON.stringify(user.userData).replace(/"/g, '""')}",
                -- 作成日時
                "${new Date()}",
                -- 更新日時
                "${new Date()}",
                -- 削除日時
                "${undefined}"
    )`.replace('\n', '');
  const {stdout: stdout, result: result} = runCommand(sql);
  return result;
};
