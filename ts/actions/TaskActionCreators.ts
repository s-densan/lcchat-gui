import Moment from 'moment';
import { Dispatch, Store } from 'redux';
import { IState } from '../IStore';
import { ITask } from '../states/ITask';
import { loadTask, saveState, tes } from '../utils/TaskFileIF';
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
    // 確認のため、ダミーデータをハードコーディングする
    const dummyTasks: ITask[] = [
        {
            complete: false,
            deadline: Moment().add(1, 'day').toDate(),
            id: '0',
            taskName: 'task01',
        },
        {
            complete: true,
            deadline: Moment().add(1, 'day').toDate(),
            id: '1',
            taskName: 'task02',
        },
        {
            complete: false,
            deadline: Moment().add(-1, 'day').toDate(),
            id: '2',
            taskName: 'task03',
        },
        {
            complete: true,
            deadline: Moment().add(-1, 'day').toDate(),
            id: '3',
            taskName: 'task04',
        },
    ];
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
    (taskName: string, deadline: Date, store: Store<IState>): IToggleShowSpinnerAction => {
        (async () => {
            const addAction: IAddTaskAction = {
                deadline,
                taskName,
                type: ADD_TASK,
            };
            store.dispatch(addAction);
            const taskList = store.getState().taskList;
            // オンにすると真っ白画面。
            // await tes();

            // await saveState(taskList.tasks);
            const action = {
                type: TOGGLE_SHOW_SPINNER,
            };
            store.dispatch<IToggleShowSpinnerAction>(action);
        })();
        return {
            type: TOGGLE_SHOW_SPINNER,
        };
    };

/**
 * 新しいタスクを作成するアクションを作成する
 * @param taskName 新しいタスクの名前
 * @param deadline 新しいタクスの期限
 */
/*
export const createAddTaskAction = (taskName: string, deadline: Date): IAddTaskAction => {
    return {
        deadline,
        taskName,
        type: ADD_TASK,
    };
};
*/

/**
 * タスクの完了状態を切り替える
 * @param taskId 完了状態を切り替える対象のタスクのID
 */
export const createToggleCompleteAction =
    (taskId: string, store: Store<IState>): IToggleShowSpinnerAction => {
        (async () => {
            store.dispatch<IToggleCompleteAction>({
                taskId,
                type: TOGGLE_COMPLETE_TASK,
            });
            const taskList = store.getState().taskList;
            //await saveState(taskList.tasks);
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
export const createDeleteTaskAction = (taskId: string, store: Store<IState>): IToggleShowSpinnerAction => {
    (async () => {
        store.dispatch<IDeleteAction>({ taskId, type: DELETE_TASK });
        const taskList = store.getState().taskList;
        // await saveState(taskList.tasks);
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
    //loadTask().then((jsonData) => {
        // 読み込んだデータで値を表示する
        // 実際にはデータの内容をチェックする必要がある
        // tasks = jsonData.data as ITask[];
        // dispatch(createShowTasksAction(tasks));
        // dispatch<IToggleShowSpinnerAction>({
            // type: TOGGLE_SHOW_SPINNER,
        // });
    //});
    return {
        type: TOGGLE_SHOW_SPINNER,
    };
};