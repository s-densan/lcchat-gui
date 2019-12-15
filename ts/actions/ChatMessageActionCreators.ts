import Moment from 'moment';
import { Dispatch, Store } from 'redux';
import { IState } from '../IStore';
import { IChatMessage } from '../states/IChatMessageBox';
import { loadTask as loadChatMessage, saveState } from '../utils/TaskFileIF';
import {
    ADD_TASK as ADD_CHAT_MESSAGE,
    DELETE_TASK as DELETE_CHAT_MESSAGE,
    IPostChatMessageAction as IAddChatMessageAction,
    IDeleteAction,
    IShowTaskAction as IShowChatMessageAction,
    IToggleCompleteAction,
    IToggleShowSpinnerAction,
    SHOW_TASKS as SHOW_CHAT_MESSAGES,
    TOGGLE_COMPLETE_TASK,
    TOGGLE_SHOW_SPINNER,
} from './ChatMessageActions';
import uuid from 'uuid';
import { initTaskList } from '../states/ILcChatMessage';

/**
 * タスクの表示アクションを作成する
 * @param chatMessages 表示するタスクのリスト
 */
export const createShowChatMessagesAction = (chatMessages: IChatMessage[]): IShowChatMessageAction => {
    // 確認のため、ダミーデータをハードコーディングする
    const dummyChatMessages: IChatMessage[] = [
        {
            id: '0',
            messageId: 'm123456',
            text: 'こんにちは',
            userId: 'u123456',
            talkId: 't123456',
            postedAt: new Date(Date.now()),
            messageData: 'task01',
            createdAt: null,
            updatedAt: null,
            deletedAt: null,
        },
        {
            id: '1',
            messageId: 'm123457',
            text: 'こんにちは2',
            userId: 'u123456',
            talkId: 't123456',
            postedAt: new Date(Date.now()),
            messageData: 'task01',
            createdAt: null,
            updatedAt: null,
            deletedAt: null,
        },
        {
            id: '2',
            messageId: 'm123458',
            text: 'こんにちは3',
            userId: 'u123456',
            talkId: 't123456',
            postedAt: new Date(Date.now()),
            messageData: 'task01',
            createdAt: null,
            updatedAt: null,
            deletedAt: null,
        },
    ];
    return {
        // tasks, // 本来はこっち
        chatMessages: chatMessages,
        type: SHOW_CHAT_MESSAGES,
    };
};

/**
 * 新しいタスクを作成するアクションを作成する
 * @param text 新しいタスクの名前
 * @param postedAt 新しいタクスの期限
 */
export const createPostChatMessageAction =
    (
        messageId: string,
        text: string,
        userId: string,
        talkId: string,
        postedAt: Date,
        messageData: string,
        store: Store<IState>
    ): IToggleShowSpinnerAction => {
        (async () => {
            const addAction: IAddChatMessageAction = {
                chatMessageId: messageId,
                text: text,
                userId: userId,
                talkId: talkId,
                postedAt: postedAt,
                messageData: messageData,
                type: ADD_CHAT_MESSAGE,
            };
            store.dispatch(addAction);
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
export const createDeleteChatMessageAction = (chatMessageId: string, store: Store<IState>): IToggleShowSpinnerAction => {
    (async () => {
        store.dispatch<IDeleteAction>({ chatMessageId: chatMessageId, type: DELETE_CHAT_MESSAGE });
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