import Moment from 'moment';
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css'; // (1)
import Styled from 'styled-components';
import { v4 as UUID } from 'uuid';

import { createPostChatMessageAction } from '../actions/ChatMessageActionCreators';
import store from '../Store';
import { $COLOR_SECONDARY_1_3 } from './FoundationStyles';

/**
 * コンポーネント プロパティ
 *
 * ここでは、初期値として扱う
 */
interface IProps {
    /** テキスト */
    text: string;
}
interface ILocalState {
    /** テキスト */
    text: string;
    /** 投稿日時 */
    postedAt: Date;
}

//#region styled
const Container = Styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    margin: 1em 0;
    width: 100%;
`;

const TextBox = Styled.input`
    box-sizing: border-box;
    width: 100%;
`;

const TaskNameBox = Styled.p`
    flex-grow: 1;
`;

const DeadlineBox = Styled.div`
`;

const AddButton = Styled.button`
    background-color: ${$COLOR_SECONDARY_1_3};
    border-radius: 50%;
    color: white;
    display: block;
    font-size: 150%;
    height: 40px;
    padding: 0;
    width: 40px;
`;

//#endregion

export class AddChatMessage extends React.Component<IProps, ILocalState> {
    public constructor(props: IProps) {
        super(props);
        this.state = {
            postedAt: new Date(),
            text: props.text,
        };
    }

    public render() {
        const date = Moment(this.state.postedAt);
        const taskNameId = UUID();
        const deadlineId = UUID();
        return (
            <Container>
                <TaskNameBox>
                    <label htmlFor={taskNameId}>task name</label>
                    <TextBox id={taskNameId} type="text" value={this.state.text}
                        onChange={this.onChangeTaskName /*← 変更*/} />
                </TaskNameBox>
                <AddButton onClick={this.onClickAdd}>+</AddButton>
            </Container>
        );
    /*
    <DeadlineBox>
        <label htmlFor={deadlineId}>dead line</label>
        <DatePicker selected={date} showTimeSelect={true}
            dateFormat="YYYY-MM-DD HH:mm" onChange={this.onChangeDeadLine} />
    </DeadlineBox>
    */
    }

    /**
     * 追加ボタンを押すと、タスク一覧にタスクを追加する
     */
    private onClickAdd = (e: React.MouseEvent) => {
        store.dispatch(createPostChatMessageAction(
            'messageId',
            'text',
            'userId',
            'taskId',
            new Date(),
            'messageData',
            store,
            ));
        const m = Moment(new Date()).add(1, 'days');
        this.setState({
            postedAt: m.toDate(),
            text: '',
        });
    }
    /**
     * タスク名変更イベントハンドラ
     *
     * テキストボックスの内容をローカルステートに反映する
     */
    private onChangeTaskName = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            text: e.target.value,
        });
    }

}