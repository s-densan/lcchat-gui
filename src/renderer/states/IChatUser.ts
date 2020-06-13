export default interface IChatUser {
    userId: string;
    userName: string;
    userData: string;
    /** 作成日時 */
    createdAt: Date | null;
    /** 更新日時 */
    updatedAt: Date | null;
    /** 削除日時 */
    deletedAt: Date | null;
}

export const initChatUser: IChatUser = {
    userId: '',
    userName: '',
    userData: '',
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
};