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
    /** チャンネルID */
    channelId: string;
    /** 投稿日時 */
    postedAt: string;
    /** メッセージデータ */
    messageData: string;
    /** 作成日時 */
    createdAt: Date;
    /** 更新日時 */
    updatedAt: Date;
    /** 削除日時 */
    deletedAt: Date;
}
/**
 * タスクのリスト
 */
export interface ITaskList {
    /** ローディング表示 */
    shownLoading: boolean; // <- 追加
    /** タスクの一覧 */
    tasks: IChatMessage[];
}
/**
 * タスクのリストの初期値
 */
export const initTaskList: ITaskList = {
    shownLoading: false, // <- 追加
    tasks: [],
};

/**
 * タスクを作成する
 * @param taskName タスク名
 * @param deadline 期限
 */
export const createTask = (taskName: string, deadline: Date): IChatMessage => {
    return {
        complete: false,
        deadline,
        id: UUID(),
        taskName,
    };
};
