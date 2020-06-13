import { Dispatch, Store } from 'redux';
import { IState } from '../IStore';
import { createChatMessage, IChatMessage } from '../states/IChatMessage';
import { deleteMessageDB, loadChatMessage, loadChatMessagesDB, saveStateJson, updateMessageTextDB} from '../utils/ChatDatabaseIF';
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