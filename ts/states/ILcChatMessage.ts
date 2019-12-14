// import { v4 as UUID } from 'uuid';
/**
 * タスク
 */
export interface ILcChatMessage {
    messageId: string;
    text: string;
    userId: string;
    channelId: string;
    postedAt: Date;
    messageData: string;
    createdAt: Date | null;
    updatedAt: Date | null;
    deletedAt: Date | null;
}
/**
 * タスクのリスト
 */
export interface IChatMessageList {
    /** メッセージの一覧 */
    tasks: ILcChatMessage[];
}
/**
 * タスクのリストの初期値
 */
export const initTaskList: IChatMessageList = {
    tasks: [],
};

/**
 * タスクを作成する
 * @param taskName タスク名
 * @param deadline 期限
 */
export const createChatMessage = (
    messageId: string,
    text: string,
    userId: string,
    channelId: string,
    postedAt: Date,
    messageData: string): ILcChatMessage => {
    return {
        channelId,
        createdAt: null,
        deletedAt: null,
        messageData,
        messageId,
        postedAt,
        text,
        updatedAt: null,
        userId,
    };
};
