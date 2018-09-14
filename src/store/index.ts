import Vue from 'vue'
import Vuex, { mapActions } from 'vuex'

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    panel: 'chat',
    userId: -1,
    chatId: -1,
    userList: [],
    messageList: []
  },
  getters: {
    chatList(state) {
      return (state.messageList as Array<any>)
        .filter(({ id }) => id !== state.userId)
        .map(({ id, messages }) => {
          let last = {} as any

          if (messages.length > 0) {
            last = messages[messages.length - 1]
          }

          return Object.assign({}, state.userList.find((x: any) => x.id === id), {
            id: id,
            time: last.time,
            content: last.content
          })
        })
    },
    currentMessage(state) {
      let currentChat = state.messageList.find((x: any) => x.id === state.chatId) as any

      if (!currentChat) {
        return []
      } else {
        return currentChat.messages
      }
    },
    currentChatUser(state) {
      return state.userList.find((x: any) => x.id === state.chatId) || {}
    }
  },
  mutations: {
    updatePanel(state, panel: 'user' | 'chat') {
      state.panel = panel
    },
    addNewMessage(state, msg) {
      let chatId = msg.chatId || msg.sender

      let currentChat = state.messageList.find((x: any) => x.id === chatId) as any

      if (!currentChat) {
        (state.messageList as Array<any>).push({
          id: chatId,
          messages: [msg]
        })
      } else {
        currentChat.messages.push(msg)
      }



    },
    updateChatId(state, id) {
      let targetChat = state.messageList.find((x: any) => x.id === id)
      if (!targetChat) {
        (state.messageList as Array<any>).unshift({
          id,
          messages: []
        })
      }
      state.chatId = id
    },
    updateUserList(state, userList) {
      state.userList = userList
    },
    updateMessageList(state, messageList) {
      state.messageList = messageList
    },
    updateUserId(state, id) {
      state.userId = id
    }
  },
  actions: {
    updateUserId({ commit }, id) {
      commit('updateUserId', id)
    },
    updateUserList({ commit }, userList) {
      commit('updateUserList', userList)
    },
    updateMessageList({ commit }, messageList) {
      commit('updateMessageList', messageList)
    }
  }
})


export default store