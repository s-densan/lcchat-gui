import actionCreatorFactory, { ActionCreator, Success, Failure } from 'typescript-fsa';

const actionCreator = actionCreatorFactory();

const submit =
  actionCreator.async<{}, {}, {}>('ACTIONS_SUBMIT')

export interface HogeAsyncActions {
  startLogin: ActionCreator<{}>;
  failedLogin: ActionCreator<Failure<{}, {}>>;
  doneLogin: ActionCreator<Success<{}, {}>>;
}

export const hogeAsyncActions = {
  startLogin: submit.started,
  failedLogin: submit.failed,
  doneLogin: submit.done
}
