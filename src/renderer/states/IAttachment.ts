import { v4 as UUID } from 'uuid';

export interface IAttachmentData {
    // ファイルタイプ
    fileType: string;
    // 添付者ID
    createUserId: string;
    // 添付者名
    createUserName: string;
    // 添付コンピュータ名
    sourceComputerName: string;
    // 元ファイルパス
    sourceFilePath: string;
}

/**
 * タスク
 */
export interface IAttachment {
    /** 画面上で一意に判断するID (UUID) */
    id: string;
    /** DBで管理する添付ID */
    attachmentId: string;
    /** メッセージID */
    messageId: string;
    /** ユーザID */
    userId: string;
    /** 添付データ */
    attachmentData: IAttachmentData;
    /** 作成日時 */
    createdAt: Date | null;
    /** 更新日時 */
    updatedAt: Date | null;
}

/**
 * 添付ファイルを作成する
 * @param attachmentId メッセージID
 * @param messgeId メッセージテキスト
 * @param userId ユーザID
 * @param talkId トークルームID
 * @param postedAt 投稿日
 * @param createdAt 作成日時
 * @param updatedAt 更新日時
 */
export const createAttachment = (
    attachmentId: string,
    messageId: string,
    fileType: string,
    userId: string,
    userName: string,
    sourceComputerName: string,
    sourceFilePath: string,
    createdAt: Date | null,
    updatedAt: Date | null,
): IAttachment => {
    const id = UUID();
    return {
        /** 画面上で一意に判断するID (UUID) */
        id,
        /** DBで管理する添付ID */
        attachmentId,
        /** メッセージID */
        messageId,
        /** ユーザID */
        userId,
        /** 添付データ */
        attachmentData: {
            // ファイルタイプ
            fileType,
            // 添付者ID
            createUserId: userId,
            // 添付者名
            createUserName: userName,
            // 添付コンピュータ名
            sourceComputerName: sourceComputerName,
            // 元ファイルパス
            sourceFilePath,
        },
        /** 作成日時 */
        createdAt,
        /** 更新日時 */
        updatedAt,
    };
};
