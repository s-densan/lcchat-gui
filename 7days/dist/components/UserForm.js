"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux"); // 追加
var Store_1 = __importDefault(require("../Store")); // 変更
var TextBox_1 = require("./TextBox");
var UserNameEvents_1 = require("../actions/UserNameEvents"); // 追加
/**
 * ユーザー名を入力して表示する
 */
var UserForm = /** @class */ (function (_super) {
    __extends(UserForm, _super);
    function UserForm() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onChangeText = function (value) {
            // action や store ができてから書く
            Store_1.default.dispatch(UserNameEvents_1.createChangeUserNameAction(value));
        };
        return _this;
    }
    UserForm.prototype.render = function () {
        return (react_1.default.createElement("div", null,
            react_1.default.createElement("p", null,
                react_1.default.createElement(TextBox_1.TextBox, { label: "\u30E6\u30FC\u30B6\u30FC\u540D", type: "text", value: this.props.name, onChangeText: this.onChangeText }),
                " "),
            react_1.default.createElement("p", null,
                "\u540D\u524D: ",
                this.props.name)));
    };
    return UserForm;
}(react_1.default.Component));
// 追加 -->
var mapStateToProps = function (state) {
    return state.User;
};
exports.default = react_redux_1.connect(mapStateToProps)(UserForm); // --(b)
// <- 追加
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckZvcm0uanMiLCJzb3VyY2VSb290IjoiLi90c3gvIiwic291cmNlcyI6WyJjb21wb25lbnRzL1VzZXJGb3JtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxnREFBMEI7QUFDMUIsMkNBQTRELENBQUMsS0FBSztBQUVsRSxtREFBeUMsQ0FBQyxLQUFLO0FBQy9DLHFDQUFvQztBQUNwQyw0REFBdUUsQ0FBQyxLQUFLO0FBRTdFOztHQUVHO0FBQ0g7SUFBdUIsNEJBQTBCO0lBQWpEO1FBQUEscUVBaUJDO1FBSlcsa0JBQVksR0FBRyxVQUFDLEtBQWE7WUFDakMsMEJBQTBCO1lBQzFCLGVBQUssQ0FBQyxRQUFRLENBQUMsMkNBQTBCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUN0RCxDQUFDLENBQUE7O0lBQ0wsQ0FBQztJQWhCVSx5QkFBTSxHQUFiO1FBQ0ksT0FBTyxDQUNIO1lBQ0k7Z0JBQ0ksOEJBQUMsaUJBQU8sSUFBQyxLQUFLLEVBQUMsZ0NBQU8sRUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFDckQsWUFBWSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUk7b0JBQ3ZDO1lBQ0o7O2dCQUFRLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFLLENBQzFCLENBQ1QsQ0FBQztJQUNOLENBQUM7SUFNTCxlQUFDO0FBQUQsQ0FBQyxBQWpCRCxDQUF1QixlQUFLLENBQUMsU0FBUyxHQWlCckM7QUFDRCxTQUFTO0FBQ1QsSUFBTSxlQUFlLEdBQUcsVUFBQyxLQUFhO0lBQ2xDLE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQztBQUN0QixDQUFDLENBQUM7QUFDRixrQkFBZSxxQkFBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUTtBQUMzRCxRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHsgY29ubmVjdCwgTWFwU3RhdGVUb1Byb3BzUGFyYW0gfSBmcm9tICdyZWFjdC1yZWR1eCc7IC8vIOi/veWKoFxyXG5pbXBvcnQgSVVzZXIgZnJvbSAnLi4vc3RhdGVzL0lVc2VyJztcclxuaW1wb3J0IHN0b3JlLCB7IElTdGF0ZSB9IGZyb20gJy4uL1N0b3JlJzsgLy8g5aSJ5pu0XHJcbmltcG9ydCB7IFRleHRCb3ggfSBmcm9tICcuL1RleHRCb3gnO1xyXG5pbXBvcnQgeyBjcmVhdGVDaGFuZ2VVc2VyTmFtZUFjdGlvbiB9IGZyb20gJy4uL2FjdGlvbnMvVXNlck5hbWVFdmVudHMnOyAvLyDov73liqBcclxuXHJcbi8qKlxyXG4gKiDjg6bjg7zjgrbjg7zlkI3jgpLlhaXlipvjgZfjgabooajnpLrjgZnjgotcclxuICovXHJcbmNsYXNzIFVzZXJGb3JtIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PElVc2VyLCB7fT4geyAvLyAtLShhKVxyXG4gICAgcHVibGljIHJlbmRlcigpIHtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPHA+XHJcbiAgICAgICAgICAgICAgICAgICAgPFRleHRCb3ggbGFiZWw9XCLjg6bjg7zjgrbjg7zlkI1cIiB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnByb3BzLm5hbWV9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlVGV4dD17dGhpcy5vbkNoYW5nZVRleHR9IC8+IHsvKiAtLShiKSAqL31cclxuICAgICAgICAgICAgICAgIDwvcD5cclxuICAgICAgICAgICAgICAgIDxwPuWQjeWJjToge3RoaXMucHJvcHMubmFtZX08L3A+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZVRleHQgPSAodmFsdWU6IHN0cmluZykgPT4geyAvLyAtLShjKVxyXG4gICAgICAgIC8vIGFjdGlvbiDjgoQgc3RvcmUg44GM44Gn44GN44Gm44GL44KJ5pu444GPXHJcbiAgICAgICAgc3RvcmUuZGlzcGF0Y2goY3JlYXRlQ2hhbmdlVXNlck5hbWVBY3Rpb24odmFsdWUpKTtcclxuICAgIH1cclxufVxyXG4vLyDov73liqAgLS0+XHJcbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZTogSVN0YXRlKSA9PiB7IC8vIC0tKGEpXHJcbiAgICByZXR1cm4gc3RhdGUuVXNlcjtcclxufTtcclxuZXhwb3J0IGRlZmF1bHQgY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMpKFVzZXJGb3JtKTsgLy8gLS0oYilcclxuLy8gPC0g6L+95YqgIl19