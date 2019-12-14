import Clone from 'clone';
import Redux from 'redux';

import * as Action from '../actions/TaskActions';
import { createTask, initTaskList, ITaskList } from '../states/ITask';
import createA2RMapper from '../utils/ActionToReducerMapper';

const a2RMapper = createA2RMapper<ITaskList>();

/** タスク一覧を表示する */
a2RMapper.addWork<Action.IShowTaskAction>(
    Action.SHOW_TASKS,
    (state, action) => {
        state.tasks = Clone(action.tasks);
    },
);

/** タスクを追加する */
a2RMapper.addWork<Action.IAddTaskAction>(
    Action.ADD_TASK,
    (state, action) => {
        state.tasks.push(createTask(action.taskName, action.deadline));
    },
);

/** タスクを完了/未完了を切り替える */
a2RMapper.addWork<Action.IToggleCompleteAction>(
    Action.TOGGLE_COMPLETE_TASK,
    (state, action) => {
        const {tasks} = state;
        // 上記は下記と同じ意味
        // const tasks = state.tasks
        const target = tasks.find((it) => it.id === action.taskId);
        if (!target) { return; }
        target.complete = !target.complete;
    },
);

/** タスクを削除する */
a2RMapper.addWork<Action.IDeleteAction>(
    Action.DELETE_TASK,
    (state, action) => {
        const {tasks} = state;
        const target = tasks.find((it) => it.id === action.taskId);
        if (!target) { return; }
        // 指定したID以外のオブジェクトを抽出し、それを新しいリストとする
        state.tasks = tasks.filter((it) => it.id !== action.taskId);
    },
);
/** Reducer 本体 */
export const TaskReducer: Redux.Reducer<ITaskList> = (state = initTaskList, action) => {
    return a2RMapper.execute(state, action);
};
