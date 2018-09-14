<template>
  <div class="user-list col">
    <input class="tree-search-input" type="text" v-model="searchWord" placeholder="搜索" />
    <!-- <v-tree ref='tree' :data='treeData'/> -->
    <div class="list">
      <div v-for="user of userList" :key="user.id" :class="{active:currentUser == user.id}">
        <chat-item :data="user" @click.native="currentUser = user.id" @dblclick.native="onOpenChat(user.id)"></chat-item>
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
export default class UserList extends Vue {
  get userList() {
    return (this.searchWord.trim() === ""
      ? store.state.userList
      : store.state.userList.filter((x: any) =>
          x.username.includes(this.searchWord)
        )
    ).filter((x: any) => x.id !== store.state.userId);
  }
  private currentUser = "";
  private searchWord = "";
  private treeData = [
    {
      title: "一级节点",
      expanded: true,
      children: [
        {
          title: "二级节点1",
          expanded: true,
          children: [
            {
              title: "三级节点1-1"
            },
            {
              title: "三级节点1-2"
            },
            {
              title: "三级节点1-3"
            }
          ]
        },
        {
          title: "二级节点2",
          expanded: true,
          children: [
            {
              title: "123213"
            },
            {
              title: "12312"
            }
          ]
        }
      ]
    }
  ];

  onOpenChat(id) {
    store.commit("updateChatId", id);
    store.commit("updatePanel", "chat");
  }
}
</script>

<style lang="less" scoped>
.user-list {
  background: #fff;
  width: 220px;
  height: 100%;
  .list {
    .active > .chat-item {
      background: #e0e0e0;
    }
  }
  .tree-search-input {
    width: 200px;
    height: 18px;
    background: #e7e7e7;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    margin: 15px auto;
    text-align: center;
    &::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      text-align: center;
      color: #b2b2b2;
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

<style>
/* .halo-tree .node-selected {
   background-color: unset;
   border:unset;
  } */
</style>
