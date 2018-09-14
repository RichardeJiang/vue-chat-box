<template>
  <div class="message-list">
    <div class="header">
      {{currentUser.username}}
    </div>
    <div class="content row-span" v-scroll-bottom="currentMessage">
      <ul>
        <li v-for="item in currentMessage" :key="item.time">
          <p class="time">
            <span>{{ item.time|dateFormat('MM-dd hh:mm')}}</span>
          </p>
          <div class="main" :class="{ self: item.sender === userId }">
            <img class="avatar" width="30" height="30" src="@/assets/images/avator.png" />
            <div class="text">{{ item.content }}</div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { dateFormat } from "~/utils/filter";
import store from "~/store";
@Component({
  components: {},
  filters: {
    dateFormat
  },
  directives: {
    // 发送消息后滚动到底部
    ["scroll-bottom"]: {
      update(el, binding, vnode) {
        Vue.nextTick(() => {
          el.scrollTop = el.scrollHeight - el.clientHeight;
        });
      }
    }
  }
})
export default class MessageList extends Vue {
  private username = "test";
  private get userId() {
    return store.state.userId;
  }
  private get currentMessage() {
    return store.getters.currentMessage;
  }

  private get currentUser() {
    return store.getters.currentChatUser || {};
  }
}
</script>
<style lang="less" scoped>
.message-list {
  height: 450px;
  flex-basis: 450px;
  padding: 0;
  background: #f0f0f0;
  .header {
    font-size: 15px;
    font-weight: bold;
    line-height: 50px;
    height: 50px;
  }

  .content {
    height: 400px;
    border-top: 1px solid #e0e0e0;
    overflow-y: scroll;
    padding: 10px 15px;
    border-right: 2px solid #f0f0f0;
    &::-webkit-scrollbar {
      background-color: #f0f0f0;
      width: 8px;
      height: 8px;
    }
    /* 设置滚动条的滑轨 */
    &::-webkit-scrollbar-track {
      background-color: #f0f0f0;
    }

    /* 滑块 */
    &::-webkit-scrollbar-thumb {
      background-color: #b0b0b0;
      border-radius: 5px;
    }

    /* 滑轨两头的监听按钮 */
    &::-webkit-scrollbar-button {
      background-color: #f0f0f0;
      display: none;
    }

    /* 横向滚动条和纵向滚动条相交处尖角 */
    &::-webkit-scrollbar-corner {
      /*background-color: black;*/
    }
    li {
      margin-bottom: 15px;
    }
    .time {
      margin: 7px 0;
      text-align: center;
      > span {
        display: inline-block;
        padding: 0 18px;
        font-size: 12px;
        color: #fff;
        border-radius: 2px;
        background-color: #dcdcdc;
      }
    }
    .avatar {
      float: left;
      margin: 0 10px 0 0;
      border-radius: 3px;
    }
    .text {
      display: inline-block;
      position: relative;
      padding: 0 10px;
      max-width: ~"calc(100% - 40px)";
      min-height: 30px;
      line-height: 2.5;
      font-size: 12px;
      text-align: left;
      word-break: break-all;
      background-color: #fafafa;
      border-radius: 4px;
      &:before {
        content: " ";
        position: absolute;
        top: 9px;
        right: 100%;
        border: 6px solid transparent;
        border-right-color: #fafafa;
      }
    }
    .self {
      text-align: right;
      .avatar {
        float: right;
        margin: 0 0 0 10px;
      }
      .text {
        background-color: #b2e281;
        &:before {
          right: inherit;
          left: 100%;
          border-right-color: transparent;
          border-left-color: #b2e281;
        }
      }
    }
  }
}
</style>
