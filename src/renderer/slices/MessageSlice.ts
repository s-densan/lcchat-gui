import { createSlice } from '@reduxjs/toolkit';
import clone from 'clone';
import { remote } from 'electron';
import fs from 'fs';
import path from 'path';
import uuid from 'uuid';
import { createAttachment } from '../states/IAttachment';
import { createAttachmentMessage, createTextMessage, IChatMessage, IChatMessageList, ITextMessageData } from '../states/IChatMessage';
import {
  deleteMessageDB,
  insertAttachmentDB,
  insertMessageDB,
  loadChatMessagesDB,
  loadNewChatMessagesDB,
  updateMessageTextDB,
} from '../utils/ChatDatabaseIF';
import { getAttachmentFilePath } from '../utils/FileUtils'

// Stateの初期状態
const initialState: IChatMessageList & { editingMessage: IChatMessage | undefined } & {lastLoadDatetime?: Date} = {
  chatMessages: [],
  editingMessage: undefined,
  lastLoadDatetime: undefined,
};

// Sliceを生成する
const slice = createSlice({
  initialState,
  name: 'message',
  reducers: {
    deleteChatMessage: (state, action) => {
      const chatMessageId: string = action.payload.chatMessageId;
      const { chatMessages: chatMessages } = state;
      const target = chatMessages.find((it) => it.messageId === chatMessageId);
      if (!target) { return; }
      // 指定したID以外のオブジェクトを抽出し、それを新しいリストとする
      const newState = clone(state);
      newState.chatMessages = chatMessages.filter((it) => it.messageId !== chatMessageId);
      deleteMessageDB(chatMessageId);
      if (target.type === 'attachment') {
        // 添付ファイルの場合、attachmentsテーブルと添付データを削除
        const attachmentFilePath = getAttachmentFilePath(target.attachment.attachmentId);
        fs.exists(attachmentFilePath, (exists: boolean) => {
          if (exists) {
            fs.unlink(attachmentFilePath, () => { });
          }
        });
      }

      return newState;
    },
    loadAllChatMessages: (state) => {
      // DB読み込み後に実行する
      const chatMessages: IChatMessage[] = [];
      const chatMessagesJson: any = loadChatMessagesDB();
      for (const chatMessageJson of chatMessagesJson) {
        let userName: string;
        const chatMessageData = JSON.parse(chatMessageJson.messageData);
        const userData = JSON.parse(chatMessageJson.userData);
        if (chatMessageJson.userData) {
          userName = userData.userName;
        } else {
          userName = 'unknown';
        }
        // alert(JSON.stringify(chatMessageJson))
        // alert(JSON.stringify(chatMessageJson.messageData))
        // console.log(chatMessageData)
        // alert(chatMessageData.text)
        switch (chatMessageJson.type) {
          case 'text':
            const textMessage = createTextMessage(
              chatMessageJson.messageId,
              chatMessageData.text,
              chatMessageJson.userId,
              userName,
              userName.slice(0, 2),
              'dummyTalkId',
              chatMessageJson.postedAt,
              chatMessageJson.createdAt,
              chatMessageJson.updatedAt,
            );
            chatMessages.push(textMessage);
            break;
          case 'attachment':
            // デフォルト添付
            let attachmentData = {
              // ファイルタイプ
              fileType: 'none',
              // ファイル名
              fileName: '',
              // 添付者ID
              createUserId: '',
              // 添付者名
              createUserName: '',
              // 添付コンピュータ名
              sourceComputerName: '',
              // 元ファイルパス
              sourceFilePath: '',
            };
            if (chatMessageJson.attachmentData !== undefined &&
              chatMessageJson.attachmentData.trim() !== '') {
              attachmentData = JSON.parse(chatMessageJson.attachmentData);
              console.log(attachmentData.fileName);
            }
            const attachmentMessage = createAttachmentMessage(
              chatMessageJson.messageId,
              chatMessageJson.userId,
              userName,
              userName.slice(0, 2),
              'dummyTalkId',
              chatMessageJson.postedAt,
              createAttachment(
                chatMessageJson.attachmentId,
                chatMessageJson.messageId,
                attachmentData.fileType,
                attachmentData.createUserId,
                attachmentData.createUserName,
                attachmentData.sourceComputerName,
                attachmentData.sourceFilePath,
                chatMessageJson.createdAt,
                chatMessageJson.updatedAt,
              ),
              chatMessageJson.createdAt,
              chatMessageJson.updatedAt,
            );
            chatMessages.push(attachmentMessage);
            break;
          default:
            throw new Error(`Unknown message type: ${chatMessageJson.type}`);
        }
      }
      const res = {
        chatMessages,
        editingMessage: state.editingMessage,
        lastLoadDatetime: new Date(),
      };
      if (state.chatMessages.length !== 0 && state.chatMessages.length < chatMessages.length) {
        const num = chatMessages.length - state.chatMessages.length;
        const notify = new remote.Notification({ body: `新着メッセージが${num}あります`, title: 'LcChat - 新規メッセージ' });
        notify.show();
        // 通知メッセージクリック時イベント
        notify.on('click', () => {
          // 全ウィンドウを表示してフォーカスする
          const wins = remote.BrowserWindow.getAllWindows();
          for (const win of wins) {
            win.show();
            win.focus();
          }
        });
      }
      return res;
    },
    /**
     * 更新したメッセージをDBから読み込む
     */
    loadNewChatMessages: (state) => {
      // DB読み込み後に実行する
      const chatMessages: IChatMessage[] = [];
      let chatMessagesJson: any;
      let newLastLoadDatetime = new Date();
      console.info(state.lastLoadDatetime);
      if (state.lastLoadDatetime) {
        chatMessagesJson = loadNewChatMessagesDB(state.lastLoadDatetime);
      } else {
        chatMessagesJson = loadChatMessagesDB();
      }
      if (chatMessagesJson.length === 0) {
        return state;
      }

      console.info(chatMessagesJson.length);
      for (const currentMessage of state.chatMessages){
        // currentMessageの更新があるか確認
        const filtered = chatMessagesJson.filter(
          (loadedMessage: any) => loadedMessage.messageId === currentMessage.messageId);
        if (filtered.length === 1) {
          // 更新あり
          const userData = JSON.parse(filtered[0].userData);
          const messageData = JSON.parse(filtered[0].messageData);
          let userName = 'unknown';
          if (filtered[0].userData) {
            userName = userData.userName;
          }
          switch (filtered[0].type) {
            case 'text':
              const loadedMessage = createTextMessage(
              filtered[0].messageId,
              messageData.text + '💩',
              filtered[0].userId,
              userName,
              userName.slice(0, 2),
              'dummyTalkId',
              filtered[0].postedAt,
              filtered[0].createdAt,
              filtered[0].updatedAt,
              );
              chatMessages.push(loadedMessage);
              break;
            case 'attachment':
              break;
          }
        } else if (filtered.length === 0) {
          // 更新なし
          chatMessages.push(currentMessage);
        }
      }
      const res = {
        chatMessages,
        editingMessage: state.editingMessage,
        lastLoadDatetime: newLastLoadDatetime,
      };
      if (state.chatMessages.length !== 0 && state.chatMessages.length < chatMessages.length) {
        const num = chatMessages.length - state.chatMessages.length;
        const notify = new remote.Notification({ body: `新着メッセージが${num}あります`, title: 'LcChat - 新規メッセージ' });
        notify.show();
        // 通知メッセージクリック時イベント
        notify.on('click', () => {
          // 全ウィンドウを表示してフォーカスする
          const wins = remote.BrowserWindow.getAllWindows();
          for (const win of wins) {
            win.show();
            win.focus();
          }
        });
      }
      return res;
    },
    postTextMessage: (state, action) => {
      if (action.payload.text === '') {
        return state;
      } else {
        const nowDatetime = new Date();
        const newMessage = createTextMessage(
          action.payload.chatMessageId,
          action.payload.text,
          action.payload.userId,
          action.payload.userName,
          action.payload.userAvaterText,
          action.payload.talkId,
          action.payload.postedAt,
          nowDatetime,
          nowDatetime,
        );
        const messageList = state.chatMessages.concat(newMessage);
        insertMessageDB(newMessage);
        action.payload.bottomRef!.current!.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
        return {
          chatMessages: messageList,
          editingMessage: state.editingMessage,
        };
      }
    },
    postAttachmentMessage: (state, action) => {
      if (action.payload.attachmentPath === '') {
        return state;
      } else {
        const nowDatetime = new Date();
        const newAttachment = createAttachment(
          uuid(),
          action.payload.chatMessageId,
          'image',
          action.payload.userId,
          action.payload.userName,
          'dummy computer name',
          action.payload.sourceFilePath,
          nowDatetime,
          nowDatetime,
        );
        const newMessage = createAttachmentMessage(
          action.payload.chatMessageId,
          action.payload.userId,
          action.payload.userName,
          action.payload.userAvaterText,
          action.payload.talkId,
          action.payload.postedAt,
          newAttachment,
          nowDatetime,
          nowDatetime,
        );
        // DBへの書き込み
        const messageList = state.chatMessages.concat(newMessage);
        insertMessageDB(newMessage);
        insertAttachmentDB(newAttachment);
        // 添付ファイルのコピー
        const dstFilePath = getAttachmentFilePath(newAttachment.attachmentId);
        const dstDirPath = path.dirname(dstFilePath);
        fs.exists(dstDirPath, (exists) => {
          if (exists) {
          // 添付フォルダが存在しない場合、作成する。
          fs.mkdirSync(dstDirPath);
          }
        });
        fs.copyFile(action.payload.sourceFilePath, dstFilePath, () => { });

        action.payload.bottomRef!.current!.scrollIntoView({
          behavior: 'smooth',
          block: 'end',
        });
        return {
          chatMessages: messageList,
          editingMessage: state.editingMessage,
        };
      }
    },
    showChatMessage: (state, action) => {
      return {
        chatMessages: action.payload.chatMessages,
        editingMessage: state.editingMessage,
      };
    },
    updateChatMessage: (state, action) => {
      const { chatMessages: chatMessages }: IChatMessageList = state;
      const newChatMessages: IChatMessage[] = chatMessages.map((it) => {
        if (it.messageId === action.payload.chatMessageId) {
          const messageData: ITextMessageData = {
            text: action.payload.text,
          };
          // テキストのみ更新
          updateMessageTextDB(action.payload.chatMessageId, messageData);
          const res: IChatMessage = {
            createdAt: it.createdAt,
            id: it.id,
            type: 'text',
            messageData: messageData,
            messageId: it.messageId,
            postedAt: it.postedAt,
            talkId: it.talkId,
            updatedAt: it.updatedAt,
            userId: it.userId,
            userName: it.userName,
            userAvaterText: it.userAvaterText,
          };
          return res;
        } else {
          return it;
        }
      });
      return {
        chatMessages: newChatMessages,
        editingMessage: state.editingMessage,
      };
    },
    startEditMessage: (state, action) => {
      return {
        chatMessages: state.chatMessages,
        editingMessage: action.payload.message,
      };
    },
    endEditMessage: (state) => {
      return {
        chatMessages: state.chatMessages,
        editingMessage: undefined,
      };
    },
  },
});

// Action Creatorsをエクスポートする
export const messageActions = slice.actions;
// Reducerをエクスポートする
export const messageReducer = slice.reducer;
