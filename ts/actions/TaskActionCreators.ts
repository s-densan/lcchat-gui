import { Dispatch, Store } from 'redux';

import { ITaskState } from '../ITaskStore';
import { ITask } from '../states/ITask';
import { loadTask, saveState } from '../utils/TaskFileIF';
import {
    ADD_TASK,
    DELETE_TASK,
    IAddTaskAction,
    IDeleteAction,
    IShowTaskAction,
    IToggleCompleteAction,
    IToggleShowSpinnerAction,
    SHOW_TASKS,
    TOGGLE_COMPLETE_TASK,
    TOGGLE_SHOW_SPINNER,
} from './TaskActions';

/**
 * タスクの表示アクションを作成する
 * @param tasks 表示するタスクのリスト
 */
export const createShowTasksAction = (tasks: ITask[]): IShowTaskAction => {
    return {
        // tasks, // 本来はこっち
        tasks,
        type: SHOW_TASKS,
    };
};
/**
 * 新しいタスクを作成するアクションを作成する
 * @param taskName 新しいタスクの名前
 * @param deadline 新しいタクスの期限
 */
export const createAddTaskAction =
    (taskName: string, deadline: Date, store: Store<ITaskState>): IToggleShowSpinnerAction => {
        (async () => {
            const addAction: IAddTaskAction = {
                deadline,
                taskName,
                type: ADD_TASK,
            };
            store.dispatch(addAction);
            const taskList = store.getState().taskList;
            await saveState(taskList.tasks);
            store.dispatch<IToggleShowSpinnerAction>({
                type: TOGGLE_SHOW_SPINNER,
            });
        })();
        return {
            type: TOGGLE_SHOW_SPINNER,
        };
    };
/**
 * タスクの完了状態を切り替える
 * @param taskId 完了状態を切り替える対象のタスクのID
 */
export const createToggleCompleteAction =
    (taskId: string, store: Store<ITaskState>): IToggleShowSpinnerAction => {
        (async () => {
            store.dispatch<IToggleCompleteAction>({
                taskId,
                type: TOGGLE_COMPLETE_TASK,
            });
            const taskList = store.getState().taskList;
            await saveState(taskList.tasks);
            store.dispatch<IToggleShowSpinnerAction>({
                type: TOGGLE_SHOW_SPINNER,
            });
        })();
        return {
            type: TOGGLE_SHOW_SPINNER,
        };
    };
/**
 * タスクを削除するアクションを作成する
 * @param taskId 削除するタスクのID
 */
export const createDeleteTaskAction = (taskId: string, store: Store<ITaskState>): IToggleShowSpinnerAction => {
    (async () => {
        store.dispatch<IDeleteAction>({ taskId, type: DELETE_TASK });
        const taskList = store.getState().taskList;
        await saveState(taskList.tasks);
        store.dispatch<IToggleShowSpinnerAction>({
            type: TOGGLE_SHOW_SPINNER,
        });
    })();
    return {
        type: TOGGLE_SHOW_SPINNER,
    };
};

/**
 * タスクロード開始のアクションを作成する
 */
export const createLoadTasksAction = (dispatch: Dispatch): IToggleShowSpinnerAction => {
    // ファイルを非同期で読み込む
    let tasks: ITask[] = [];
    // データファイルの存在チェック
    loadTask().then((jsonData) => {
        // 読み込んだデータで値を表示する
        // 実際にはデータの内容をチェックする必要がある
        tasks = jsonData.data as ITask[];
        dispatch(createShowTasksAction(tasks));
        dispatch<IToggleShowSpinnerAction>({
            type: TOGGLE_SHOW_SPINNER,
        });
    });
    return {
        type: TOGGLE_SHOW_SPINNER,
    };
};