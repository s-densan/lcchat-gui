import { Action } from 'redux';
import { v4 as UUID } from 'uuid';
import { IChatMessage } from '../states/IChatMessage';

/**
 * タスクの一覧を表示するアクションタイプ
 */
export const SHOW_CHAT_MESSAGES = UUID();
/**
 * タスクの一覧を表示するアクション
 */
export interface IShowChatMessageAction extends Action {
    chatMessages: IChatMessage[];
}
/**
 * タスクを追加するアクションタイプ
 */
export const POST_CHAT_MESSAGE = UUID();
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
 * チャットメニューを表示するアクション
 */
export interface IShowChatMessageMenuAction extends Action {
    chatMessagesId: string;
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
export const DELETE_CHAT_MESSAGE = UUID();

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
