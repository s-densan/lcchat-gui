import Redux from 'redux';

import {
    IShowOkDialogAction, SHOW_OK_DIALOG,
} from '../actions/DialogActions';
import {
    IDialog, initDialogOk,
} from '../states/IDialog';
import createA2RMapper from '../utils/ActionToReducerMapper';

const a2RMapper = createA2RMapper<IDialog>();
/** Reducer  */
export const DialogReducer: Redux.Reducer<IDialog> = (state = initDialogOk, action) => {
    switch (action.type) {
        case SHOW_OK_DIALOG:
            // OK?????????????
            
            
        default:
            return a2RMapper.execute(state, action);
    }
};
