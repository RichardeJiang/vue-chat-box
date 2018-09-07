import Vue from 'vue'
import Vuex, { mapActions } from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userId: 1,
    chatId: 2,
    userList: {
      1: {
        username: 'test1',
        userphoto: '@/assets/images/avator.png'
      },
      2: {
        username: 'test2',
        userphoto: '@/assets/images/avator.png'
      },
      3: {
        username: 'test3',
        userphoto: '@/assets/images/avator.png'
      }
    },
    messageList: {
      2: [{
        content: "sadasdad ",
        sender: 1,
        time: 1536300301246
      }, {
        content: "sad",
        sender: 2,
        time: 1536300303246
      }, {
        content: "sads",
        sender: 2,
        time: 1536300305546
      }],
      3: [{
        content: "sadasdad ",
        sender: 3,
        time: 1536300305126
      }, {
        content: "sad",
        sender: 1,
        time: 1536300305246
      }, {
        content: "zaasdasdasd",
        sender: 3,
        time: 1536300305556
      }]
    }
  },
  getters: {
    chatList(state) {
      if (Object.keys(state.messageList).length <= 0) {
        return []
      }

      return Object.keys(state.messageList)
        .map(id => {
          let messages = state.messageList[id]
          let last = messages[messages.length - 1]
          return Object.assign({}, state.userList[id], {
            id: id,
            time: last.time,
            content: last.content
          })
        })
    },
    currentMessage(state) {
      if (!state.chatId) {
        return []
      }

      return state.messageList[state.chatId]
    },
    currentChatUser(state) {
      return state.userList[state.chatId] || {}
    }
  },
  mutations: {
    addNewMessage(state, msg) {
      let chatId = msg.chatId || msg.sender
      if (!state.messageList[chatId]) {
        state.messageList[chatId] = []
      }
      let currentMessage = state.messageList[chatId] as Array<any>
      currentMessage.push(msg)
    },
    updateChatId(state, id) {
      state.chatId = id
    }
  }
})


export default store