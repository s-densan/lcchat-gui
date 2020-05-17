import { createSlice, CaseReducer, AnyAction } from '@reduxjs/toolkit';

// ダイアログの状態
interface IDialogState {
    dialogData:
      // OKダイアログ
      | IOkDialogState
      // 入力ダイアログ
      | IInputDialogState
      // 非表示
      | undefined;
  }

interface ICommonDialog {
  name: string;
  message: string;
  onClickOk: any;
  onClose: any;
  open: boolean;
  title: string;
}

export type IOkDialogState = {
  type: 'ok';
} & ICommonDialog;

export type IInputDialogState = {
  onClickCancel: any;
  type: 'input';
} & ICommonDialog;

// Stateの初期状態
const initialState: IDialogState = {dialogData: undefined};

const defaultOnClick = () => { };

const openOkDialog: any = (state: IDialogState, action: AnyAction) => {
  const res = {
    message: action.payload.message,
    name: action.payload.name,
    onClickOk: action.payload.onClick === undefined ? defaultOnClick : action.payload.onClick,
    onClose: action.payload.onClose === undefined ? defaultOnClick : action.payload.onClose,
    open: true,
    title: action.payload.title,
  };
  return res;
};

// Sliceを生成する
const slice = createSlice({
  initialState,
  name: 'dialog',
  reducers: {
    openOkDialog: (state: IDialogState, action) => {
      const res: IOkDialogState = {
        message: action.payload.message,
        name: action.payload.name,
        onClickOk: action.payload.onClick === undefined ? defaultOnClick : action.payload.onClick,
        onClose: action.payload.onClose === undefined ? defaultOnClick : action.payload.onClose,
        open: true,
        title: action.payload.title,
        type: 'ok',
      };
      return {dialogData: res};
    },
    // tslint:disable-next-line: object-literal-sort-keys
    openInputDialog: (state: IDialogState, action) => {
      const res: IInputDialogState = {
          message: action.payload.message,
          name: action.payload.name,
          onClickCancel: action.payload.onClick === undefined ? defaultOnClick : action.payload.onClick,
          onClickOk: action.payload.onClick === undefined ? defaultOnClick : action.payload.onClick,
          onClose: action.payload.onClose === undefined ? defaultOnClick : action.payload.onClose,
          open: true,
          title: action.payload.title,
          type: 'input',
      };
      return {dialogData: res};
    },
    closeDialog: () => {
      return {dialogData: undefined};
    },
  },
});

// Action Creatorsをエクスポートする
export const dialogActions = slice.actions;
// Reducerをエクスポートする
export const dialogReducer = slice.reducer;
