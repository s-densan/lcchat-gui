import child_process from 'child_process';
import FsEx from 'fs-extra'; // ...(a)
import Path from 'path';
import {appConfig} from './AppConfig';

import { IChatMessage } from '../states/IChatMessage';
import { IUser } from '../slices/UserSlice';

// データベースファイル名
const dbFileName = appConfig.dbFileName;
const useJson = appConfig.useJson;

// OSごとのユーザーのプロファイルフォルダに保存される
// const dataFilePath = Path.join(OS.homedir(), 'todo.json');
// const dataFilePath = Path.join(Path.resolve(__dirname), 'todo.json');
// プログラムのあるフォルダに記録
const dataFilePath = Path.join(Path.resolve(process.cwd()), dbFileName);

export const loadChatMessagesDB2 = () => {
  const sql = `select message.*, user.user_data from message left join user on user.user_id = message.user_id`;
  const command = `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`;
  const stdout = child_process.execSync(command,  { input: sql });
  return stdout.toString();
};
export const loadChatMessagesDB = async () => {
  const sql = ` SELECT * FROM message `;
  const command = `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`;
  const stdout = child_process.execSync(command,  { input: sql });
  return stdout.toString();
};
/**
 * ファイルからタスクのデータをロードする
 */
export const loadChatMessage = async () => {
    const exist = await FsEx.pathExists(dataFilePath); // ...(b)
    if (!exist) { // ...(c)
        // データファイルがなけれが、ファイルを作成して、初期データを保存する
        FsEx.ensureFileSync(dataFilePath);
        await FsEx.writeJSON(dataFilePath, { data: [] });
    }
    if (useJson) {
        // データファイルを読み込む ...(d)
        const jsonData = await FsEx.readJSON(dataFilePath, {
            // 日付型は、数値で格納しているので、日付型に変換する
            reviver: (key: string, value: any) => {
                if (key === 'deadline') {
                    return new Date(value as number);
                } else {
                    return value;
                }
            },
        });
        // 早すぎて非同期処理を実感できないので、ちょっと時間がかかる処理のシミュレート
        // await setTimeoutPromise(1000);
        return jsonData;
    } else {
        return '';
    }
};

export const insertMessageDB = async (newMessage: IChatMessage) => {
  const sql = `INSERT
            INTO
                message
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
  const nkf = child_process.exec(
    `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`,
    (error, stdout, stderr) => {
      if (error) {
        // エラー時は標準エラー出力を表示して終了
        alert(stderr);
        return;
      } else {
        return stdout;
      }
    },
  );
  if (nkf.stdin !== null) {
    nkf.stdin.write(sql);
    nkf.stdin.end();
  }
};

/**
 * ファイルにタスクのデータを保存する
 */
export const saveStateJson = async (chatMessageList: IChatMessage[]) => {
    if (useJson) {
        // 早すぎて非同期処理を実感できないので、ちょっと時間がかかる処理のシミュレート
        // await setTimeoutPromise(1000);
        // alert(dataFilePath);
        await FsEx.writeJSON(dataFilePath, { data: chatMessageList }, {
            replacer: (key: string, value: any) => {
                return value;
            },
            spaces: 2,
        });
    } else {
        const fun = () => {
            /*
            const db = new sqlite3.Database(dataFilePath);
            const sqlCommand = '';
            const sqlCommand2 = '';
            db.serialize(() => {
                db.run(sqlCommand);
                const stmt = db.prepare(sqlCommand2);
                stmt.run();
                stmt.finalize();
            });
            */
            return '';
        };
        await fun();
    }
};

export const updateMessageTextDB = (chatMessageId: string, text: string) => {
  const sql = `UPDATE message SET text = "${text}" WHERE message_id = "${chatMessageId}"`;
  const command = `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`;
  const stdout = child_process.execSync(command, { input: sql });
  return stdout.toString();
};
export const deleteMessageDB = (chatMessageId: string) => {
  const sql = ` DELETE FROM message WHERE message_id = "${chatMessageId}"`;
  const command = `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`;
  const stdout = child_process.execSync(command, { input: sql });
  return stdout.toString();
};

export const loadUserFromComputerNameDB = (computerName: string) => {
  const sql = `SELECT * FROM user`;
  const command = `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`;
  const stdout = child_process.execSync(command, { input: sql });
  return stdout.toString();
};

export const insertUser = (user: IUser) => {
  const sql = `INSERT
            INTO
                user
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
  const command = `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`;
  const stdout = child_process.execSync(command, { input: sql });
  return stdout.toString();
};
