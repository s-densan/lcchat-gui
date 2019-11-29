import Moment from 'moment';
import { ITask } from '../states/ITask';
import {
    ADD_TASK,
    DELETE_TASK,
    IAddTaskAction,
    IDeleteAction,
    IShowTaskAction,
    IToggleCompleteAction,
    SHOW_TASKS,
    TOGGLE_COMPLETE_TASK,
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
        tasks: dummyTasks,
        type: SHOW_TASKS,
    };
};
/**
 * 新しいタスクを作成するアクションを作成する
 * @param taskName 新しいタスクの名前
 * @param deadline 新しいタクスの期限
 */
export const createAddTaskAction = (taskName: string, deadline: Date): IAddTaskAction => {
    return {
        deadline,
        taskName,
        type: ADD_TASK,
    };
};
/**
 * タスクの完了状態を切り替える
 * @param taskId 完了状態を切り替える対象のタスクのID
 */
export const createToggleCompleteAction = (taskId: string): IToggleCompleteAction => {
    return {
        taskId,
        type: TOGGLE_COMPLETE_TASK,
    };
};
/**
 * タスクを削除するアクションを作成する
 * @param taskId 削除するタスクのID
 */
export const createDeleteTaskAction = (taskId: string): IDeleteAction => {
    return {
        taskId,
        type: DELETE_TASK,
    };
};