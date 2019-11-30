"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var clone_1 = __importDefault(require("clone"));
var UserNameEvents_1 = require("../actions/UserNameEvents");
var IUser_1 = require("../states/IUser");
exports.UserReducer = function (childState, action) {
    if (childState === void 0) { childState = IUser_1.initUser; }
    var newChildState = childState; // --(b)
    switch (action.type) {
        case UserNameEvents_1.CHANGE_USER_NAME: // --(c)
            {
                newChildState = clone_1.default(childState); // --(d)
                newChildState.name = action.name; // --(e)
            }
            break;
    }
    return newChildState;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlclJlZHVjZXIuanMiLCJzb3VyY2VSb290IjoiLi90c3gvIiwic291cmNlcyI6WyJyZWR1Y2Vycy9Vc2VyUmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLGdEQUEwQjtBQUcxQiw0REFBb0Y7QUFDcEYseUNBQWtEO0FBRXJDLFFBQUEsV0FBVyxHQUF5QixVQUFDLFVBQXFCLEVBQUUsTUFBTTtJQUE3QiwyQkFBQSxFQUFBLGFBQWEsZ0JBQVE7SUFDbkUsSUFBSSxhQUFhLEdBQVUsVUFBVSxDQUFDLENBQUMsUUFBUTtJQUMvQyxRQUFRLE1BQU0sQ0FBQyxJQUFJLEVBQUU7UUFDakIsS0FBSyxpQ0FBZ0IsRUFBRSxRQUFRO1lBQzNCO2dCQUNJLGFBQWEsR0FBRyxlQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRO2dCQUMzQyxhQUFhLENBQUMsSUFBSSxHQUFJLE1BQWdDLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUTthQUN4RTtZQUNELE1BQU07S0FDYjtJQUNELE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDbG9uZSBmcm9tICdjbG9uZSc7XHJcbmltcG9ydCBSZWR1eCBmcm9tICdyZWR1eCc7XHJcblxyXG5pbXBvcnQgeyBDSEFOR0VfVVNFUl9OQU1FLCBJQ2hhbmdlVXNlck5hbWVBY3Rpb24gfSBmcm9tICcuLi9hY3Rpb25zL1VzZXJOYW1lRXZlbnRzJztcclxuaW1wb3J0IElVc2VyLCB7IGluaXRVc2VyIH0gZnJvbSAnLi4vc3RhdGVzL0lVc2VyJztcclxuXHJcbmV4cG9ydCBjb25zdCBVc2VyUmVkdWNlcjogUmVkdXguUmVkdWNlcjxJVXNlcj4gPSAoY2hpbGRTdGF0ZSA9IGluaXRVc2VyLCBhY3Rpb24pID0+IHsgLy8gLS0oYSlcclxuICAgIGxldCBuZXdDaGlsZFN0YXRlOiBJVXNlciA9IGNoaWxkU3RhdGU7IC8vIC0tKGIpXHJcbiAgICBzd2l0Y2ggKGFjdGlvbi50eXBlKSB7XHJcbiAgICAgICAgY2FzZSBDSEFOR0VfVVNFUl9OQU1FOiAvLyAtLShjKVxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBuZXdDaGlsZFN0YXRlID0gQ2xvbmUoY2hpbGRTdGF0ZSk7IC8vIC0tKGQpXHJcbiAgICAgICAgICAgICAgICBuZXdDaGlsZFN0YXRlLm5hbWUgPSAoYWN0aW9uIGFzIElDaGFuZ2VVc2VyTmFtZUFjdGlvbikubmFtZTsgLy8gLS0oZSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBicmVhaztcclxuICAgIH1cclxuICAgIHJldHVybiBuZXdDaGlsZFN0YXRlO1xyXG59OyJdfQ==