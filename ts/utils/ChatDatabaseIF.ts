import FsEx from 'fs-extra'; // ...(a)
import OS from 'os';
import Path from 'path';
import child_process from 'child_process';
import { createChatMessage } from '../states/IChatMessage';

import { IChatMessage } from '../states/IChatMessage';

// データベースファイル名
const dbFileName = 'chatroom.db';
const useJson = !false;

// OSごとのユーザーのプロファイルフォルダに保存される
// const dataFilePath = Path.join(OS.homedir(), 'todo.json');
// const dataFilePath = Path.join(Path.resolve(__dirname), 'todo.json');
// プログラムのあるフォルダに記録
const dataFilePath = Path.join(Path.resolve(process.cwd()), dbFileName);

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

export const saveStateTest = async (chatMessageList: IChatMessage[]) => {
    const sqlCommand = '';
    const sqlCommand2 = '';
    await child_process.exec('echo select * from channel | neko "D:\\IdeaProjects\\lcchat\\Sqltest.n"', (error, stdout, stderr) => {
        if (error) {
            // エラー時は標準エラー出力を表示して終了
            alert(stderr);
            return;
        } else {
            // 成功時は標準出力を表示して終了
            chatMessageList.push(createChatMessage('0', stdout, '1', '1', new Date(), 'a', null, null, null));
            return stdout;
        }
    })
}

/**
 * ファイルにタスクのデータを保存する
 */
export const saveState = async (chatMessageList: IChatMessage[]) => {
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

/** 指定ミリ秒 待つ関数 */
const setTimeoutPromise = (count: number) => {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, count);
    });
};
