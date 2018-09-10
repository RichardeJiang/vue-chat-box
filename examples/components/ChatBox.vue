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
import Qs from "qs";
@Component({
  components: {}
})
export default class extends Vue {
  private text = "this is a demo for create component";
  private username = "user_" + Math.floor(Math.random() * 100 * 100);
  private stompClient: Stomp.Client;

  created() {
    console.log("currentUserId", this.username);
    
  }

  mounted() {
    axios({
      url: "http://192.168.3.188:9999/login",
      method: "post",
      data: Qs.stringify({
        username: this.username
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }).then(() => {
      this.getOnlineUser();
      var socket = new SockJS(
        "http://192.168.3.188:9999/im-webSocket?username=" +
          encodeURIComponent(this.username),
        "",
        {
          sessionId: 32
        }
      );
      this.stompClient = Stomp.over(socket);
      this.stompClient.debug = () => {};
      this.stompClient.connect({}, frame => {
        this.stompClient.subscribe(
          "/user/topic/private",
          this.receiveMessage.bind(this)
        );
        this.stompClient.subscribe("/topic/offlineIMUser", this.onUserLogin);
        this.stompClient.subscribe("/topic/onlineIMUser", this.onUserLogout);
      });
    });
  }

  getOnlineUser() {
    axios({
      url: "http://192.168.3.188:9999/getOnlineList",
      method: "get"
    }).then(({ data: users }) => {
      let chatBox = this.$refs["chat-box"] as ChatBox;
      let userList = {};
      let messageList = {};
      users.filter(user => user.userId !== this.username).forEach(user => {
        userList[user.userId] = {
          username: user.userId,
          userphoto: "@/assets/images/avator.png"
        };
      });

      chatBox.updateUserList(userList);

      users.filter(user => user.userId !== this.username).forEach(user => {
        messageList[user.userId] = [
          {
            content: "ttt",
            sender: user.userId,
            time: Date.now()
          }
        ];
      });
      chatBox.updateMessageList(messageList);

      chatBox.updateUserId(this.username)
    });
  }
  private onInit() {}

  /**
   * 发送消息处理
   */
  private onSendMessage(msg) {
    console.log({
      sender: msg.sender,
      content: msg.content,
      receiver: msg.receiver
    });
    this.stompClient.send(
      "/app/private",
      {},
      JSON.stringify({
        sender: msg.sender,
        content: msg.content,
        receiver: msg.receiver
      })
    );
  }

  /**
   * 接收消息处理
   */
  private receiveMessage(data) {
    console.log("rece", data);
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
    this.getOnlineUser();
  }
  /**
   * 用户登出处理
   */
  private onUserLogout(data) {
    this.getOnlineUser();
  }
}
</script>

<style lang="less">
</style>