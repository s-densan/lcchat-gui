export default interface IChatTalkFolder {
    talkFolderId: string;
    talkFolderName: string;
    parentTalkFolderId: string;
    talkFolderData: string;
    /** 作成日時 */
    createdAt: Date | null;
    /** 更新日時 */
    updatedAt: Date | null;
    /** 削除日時 */
    deletedAt: Date | null;
}

export const initChatFolder: IChatTalkFolder = {
    talkFolderId: '',
    talkFolderName: '',
    parentTalkFolderId: '',
    talkFolderData: '',
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
};
