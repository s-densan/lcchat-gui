import { IChatMessage } from '../states/IChatMessage';
import {
    INSERT_CHAT_MESSAGE_TO_DB,
    IInsertChatMessageToDBAction,
} from './DBActions';


/**
 * チャットメセージメニュー表示アクション生成
 * @param chatMessageId チャットメッセージID
 * @returns チャットメッセージ表示アクション
 */
export const createInsertChatMessageToDBAction = (chatMessage: IChatMessage): IInsertChatMessageToDBAction => {
    return {
        chatMessage,
        type: INSERT_CHAT_MESSAGE_TO_DB,
    };
};