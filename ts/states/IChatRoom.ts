/** チャットルーム状態 */
export default interface IChatRoom {
    /** チャットルームID */
    roomId: string;
    /** チャットルーム名 */
    roomName: string;
    /** チャットルームデータ */
    roomData: string;
    /** 作成日時 */
    createdAt: Date | null;
    /** 更新日時 */
    updatedAt: Date | null;
    /** チャットルーム状態 */
    state: ChatRoomStatus;
}

/** チャットルーム状態 */
enum ChatRoomStatus {
    Ready = 'ready',
    Active = 'active',
    Closed = 'closed',
    Other = 'other',
}


/** チャットルーム初期化 */
export const initUser: IChatRoom = {
    roomId: '',
    roomName: '',
    roomData: '',
    createdAt: null,
    updatedAt: null,
    state: ChatRoomStatus.Ready,
};
