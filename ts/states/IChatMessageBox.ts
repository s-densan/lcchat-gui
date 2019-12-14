import { v4 as UUID } from 'uuid';
/**
 * タスク
 */
export interface IChatMessage {
    /** タスクを一意に判断するID (UUID) */
    id: string;
    /** メッセージID */
    messageId: string;
    /** メッセージテキスト */
    text: string;
    /** ユーザID */
    userId: string;
    /** トークID */
    talkId: string;
    /** 投稿日時 */
    postedAt: Date;
    /** メッセージデータ */
    messageData: string;
    /** 作成日時 */
    createdAt: Date | null;
    /** 更新日時 */
    updatedAt: Date | null;
    /** 削除日時 */
    deletedAt: Date | null;
}
/**
 * メッセージのリスト
 */
export interface IChatMessageList {
    /** タスクの一覧 */
    chatMessages: IChatMessage[];
}
/**
 * メッセージのリストの初期値
 */
export const initChatMessageList: IChatMessageList = {
    chatMessages: [],
};

/**
 * メッセージを作成する
 * @param id メッセージを一意に判断するID
 * @param messageId メッセージID
 * @param text メッセージテキスト 
 * @param userId ユーザID
 */
export const createChatMessage = (
    id: string,
    messageId: string,
    text: string,
    userId: string,
    talkId: string,
    postedAt: Date,
    messageData: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    deletedAt: Date | null,
    ): IChatMessage => {
    return {
        id: id,
        messageId: messageId,
        text: text,
        userId: userId,
        talkId: talkId,
        postedAt: postedAt,
        messageData: messageData,
        createdAt: createdAt,
        updatedAt: updatedAt,
        deletedAt: deletedAt,
    };
};
