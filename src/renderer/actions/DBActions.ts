import { Action } from 'redux';
import { v4 as UUID } from 'uuid';
import { IChatMessage } from '../states/IChatMessage';

/**
 * チャットメッセージDB追加アクションタイプ
 */
export const INSERT_CHAT_MESSAGE_TO_DB = UUID();
/**
 * チャットメッセージDB追加アクション
 */
export interface IInsertChatMessageToDBAction extends Action {
    chatMessage: IChatMessage;
}
