import { combineReducers, createStore } from 'redux';
import { TaskReducer } from './reducers/TaskReducer';
import { ITaskState } from './ITaskStore';



// 複数の reducer を束ねる
const combinedReducer = combineReducers<ITaskState>({
        taskList: TaskReducer, // 追加

});

// グローバルオブジェクトとして、store を作成する。
const store = createStore(combinedReducer);
export default store;