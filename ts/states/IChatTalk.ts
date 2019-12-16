export default interface IChatTalk {
    talkId: string;
    talkName: string;
    roomId: string;
    talkFolderId: string;
    talkData: string;
    /** 作成日時 */
    createdAt: Date | null;
    /** 更新日時 */
    updatedAt: Date | null;
    /** 削除日時 */
    deletedAt: Date | null;
}

export const initChatTalk: IChatTalk = {
    talkId: '',
    talkName: '',
    roomId: '',
    talkFolderId: '',
    talkData: '',
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
};