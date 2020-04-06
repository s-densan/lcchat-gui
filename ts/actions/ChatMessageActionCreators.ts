import Moment from 'moment';
import { Dispatch, Store } from 'redux';
import uuid from 'uuid';
import { IState } from '../IStore';
import { IChatMessage } from '../states/IChatMessage';
import { loadChatMessage as loadChatMessage, saveState } from '../utils/ChatDatabaseIF';

import {
    IChangeChatMessageInputBoxTextAction,
    DELETE_CHAT_MESSAGE,
    IDeleteAction,
    IPostChatMessageAction,
    IShowChatMessageAction,
    IShowChatMessageMenuAction,
    IToggleCompleteAction,
    IToggleShowSpinnerAction,
    POST_CHAT_MESSAGE,
    SHOW_CHAT_MESSAGES,
    SHOW_CHAT_MESSAGE_MENU,
    TOGGLE_COMPLETE_TASK,
    TOGGLE_SHOW_SPINNER,
    CHANGE_CHAT_MESSAGE_INPUT_BOX_TEXT,
} from './ChatMessageActions';
// import { initTaskList } from '../states/ILcChatMessage';

/**
 * チャットメセージメニュー表示アクション生成
 * @param chatMessageId チャットメッセージID
 * @returns チャットメッセージ表示アクション
 */
export const createShowChatMessageMenuAction = (chatMessageId: string): IShowChatMessageMenuAction => {
    return {
        chatMessageId: chatMessageId,
        type: SHOW_CHAT_MESSAGE_MENU,
    }
}
export const createChangeChatBoxTextAction = (text: string): IChangeChatMessageInputBoxTextAction => {
    return {
        text,
        type: CHANGE_CHAT_MESSAGE_INPUT_BOX_TEXT,
    }
}
/**
 * タスクの表示アクションを作成する
 * @param chatMessages 表示するタスクのリスト
 */
export const createShowChatMessagesAction = (chatMessages: IChatMessage[]): IShowChatMessageAction => {
    return {
        chatMessages,
        type: SHOW_CHAT_MESSAGES,
    };
};

/**
 * 新しいチャットメッセージを投稿するアクションを作成する
 * 非同期処理のため、ディスパッチャへの登録はアクションクリエータで実行する。
 * @param messageId メッセージID
 * @param text メッセージの内容
 * @param userId 投稿したユーザのID
 * @param talkId メッセージが所属するトークのID
 * @param postedAt 投稿日時
 * @param messageData メッセージの詳細データ
 * @param store Storeオブジェクト
 */
export const createPostChatMessageAction =
    (
        messageId: string,
        text: string,
        userId: string,
        talkId: string,
        postedAt: Date,
        messageData: string,
        store: Store<IState>,
    ): IToggleShowSpinnerAction => {
        (async () => {
            const addAction: IPostChatMessageAction = {
                chatMessageId: messageId,
                messageData,
                postedAt,
                talkId,
                text,
                type: POST_CHAT_MESSAGE,
                userId,
            };
            store.dispatch<IPostChatMessageAction>(addAction);
            const chatMessageList = store.getState().chatMessageList;
            // オンにすると真っ白画面。
            await saveState(chatMessageList.chatMessages);
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
 * タスクを削除するアクションを作成する
 * @param chatMessageId 削除するタスクのID
 */
export const createDeleteChatMessageAction =
        (chatMessageId: string, store: Store<IState>): IToggleShowSpinnerAction => {
    (async () => {
        store.dispatch<IDeleteAction>({ chatMessageId, type: DELETE_CHAT_MESSAGE });
        const chatMessageList = store.getState().chatMessageList;
        await saveState(chatMessageList.chatMessages);
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
export const createLoadChatMessagesAction = (dispatch: Dispatch): IToggleShowSpinnerAction => {
    // ファイルを非同期で読み込む
    let chatMessages: IChatMessage[] = [];
    // データファイルの存在チェック
    loadChatMessage().then((jsonData) => {
        // 読み込んだデータで値を表示する
        // 実際にはデータの内容をチェックする必要がある
        chatMessages = jsonData.data as IChatMessage[];
        dispatch(createShowChatMessagesAction(chatMessages));
        dispatch<IToggleShowSpinnerAction>({
            type: TOGGLE_SHOW_SPINNER,
        });
    });
    return {
        type: TOGGLE_SHOW_SPINNER,
    };
};
