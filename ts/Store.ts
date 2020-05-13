import { combineReducers, createStore } from 'redux';
import { IState } from './IStore';
import { ChatMessageReducer } from './reducers/ChatMessageReducer';
// import { DBReducer } from './reducers/DBReducer';

// 複数の reducer を束ねる
const combinedReducer = combineReducers<IState>({
        chatMessageList: ChatMessageReducer, // 追加
});

// グローバルオブジェクトとして、store を作成する。
const store = createStore(combinedReducer);
// export default store;
