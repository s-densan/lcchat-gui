import { Action } from 'redux';
import { v4 as UUID } from 'uuid';
import { IChatMessage } from '../states/IChatMessage';

/**
 * チャットメッセージDB追加アクションタイプ
 */
export const SHOW_OK_DIALOG = UUID();
/**
 * チャットメッセージDB追加アクション
 */
export interface IShowOkDialogAction extends Action {
    open: boolean;
    title: string;
    message: string;
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void);
}

