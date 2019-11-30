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
var react_1 = __importDefault(require("react")); // --(a);
/**
 * ラベル付きのテキストボックスを提供する
 */
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    function TextBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 値を変更したら、store.dispatch で action を reducer に渡して、state を更新する。
        // state が更新されたら component の prop が更新され、再レンダリングされ、テキストボックスの内容が変更される。
        _this.onChangeText = function (e) {
            _this.props.onChangeText(e.target.value);
        };
        return _this;
    }
    // DOMエレメントをレンダリングする
    TextBox.prototype.render = function () {
        // ラベルが設定されていない場合は、 label を出力しない
        var label = (!!this.props.label) ?
            react_1.default.createElement("label", null,
                "ff",
                this.props.label) :
            null; // --(d)
        return (react_1.default.createElement("span", null,
            label /* --(e) */,
            react_1.default.createElement("input", { name: "username", type: this.props.type, value: this.props.value, onChange: this.onChangeText }),
            " "));
    };
    return TextBox;
}(react_1.default.Component));
exports.TextBox = TextBox;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dEJveC5qcyIsInNvdXJjZVJvb3QiOiIuL3RzeC8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvVGV4dEJveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQTBCLENBQUMsU0FBUztBQWNwQzs7R0FFRztBQUNIO0lBQTZCLDJCQUEyQjtJQUF4RDtRQUFBLHFFQXNCQztRQU5HLDhEQUE4RDtRQUM5RCxvRUFBb0U7UUFDNUQsa0JBQVksR0FBRyxVQUFDLENBQXNDO1lBQzFELEtBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFBOztJQUVMLENBQUM7SUFyQkcsb0JBQW9CO0lBQ2Isd0JBQU0sR0FBYjtRQUNJLGdDQUFnQztRQUNoQyxJQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDaEM7O2dCQUFVLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFTLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsQ0FBQyxRQUFRO1FBQ2xCLE9BQU8sQ0FDSDtZQUVLLEtBQUssQ0FBQyxXQUFXO1lBQ2xCLHlDQUFPLElBQUksRUFBQyxVQUFVLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDakUsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQUk7Z0JBQ2hDLENBQ1YsQ0FBQztJQUNOLENBQUM7SUFPTCxjQUFDO0FBQUQsQ0FBQyxBQXRCRCxDQUE2QixlQUFLLENBQUMsU0FBUyxHQXNCM0M7QUF0QlksMEJBQU8iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnOyAvLyAtLShhKTtcclxuXHJcbi8vIOimquOCs+ODs+ODneODvOODjeODs+ODiOOBi+OCiea4oeOBleOCjOOCi+ODl+ODreODkeODhuOCo+OCkuWumue+qeOBmeOCiyAvLyAtLShiKVxyXG5pbnRlcmZhY2UgSVByb3BzIHtcclxuICAgIC8vIOODqeODmeODq+aWh+Wtl+WIl1xyXG4gICAgbGFiZWw6IHN0cmluZztcclxuICAgIC8vIOODhuOCreOCueODiOODnOODg+OCr+OCueOBruOCv+OCpOODl1xyXG4gICAgdHlwZTogJ3RleHQnIHwgYHBhc3N3b3JkYDtcclxuICAgIC8vIOODhuOCreOCueODiOODnOODg+OCr+OCueOBq+ihqOekuuOBmeOCi+WApFxyXG4gICAgdmFsdWU6IHN0cmluZztcclxuICAgIC8vIOWApOOBrueiuuWumuaZguOBq+OBneOBruWApOOCkuimquODl+ODreODkeODhuOCo+OBjOWPluW+l+OBmeOCi+OBn+OCgeOBq+OCs+ODvOODq+ODkOODg+OCr+mWouaVsOOCkuaPkOS+m+OBmeOCi1xyXG4gICAgb25DaGFuZ2VUZXh0OiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcclxufVxyXG5cclxuLyoqXHJcbiAqIOODqeODmeODq+S7mOOBjeOBruODhuOCreOCueODiOODnOODg+OCr+OCueOCkuaPkOS+m+OBmeOCi1xyXG4gKi9cclxuZXhwb3J0IGNsYXNzIFRleHRCb3ggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8SVByb3BzLCB7fT4geyAvLyAtLShjKVxyXG4gICAgLy8gRE9N44Ko44Os44Oh44Oz44OI44KS44Os44Oz44OA44Oq44Oz44Kw44GZ44KLXHJcbiAgICBwdWJsaWMgcmVuZGVyKCkge1xyXG4gICAgICAgIC8vIOODqeODmeODq+OBjOioreWumuOBleOCjOOBpuOBhOOBquOBhOWgtOWQiOOBr+OAgSBsYWJlbCDjgpLlh7rlipvjgZfjgarjgYRcclxuICAgICAgICBjb25zdCBsYWJlbCA9ICghIXRoaXMucHJvcHMubGFiZWwpID9cclxuICAgICAgICAgICAgPGxhYmVsPmZme3RoaXMucHJvcHMubGFiZWx9PC9sYWJlbD4gOlxyXG4gICAgICAgICAgICBudWxsOyAvLyAtLShkKVxyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxzcGFuPlxyXG4gICAgICAgICAgICAgICAgey8qIHt9IOOBp+WbsuOCgOOBqCBKYXZhU2NyaXB0IOOBruOCs+ODvOODieOBjOabuOOBkeOCiyAqL31cclxuICAgICAgICAgICAgICAgIHtsYWJlbCAvKiAtLShlKSAqL31cclxuICAgICAgICAgICAgICAgIDxpbnB1dCBuYW1lPVwidXNlcm5hbWVcIiB0eXBlPXt0aGlzLnByb3BzLnR5cGV9IHZhbHVlPXt0aGlzLnByb3BzLnZhbHVlfVxyXG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXt0aGlzLm9uQ2hhbmdlVGV4dH0gLz4gey8qIC0tKGYpICovfVxyXG4gICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIC8vIOWApOOCkuWkieabtOOBl+OBn+OCieOAgXN0b3JlLmRpc3BhdGNoIOOBpyBhY3Rpb24g44KSIHJlZHVjZXIg44Gr5rih44GX44Gm44CBc3RhdGUg44KS5pu05paw44GZ44KL44CCXHJcbiAgICAvLyBzdGF0ZSDjgYzmm7TmlrDjgZXjgozjgZ/jgokgY29tcG9uZW50IOOBriBwcm9wIOOBjOabtOaWsOOBleOCjOOAgeWGjeODrOODs+ODgOODquODs+OCsOOBleOCjOOAgeODhuOCreOCueODiOODnOODg+OCr+OCueOBruWGheWuueOBjOWkieabtOOBleOCjOOCi+OAglxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZVRleHQgPSAoZTogUmVhY3QuQ2hhbmdlRXZlbnQ8SFRNTElucHV0RWxlbWVudD4pID0+IHsgLy8gLS0oZylcclxuICAgICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlVGV4dChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICB9XHJcblxyXG59XHJcbiJdfQ==