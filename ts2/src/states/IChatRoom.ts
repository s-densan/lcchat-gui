export default interface IChatRoom {
    roomId: string;
    roomName: string;
    roomData: string;
    /** 作成日時 */
    createdAt: Date | null;
    /** 更新日時 */
    updatedAt: Date | null;
    /** 削除日時 */
    deletedAt: Date | null;
}

export const initUser: IChatRoom = {
    roomId: '',
    roomName: '',
    roomData: '',
    createdAt: null,
    updatedAt: null,
    deletedAt: null,
};
