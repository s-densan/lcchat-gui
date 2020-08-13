import { v4 as UUID } from 'uuid';
import { IAttachmentData } from './IAttachment';

export interface IAttachmentMessageData {
}
export interface ITextMessageData {
    text: string;
}
export type IChatMessage = ITextMessage | IAttachmentMessage;
export type ITextMessage = IChatMessageBase & {
    type: 'text';
    /** メッセージデータ */
    messageData: ITextMessageData;
};
export type IAttachmentMessage = IChatMessageBase & {
    type: 'attachment';
    /** メッセージデータ */
    messageData: IAttachmentMessageData;
    /** 添付データ */
    attachmentData: IAttachmentData;
};

/**
 * タスク
 */
export interface IChatMessageBase {
    /** タスクを一意に判断するID (UUID) */
    id: string;
    /** DBで管理するメッセージID */
    messageId: string;
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
    /** 作成日時 */
    createdAt: Date | null;
    /** 更新日時 */
    updatedAt: Date | null;
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
 * テキストメッセージを作成する
 * @param messageId メッセージID
 * @param text メッセージテキスト
 * @param userId ユーザID
 * @param talkId トークルームID
 * @param postedAt 投稿日
 * @param createdAt 作成日時
 * @param updatedAt 更新日時
 */
export const createTextMessage = (
    messageId: string,
    text: string,
    userId: string,
    userName: string,
    userAvaterText: string,
    talkId: string,
    postedAt: Date,
    createdAt: Date | null,
    updatedAt: Date | null,
): IChatMessage => {
    const id = UUID();
    return {
        createdAt,
        id,
        type: 'text',
        messageData: {
            text: text,
        },
        messageId,
        postedAt,
        talkId,
        updatedAt,
        userId,
        userName,
        userAvaterText,
    };
};

/**
 * 添付メッセージを作成する
 * @param messageId メッセージID
 * @param attachmentPath 添付ファイルパス
 * @param userId ユーザID
 * @param talkId トークルームID
 * @param postedAt 投稿日
 * @param createdAt 作成日時
 * @param updatedAt 更新日時
 */
export const createAttachmentMessage = (
    messageId: string,
    userId: string,
    userName: string,
    userAvaterText: string,
    talkId: string,
    postedAt: Date,
    attachmentData: IAttachmentData,
    createdAt: Date | null,
    updatedAt: Date | null,
): IAttachmentMessage => {
    const id = UUID();
    return {
        createdAt,
        id,
        type: 'attachment',
        messageData: {
        },
        attachmentData,
        messageId,
        postedAt,
        talkId,
        updatedAt,
        userId,
        userName,
        userAvaterText,
    };
};
