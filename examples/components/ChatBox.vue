<template>
  <div class="container">
    <chat-box ref="chat-box" :on-send-message="onSendMessage"></chat-box>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import Stomp from "@stomp/stompjs";
import SockJS from "sockjs-client";
import axios from "axios";
import { ChatBox } from "../../index";
@Component({
  components: {}
})
export default class extends Vue {
  private text = "this is a demo for create component";
  private username = "user_" + Math.floor(Math.random() * 100);
  private stompClient: Stomp.Client;

  created() {
    // var socket = new SockJS("http://192.168.3.188/im-webSocket");
    // this.stompClient = Stomp.over(socket);
    // this.stompClient.connect({}, frame => {
    //   this.stompClient.subscribe("/topic/greetings", this.onInit.bind(this));
    //   this.stompClient.subscribe(
    //     "/user/topic/private",
    //     this.receiveMessage.bind(this)
    //   );
    //   this.stompClient.subscribe("/topic/offlineIMUser", this.onUserLogin);
    //   this.stompClient.subscribe("/topic/onlineIMUser", this.onUserLogout);
    // });
  }

  mounted() {
    // axios.post("http://192.168.3.188:9999/login", {
    //   data: { username: this.username }
    // });
  }

  private onInit() {}

  /**
   * 发送消息处理
   */
  private onSendMessage(msg) {
    // this.stompClient.send(
    //   "/app/private",
    //   {},
    //   JSON.stringify({
    //     sender: msg.sender,
    //     content: msg.content,
    //     receiver: msg.receiver
    //   })
    // );
  }

  /**
   * 接收消息处理
   */
  private receiveMessage(data) {
    let chatBox = this.$refs["chat-box"] as ChatBox;
    chatBox.onReceiveMessage({
      sender: data.sender,
      receiver: data.receiver,
      content: data.content,
      time: data.time
    });
  }
  /**
   * 用户登录处理
   */
  private onUserLogin(data) {
    console.log(data);
  }
  /**
   * 用户登出处理
   */
  private onUserLogout(data) {
    console.log(data);
  }
}
</script>

<style lang="less">
</style>