import { v4 as UUID } from 'uuid';
/**
 * タスク
 */
export interface ITask {
    /** 完了フラグ */
    complete: boolean;
    /** 期限 */
    deadline: Date;
    /** タスクを一意に判断するID (UUID) */
    id: string;
    /** タスクの名前 */
    taskName: string;
}
/**
 * タスクのリスト
 */
export interface ITaskList {
    /** タスクの一覧 */
    tasks: ITask[];
}
/**
 * タスクのリストの初期値
 */
export const initTaskList: ITaskList = {
    tasks: [],
};
/**
 * タスクを作成する
 * @param taskName タスク名
 * @param deadline 期限
 */
export const createTask = (taskName: string, deadline: Date): ITask => {
    return {
        complete: false,
        deadline,
        id: UUID(),
        taskName,
    };
};