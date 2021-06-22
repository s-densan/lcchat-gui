import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'redux';
import { useDispatch } from 'react-redux';

import { RootState } from '../slices/RootStore';
// このSystemStateは自分で定義したReduxのStore構成、詳細は割愛します

export type ReduxDispatch = ThunkDispatch<RootState, any, Action>;
export function useReduxDispatch(): ReduxDispatch {
  return useDispatch<ReduxDispatch>();
}
