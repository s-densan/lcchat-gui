import child_process from 'child_process';
import FsEx from 'fs-extra'; // ...(a)
import Path from 'path';

import { IChatMessage } from '../states/IChatMessage';

// データベースファイル名
const dbFileName = 'chatroom.db';
const useJson = !false;

// OSごとのユーザーのプロファイルフォルダに保存される
// const dataFilePath = Path.join(OS.homedir(), 'todo.json');
// const dataFilePath = Path.join(Path.resolve(__dirname), 'todo.json');
// プログラムのあるフォルダに記録
const dataFilePath = Path.join(Path.resolve(process.cwd()), dbFileName);

export const loadChatMessagesDB = async () => {
  const sql = ` SELECT * FROM message `;
  const command = `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`;
  const stdout = child_process.execSync(command,  { input: sql });
  return stdout.toString();
  /*
  const nkf = child_process.exec(
    `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`,
    (error, stdout, stderr) => {
      alert('nkf');
      if (error) {
        // エラー時は標準エラー出力を表示して終了
        alert(stderr);
        return;
      } else {
        alert(stdout);
        return stdout;
      }
    },
  );
  alert(sql.trim());
  if (nkf.stdin !== null) {
    nkf.stdin.write(sql);
    nkf.stdin.end();
  }
  if (nkf.stdout !== null) {
    // 標準出力がある場合は標準出力を読み込んだ結果を返す。
    alert(nkf.stdout);
    return nkf.stdout.read();
  } else {
    return '';
  }
  */
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

export const deleteMessageDB = (chatMessageId: string) => {
  const sql = ` DELETE FROM message WHERE message_id = "${chatMessageId}"`;
  const command = `neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"`;
  const stdout = child_process.execSync(command, { input: sql });
  return stdout.toString();
};
