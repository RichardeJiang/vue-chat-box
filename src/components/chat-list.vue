<template>
  <div class="chat-list">
    <div class="search">
      <input placeholder="搜索" />
    </div>
    <div class="list">
      <div v-for="item of chatList" :key="item.id" :class="{active:chatId == item.id}">
        <chat-item :data="item" @click.native="onChatChange(item.id)"></chat-item>
        <div class="spilt"></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import ChatItem from "./chat-item.vue";
import store from "~/store";
@Component({
  components: {
    ChatItem
  }
})
export default class ChatList extends Vue {
  get chatId() {
    return store.state.chatId;
  }

  get chatList() {
    return store.getters.chatList;
  }

  onChatChange(id) {
    store.commit("updateChatId", id);
  }
}
</script>

<style lang="less" scoped>
.chat-list {
  background: #fff;
  width: 220px;
  height: 100%;
  .list {
    .active>.chat-item{
      background:#e0e0e0;
    }
  }
  .search {
    padding: 15px 0;
    input {
      background: #e7e7e7;
      border-radius: 5px;
      border: 1px solid #dbdbdb;
      width: 200px;
      height: 18px;
      margin: auto;
      text-align: center;
      &::-webkit-input-placeholder {
        /* Chrome/Opera/Safari */
        text-align: center;
        color: #b2b2b2;
      }
    }
  }
  .spilt {
    width: 200px;
    height: 1px;
    background: #f0f0f0;
    margin: 0 auto;
  }
}
</style>
