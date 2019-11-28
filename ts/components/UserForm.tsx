import React from 'react';
import { connect, MapStateToPropsParam } from 'react-redux'; // 追加
import IUser from '../states/IUser';
import store, { IState } from '../UserStore'; // 変更
import { TextBox } from './TextBox';
import { createChangeUserNameAction } from '../actions/UserNameEvents'; // 追加

/**
 * ユーザー名を入力して表示する
 */
class UserForm extends React.Component<IUser, {}> { // --(a)
    public render() {
        return (
            <div>
                <p>
                    <TextBox label="ユーザー名" type="text" value={this.props.name}
                        onChangeText={this.onChangeText} /> {/* --(b) */}
                </p>
                <p>名前: {this.props.name}</p>
            </div>
        );
    }

    private onChangeText = (value: string) => { // --(c)
        // action や store ができてから書く
        store.dispatch(createChangeUserNameAction(value));
    }
}
// 追加 -->
const mapStateToProps = (state: IState) => { // --(a)
    return state.User;
};
export default connect(mapStateToProps)(UserForm); // --(b)
// <- 追加