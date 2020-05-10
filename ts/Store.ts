import { combineReducers, createStore } from 'redux';
import { IState } from './IStore';
import { ChatMessageReducer } from './reducers/ChatMessageReducer';
import { DialogReducer } from './reducers/DialogReducer';
// import { DBReducer } from './reducers/DBReducer';

// 複数の reducer を束ねる
const combinedReducer = combineReducers<IState>({
        chatMessageList: ChatMessageReducer, // 追加
        dialog: DialogReducer,
});

// グローバルオブジェクトとして、store を作成する。
const store = createStore(combinedReducer);
export default store;
