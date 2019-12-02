import { v4 as UUID } from 'uuid';
/**
 * タスク
 */
export interface IChatMessage {
    /** 完了フラグ */
    complete: boolean;
    /** 期限 */
    deadline: Date;
    /** タスクを一意に判断するID (UUID) */
    id: string;
    /** タスクの名前 */
    taskName: string;
}
/**
 * タスクのリスト
 */
export interface IChatMessageList {
    /** ローディング表示 */
    shownLoading: boolean; // <- 追加
    /** タスクの一覧 */
    tasks: IChatMessage[];
}
/**
 * タスクのリストの初期値
 */
export const initTaskList: IChatMessageList = {
    shownLoading: false, // <- 追加
    tasks: [],
};

/**
 * タスクを作成する
 * @param taskName タスク名
 * @param deadline 期限
 */
export const createChatMessage = (taskName: string, deadline: Date): IChatMessage => {
    return {
        complete: false,
        deadline,
        id: UUID(),
        taskName,
    };
};

