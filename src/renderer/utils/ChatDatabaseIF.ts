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
// データベースファイル名
const dbFileName = appConfig.dbFileName;
const useJson = appConfig.useJson;

const lcchatCommand = appConfig.lcchatCuiCommand.replace('${appPath}', appPath);
const dbFilePath = Path.join(appPath, appConfig.dbFileName);

// OSごとのユーザーのプロファイルフォルダに保存される
// const dataFilePath = Path.join(OS.homedir(), 'todo.json');
// const dataFilePath = Path.join(Path.resolve(__dirname), 'todo.json');
// プログラムのあるフォルダに記録
const dataFilePath = Path.join(appPath, dbFileName);

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
  const sql = `select message.*, user.user_data from message
               left join user
               on
                   user.user_id = message.user_id and
                   message.message_id <> ${latestMessageId} and
                   message.created_at >= ${latestUpdatedAt}`;
  const { stdout: stdout, result: result } = runCommand(sql);
  return result;
};
export const loadChatMessagesDB2 = () => {
  const sql = `select message.*, user.user_data from message left join user on user.user_id = message.user_id`;
  const { stdout: stdout, result: result } = runCommand(sql);
  return result;
};
export const loadChatMessagesDB = async () => {
  const sql = ` SELECT * FROM message `;
  const { stdout: stdout, result: result } = runCommand(sql);
  return result;
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
  const { stdout: stdout, result: result } = runCommand(sql);
  return result;
  /*
  const nkf = child_process.exec(
    lcchatCommand,
    (error, stdout, stderr) => {
      if (error) {
        // エラー時は標準エラー出力を表示して終了
        throw new Error(stderr);
      } else {
        return stdout;
      }
    },
  );
  if (nkf.stdin !== null) {
    nkf.stdin.write(sql);
    nkf.stdin.end();
  }
  */
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
  const {stdout: stdout, result: result} = runCommand(sql);
  return result;
};
export const deleteMessageDB = (chatMessageId: string) => {
  const sql = ` DELETE FROM message WHERE message_id = "${chatMessageId}"`;
  const {stdout: stdout, result: result} = runCommand(sql);
  return result;
};

export const loadUserFromComputerNameDB = (computerName: string) => {
  // alert(lcchatCommand);
  const sql = `SELECT * FROM user`;
  const {stdout: stdout, result: result} = runCommand(sql);
  return result;
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
  const {stdout: stdout, result: result} = runCommand(sql);
  return result;
};
