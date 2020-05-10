import { IChatMessageList } from './states/IChatMessage';
import { IDialogOk } from './states/IDialog';
/**
 * store のデータ型を定義する。（親state）
 *
 * プロパティには、管理する child_state を指定する
 */
export interface IState {
    chatMessageList: IChatMessageList;
    dialog: IDialogOk;
    // state が増えたら足していく
}