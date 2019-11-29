import { ITaskList } from './states/ITask';
/**
 * store のデータ型を定義する。（親state）
 *
 * プロパティには、管理する child_state を指定する
 */
export interface IState {
    taskList: ITaskList;
    // state が増えたら足していく
}