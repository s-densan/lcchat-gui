import { combineReducers, createStore } from 'redux';
import { TaskReducer } from './reducers/TaskReducer';
import { IState } from './IStore';



// 複数の reducer を束ねる
const combinedReducer = combineReducers<IState>({
        taskList: TaskReducer, // 追加

});

// グローバルオブジェクトとして、store を作成する。
const store = createStore(combinedReducer);
export default store;