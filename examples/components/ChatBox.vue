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
  private username = 1;
  private stompClient: Stomp.Client;
  // private sessionId;
  private userList: any;
  created() {
    console.log("currentUserId", this.username);
  }

  mounted() {
    var socket = new SockJS(
      "http://192.168.3.188:9999/im-webSocket?username=" +
        encodeURIComponent(this.username.toString()),
      "",
      {
        sessionId: 32
      }
    );
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = () => {};
    this.stompClient.connect(this.username.toString(), "", frame => {
      // 获取消息列表
      this.getMessageList();
      // 获取用户列表
      this.getUserList();

      this.stompClient.subscribe(
        "/user/topic/private",
        this.receiveMessage.bind(this)
      );
      // this.stompClient.subscribe("/topic/offlineIMUser", this.onUserLogin);
      // this.stompClient.subscribe("/topic/onlineIMUser", this.onUserLogout);
    });
  }

  getUserList() {
    this.userList = [
      {
        id: 1,
        username: "test1",
        userphoto: "@/assets/images/avator.png"
      },
      {
        id: 2,
        username: "test2",
        userphoto: "@/assets/images/avator.png"
      },
      {
        id: 3,
        username: "test3",
        userphoto: "@/assets/images/avator.png"
      }
    ];

    this.chatBox.updateUserId(this.username);
    this.chatBox.updateUserList(this.userList);
  }

  getMessageList() {
    let messageList = [
      {
        id: 1,
        messages: [
          {
            content: "sadasdad ",
            sender: 1,
            time: 1536300301246
          },
          {
            content: "sad",
            sender: 2,
            time: 1536300303246
          },
          {
            content: "sads",
            sender: 2,
            time: 1536300305546
          }
        ]
      },
      {
        id: 3,
        messages: [
          {
            content: "sadasdad ",
            sender: 3,
            time: 1536300305126
          },
          {
            content: "sad",
            sender: 1,
            time: 1536300305246
          },
          {
            content: "zaasdasdasd",
            sender: 3,
            time: 1536300305556
          }
        ]
      }
    ];

    this.chatBox.updateMessageList(messageList);
  }

  /**
   * 发送消息处理
   */
  private onSendMessage(msg) {
    let receiver: any =
      this.userList.find(user => user.id === msg.receiver) || {};
    this.stompClient.send(
      "/app/private",
      {},
      JSON.stringify({
        sessionId: receiver.sessionId,
        sender: msg.sender,
        content: msg.content,
        receiver: msg.receiver
      })
    );
  }

  get chatBox() {
    return this.$refs["chat-box"] as ChatBox;
  }

  /**
   * 接收消息处理
   */
  private receiveMessage({ body }) {
    let data = JSON.parse(body);
    this.chatBox.onReceiveMessage({
      sender: data.sender,
      receiver: data.receiver,
      content: data.content,
      time: data.sendTime
    });
  }
}
</script>

<style lang="less">
</style>