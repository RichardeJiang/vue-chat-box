<template>
  <div class="chat-box row">
    <side-bar></side-bar>
    <template>
      <chat-list></chat-list>
      <div class="col col-span no-padding">
        <message-list></message-list>
        <message-input @onSendMessage="onSendMessage"></message-input>
      </div>
    </template>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import SideBar from "./components/side-bar.vue";
import ChatList from "./components/chat-list.vue";
import MessageList from "./components/message-list.vue";
import MessageInput from "./components/message-input.vue";
import store from "~/store";
import { IMessage } from "~/utils/interface";

@Component({
  components: {
    SideBar,
    ChatList,
    MessageList,
    MessageInput
  }
})
export default class ChatBox extends Vue {
  @Prop({
    default: () => {}
  })
  onSendMessage;

  public onReceiveMessage(msg: IMessage) {
    store.commit("addNewMessage", msg);
  }

  public updateUserList(list) {
    store.dispatch("updateUserList", list);
  }

  public updateMessageList(list) {
    store.dispatch("updateMessageList", list);
  }

  public updateUserId(id) {
    store.dispatch("updateUserId", id);
  }
}
</script>

<style lang="less" scoped>
.chat-box {
  background: red;
  margin: 20px auto;
  width: 800px;
  height: 600px;

  overflow: hidden;
  border-radius: 3px;
}
</style>
