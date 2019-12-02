"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid"); // -- (a)
/**
 * ユーザー名を変更するアクション・タイプ
 */
exports.CHANGE_USER_NAME = uuid_1.v4(); // -- (b)
/**
 * ユーザー名変更アクション・クリエイター
 * @param name 変更する名前の文字列
 * @returns ユーザー名変更アクション
 */
exports.createChangeUserNameAction = function (name) {
    return {
        name: name,
        type: exports.CHANGE_USER_NAME,
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlck5hbWVFdmVudHMuanMiLCJzb3VyY2VSb290IjoiLi90c3gvIiwic291cmNlcyI6WyJhY3Rpb25zL1VzZXJOYW1lRXZlbnRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQ0EsNkJBQWdDLENBQUMsU0FBUztBQUUxQzs7R0FFRztBQUNVLFFBQUEsZ0JBQWdCLEdBQUcsU0FBSSxFQUFFLENBQUMsQ0FBQyxTQUFTO0FBVWpEOzs7O0dBSUc7QUFDVSxRQUFBLDBCQUEwQixHQUErQyxVQUFDLElBQVk7SUFDL0YsT0FBTztRQUNILElBQUksTUFBQTtRQUNKLElBQUksRUFBRSx3QkFBZ0I7S0FDekIsQ0FBQztBQUNOLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWR1eCBmcm9tICdyZWR1eCc7XHJcbmltcG9ydCB7djQgYXMgVVVJRH0gZnJvbSAndXVpZCc7IC8vIC0tIChhKVxyXG5cclxuLyoqXHJcbiAqIOODpuODvOOCtuODvOWQjeOCkuWkieabtOOBmeOCi+OCouOCr+OCt+ODp+ODs+ODu+OCv+OCpOODl1xyXG4gKi9cclxuZXhwb3J0IGNvbnN0IENIQU5HRV9VU0VSX05BTUUgPSBVVUlEKCk7IC8vIC0tIChiKVxyXG5cclxuLyoqXHJcbiAqIOODpuODvOOCtuODvOWQjeOCkuWkieabtOOBmeOCi+OCouOCr+OCt+ODp+ODs1xyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBJQ2hhbmdlVXNlck5hbWVBY3Rpb24gZXh0ZW5kcyBSZWR1eC5BY3Rpb24geyAvLyAtLShjKVxyXG4gICAgLyoqIOWkieabtOOBmeOCi+WQjeWJjeOBruaWh+Wtl+WIlyAqL1xyXG4gICAgbmFtZTogc3RyaW5nO1xyXG59XHJcblxyXG4vKipcclxuICog44Om44O844K244O85ZCN5aSJ5pu044Ki44Kv44K344On44Oz44O744Kv44Oq44Ko44Kk44K/44O8XHJcbiAqIEBwYXJhbSBuYW1lIOWkieabtOOBmeOCi+WQjeWJjeOBruaWh+Wtl+WIl1xyXG4gKiBAcmV0dXJucyDjg6bjg7zjgrbjg7zlkI3lpInmm7TjgqLjgq/jgrfjg6fjg7NcclxuICovXHJcbmV4cG9ydCBjb25zdCBjcmVhdGVDaGFuZ2VVc2VyTmFtZUFjdGlvbjogUmVkdXguQWN0aW9uQ3JlYXRvcjxJQ2hhbmdlVXNlck5hbWVBY3Rpb24+ID0gKG5hbWU6IHN0cmluZykgPT4geyAvLyAtLShkKVxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBuYW1lLFxyXG4gICAgICAgIHR5cGU6IENIQU5HRV9VU0VSX05BTUUsXHJcbiAgICB9O1xyXG59OyJdfQ==