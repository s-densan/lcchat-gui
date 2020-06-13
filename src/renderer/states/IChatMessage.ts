import { v4 as UUID } from 'uuid';

/**
 * タスク
 */
export interface IChatMessage {
    /** タスクを一意に判断するID (UUID) */
    id: string;
    /** DBで管理するメッセージID */
    messageId: string;
    /** メッセージテキスト */
    text: string;
    /** ユーザID */
    userId: string;
    /** ユーザ名 */
    userName: string;
    /** ユーザアバターテキスト */
    userAvaterText: string;
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
 * @param messageId メッセージID
 * @param text メッセージテキスト
 * @param userId ユーザID
 * @param talkId トークルームID
 * @param postedAt 投稿日
 * @param messageData メッセージデータ
 * @param createdAt 作成日時
 * @param updatedAt 更新日時
 */
export const createChatMessage = (
    messageId: string,
    text: string,
    userId: string,
    userName: string,
    userAvaterText: string,
    talkId: string,
    postedAt: Date,
    messageData: string,
    createdAt: Date | null,
    updatedAt: Date | null,
    deletedAt: Date | null,
): IChatMessage => {
    const id = UUID();
    return {
        createdAt,
        deletedAt,
        id,
        messageData,
        messageId,
        postedAt,
        talkId,
        text,
        updatedAt,
        userId,
        userName,
        userAvaterText,
    };
};
