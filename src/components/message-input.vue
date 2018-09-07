<template>
  <div class="message-input">
    <textarea placeholder="按 Enter 发送" v-model="content" @keydown.enter.prevent.stop="onKeyup"></textarea>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Emit } from "vue-property-decorator";
import { IMessage } from "~/utils/interface";
import store from "~/store";

@Component({
  components: {}
})
export default class MessageInput extends Vue {
  private content = "";
  private get chatId() {
    return store.state.chatId;
  }

  private get userId() {
    return store.state.userId;
  }

  @Emit("onSendMessage")
  emitSendMessage(msg: IMessage) {
    store.commit("addNewMessage", msg);
  }

  onKeyup(e) {
    if (this.content === "") {
      this.content = ""
      return;
    }
    const msg = {
      chatId: this.chatId,
      sender: this.userId,
      receiver: this.chatId,
      content: this.content,
      time: Date.now()
    };

    this.emitSendMessage(msg);

    this.content = "";
  }
}
</script>

<style lang="less" scoped>
.message-input {
  height: 150px;
  overflow: hidden;
  flex-basis: 150px;

  border-top: 1px solid #e0e0e0;

  textarea {
    background: #f0f0f0;
    padding: 10px;
    height: 100%;
    width: 100%;
    border: none;
    outline: none;
    font-family: "Micrsofot Yahei";
    resize: none;
  }
}
</style>
