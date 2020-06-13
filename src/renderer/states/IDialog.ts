export interface IDialogOk {
    open: boolean;
    title: string;
    message: string;
    onClick: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void);
    onClose: ((event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void);
}

export const initDialogOk: IDialogOk = {
    open: false,
    title: '',
    message: '',
    onClick: (e) => {},
    onClose: (e, reason) => {},
};

type IDialog = IDialogOk;
