import { v4 as UUID } from 'uuid';
import Redux from 'redux';

/**
 * スクロール
 */
export const SCROLL_TO_BOTTOM_ACTION = UUID();
/**
 * 画面下部までスクロールするアクション
 */
export interface IScrollToBottomAction extends Redux.Action {
    bottomRef: React.RefObject<HTMLDivElement>;
}

export const createScrollToBottomAction:Redux.ActionCreator<IScrollToBottomAction> = (bottomRef: React.RefObject<HTMLDivElement>) => {
    return {
        bottomRef: bottomRef,
        type: SCROLL_TO_BOTTOM_ACTION,
    };
}
