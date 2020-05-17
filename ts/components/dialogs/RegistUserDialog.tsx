import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {hostname} from 'os';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../slices/UserSlice';
import InputDialog from './InputDialog';

interface IProps {
    onClickOk: any;
    onClickCancel: any;
    onClose: any;
    open: boolean;
}

export default function RegistUserDialog(props: IProps) {
  const dispatch = useDispatch();

  const onClickOk = (e: any, inputText: string) => {
      dispatch(userActions.insertUser(inputText));
  };

  return (
    <div>
      <InputDialog
        title="新規ユーザ登録"
        message="ユーザ名を入力してください"
        onClickOk={props.onClickOk}
        onClose={props.onClose}
        onClickCancel={props.onClickCancel}
        open={props.open}
      />
    </div>
  );
}

