import { Action } from 'redux';
import { v4 as UUID } from 'uuid';
import { IChatMessage } from '../states/IChatMessageBox';

/**
 * タスクの一覧を表示するアクションタイプ
 */
export const SHOW_TASKS = UUID();
/**
 * タスクの一覧を表示するアクション
 */
export interface IShowTaskAction extends Action {
    chatMessages: IChatMessage[];
}
/**
 * タスクを追加するアクションタイプ
 */
export const ADD_TASK = UUID();
/**
 * チャットメッセージを追加するアクション
 */
export interface IPostChatMessageAction extends Action {
    chatMessageId: string;
    text: string;
    userId: string;
    talkId: string;
    postedAt: Date;
    messageData: string;
}
/**
 * タスク完了のアクションタイプ
 */
export const TOGGLE_COMPLETE_TASK = UUID();

/**
 * タスク完了のアクション
 */
export interface IToggleCompleteAction extends Action {
    chatMessageId: string;
}

/**
 * タスク削除のアクションタイプ
 */
export const DELETE_TASK = UUID();

/**
 * タスク削除のアクション
 */
export interface IDeleteAction extends Action {
    chatMessageId: string;
}
/**
 * タスクロード開始のアクションタイプ
 */
export const TOGGLE_SHOW_SPINNER = UUID();
/**
 * タスクロード開始のアクション
 */
// tslint:disable-next-line:no-empty-interface
export interface IToggleShowSpinnerAction extends Action {
}
