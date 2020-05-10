import { Dispatch, Store } from 'redux';
import { IState } from '../IStore';
import { createChatMessage, IChatMessage } from '../states/IChatMessage';
import store from '../Store';
import { deleteMessageDB, loadChatMessage, loadChatMessagesDB, saveStateJson, updateMessageTextDB} from '../utils/ChatDatabaseIF';

import {
    DELETE_CHAT_MESSAGE,
    IDeleteChatMessageAction,
    IPostChatMessageAction,
    IShowChatMessageAction,
    IShowChatMessageMenuAction,
    IToggleShowSpinnerAction,
    IUpdateChatMessageAction,
    POST_CHAT_MESSAGE,
    SHOW_CHAT_MESSAGE_MENU,
    SHOW_CHAT_MESSAGES,
    TOGGLE_SHOW_SPINNER,
    UPDATE_CHAT_MESSAGE,
} from './ChatMessageActions';
// import { initTaskList } from '../states/ILcChatMessage';

/**
 * チャットメセージメニュー表示アクション生成
 * @param chatMessageId チャットメッセージID
 * @returns チャットメッセージ表示アクション
 */
export const createShowChatMessageMenuAction = (chatMessageId: string): IShowChatMessageMenuAction => {
    return {
        chatMessageId,
        type: SHOW_CHAT_MESSAGE_MENU,
    };
};
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

const SAVE_JSON = false;
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
            // オンにすると真っ白画面。
            // await saveStateJson(chatMessageList.chatMessages);
            const action = {
                type: TOGGLE_SHOW_SPINNER,
            };
            store.dispatch<IToggleShowSpinnerAction>(action);
        })();
        return {
            type: TOGGLE_SHOW_SPINNER,
        };
    };

export const createUpdateChatMessageAction =
    (chatMessageId: string, text: string): IToggleShowSpinnerAction => {
    if (SAVE_JSON) {
        throw new Error('知らんがな');
    } else {
        (async () => {
            store.dispatch<IUpdateChatMessageAction>({ chatMessageId, type: UPDATE_CHAT_MESSAGE, text });
            await updateMessageTextDB(chatMessageId, text);
            store.dispatch<IToggleShowSpinnerAction>({
                type: TOGGLE_SHOW_SPINNER,
            });
        })();
    }
    return {
        type: TOGGLE_SHOW_SPINNER,
    };
};

/**
 * タスクを削除するアクションを作成する
 * @param chatMessageId 削除するタスクのID
 */
export const createDeleteChatMessageAction =
        (chatMessageId: string): IToggleShowSpinnerAction => {
    if (SAVE_JSON) {
        (async () => {
            store.dispatch<IDeleteChatMessageAction>({ chatMessageId, type: DELETE_CHAT_MESSAGE });
            const chatMessageList = store.getState().chatMessageList;
            await saveStateJson(chatMessageList.chatMessages);
            store.dispatch<IToggleShowSpinnerAction>({
                type: TOGGLE_SHOW_SPINNER,
            });
        })();
    } else {
        (async () => {
            store.dispatch<IDeleteChatMessageAction>({ chatMessageId, type: DELETE_CHAT_MESSAGE });
            await deleteMessageDB(chatMessageId);
            store.dispatch<IToggleShowSpinnerAction>({
                type: TOGGLE_SHOW_SPINNER,
            });
        })();
    }
    return {
        type: TOGGLE_SHOW_SPINNER,
    };
};

/**
 * タスクロード開始のアクションを作成する
 */
export const createLoadChatMessagesAction = (dispatch: Dispatch): IToggleShowSpinnerAction => {
    // ファイルを非同期で読み込む
    // データファイルの存在チェック
    if (SAVE_JSON) {
        loadChatMessage().then((jsonData) => {
            // 読み込んだデータで値を表示する
            // 実際にはデータの内容をチェックする必要がある
            const chatMessages = jsonData.data as IChatMessage[];
            dispatch(createShowChatMessagesAction(chatMessages));
            dispatch<IToggleShowSpinnerAction>({
                type: TOGGLE_SHOW_SPINNER,
            });
        });
    } else {
        loadChatMessagesDB().then((mes) => {
            // DB読み込み後に実行する
            const chatMessages: IChatMessage[] = [];
            const chatMessagesJson = JSON.parse(mes);
            for (const chatMessageJson of chatMessagesJson) {
                const chatMessage = createChatMessage(
                    chatMessageJson.message_id,
                    chatMessageJson.text,
                    chatMessageJson.user_id,
                    'dummyTalkId',
                    chatMessageJson.posted_at,
                    chatMessageJson.message_data,
                    chatMessageJson.created_at,
                    chatMessageJson.updated_at,
                    chatMessageJson.deleted_at,
                );
                chatMessages.push(chatMessage);
            }
            dispatch(createShowChatMessagesAction(chatMessages));
            dispatch<IToggleShowSpinnerAction>({
                type: TOGGLE_SHOW_SPINNER,
            });
        });
    }
    return {
        type: TOGGLE_SHOW_SPINNER,
    };
};

/**
 * タスク再ロード開始のアクションを作成する
 */
export const createReloadChatMessagesAction = (dispatch: Dispatch): IToggleShowSpinnerAction => {
    // ファイルを非同期で読み込む
    // データファイルの存在チェック
    if (SAVE_JSON) {
        loadChatMessage().then((jsonData) => {
            // 読み込んだデータで値を表示する
            // 実際にはデータの内容をチェックする必要がある
            const chatMessages = jsonData.data as IChatMessage[];
            dispatch(createShowChatMessagesAction(chatMessages));
            dispatch<IToggleShowSpinnerAction>({
                type: TOGGLE_SHOW_SPINNER,
            });
        });
    } else {
        loadChatMessagesDB().then((mes) => {
            // DB読み込み後に実行する
            const chatMessages: IChatMessage[] = [];
            const chatMessagesJson = JSON.parse(mes);
            for (const chatMessageJson of chatMessagesJson) {
                const chatMessage = createChatMessage(
                    chatMessageJson.message_id,
                    chatMessageJson.text,
                    chatMessageJson.user_id,
                    'dummyTalkId',
                    chatMessageJson.posted_at,
                    chatMessageJson.message_data,
                    chatMessageJson.created_at,
                    chatMessageJson.updated_at,
                    chatMessageJson.deleted_at,
                );
                chatMessages.push(chatMessage);
            }
            dispatch(createShowChatMessagesAction(chatMessages));
            dispatch<IToggleShowSpinnerAction>({
                type: TOGGLE_SHOW_SPINNER,
            });
        });
    }
    return {
        type: TOGGLE_SHOW_SPINNER,
    };
};
