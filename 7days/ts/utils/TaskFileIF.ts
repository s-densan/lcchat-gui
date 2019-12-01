import FsEx from 'fs-extra'; // ...(a)
import OS from 'os';
import Path from 'path';

import { ITask } from '../states/ITask';

// OSごとのユーザーのプロファイルフォルダに保存される
const dataFilePath = Path.join(OS.homedir(), 'todo.json');

/**
* ファイルからタスクのデータをロードする
*/
export const loadTask = async () => {
    const exist = await FsEx.pathExists(dataFilePath); // ...(b)
    if (!exist) { // ...(c)
        // データファイルがなけれが、ファイルを作成して、初期データを保存する
        FsEx.ensureFileSync(dataFilePath);
        await FsEx.writeJSON(dataFilePath, { data: [] });
    }
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
    await setTimeoutPromise(1000);
    return jsonData;
};

/**
* ファイルにタスクのデータを保存する
*/
export const saveState = async (taskList: ITask[]) => {
    // 早すぎて非同期処理を実感できないので、ちょっと時間がかかる処理のシミュレート
    await setTimeoutPromise(1000);
    await FsEx.writeJSON(dataFilePath, { data: taskList }, {
        replacer: (key: string, value: any) => {
            if (key !== 'deadline') { return value; }
            return new Date((value as string)).getTime();
        },
        spaces: 2,
    });
};
/**
* ファイルにタスクのデータを保存する
*/
/** 指定ミリ秒 待つ関数 */
const setTimeoutPromise = (count: number) => {
    return new Promise((resolve) => {
        setTimeout(() => { resolve(); }, count);
    });
};
