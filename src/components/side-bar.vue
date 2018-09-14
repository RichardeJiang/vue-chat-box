<template>
  <div class="side-bar">
    <ul>
      <li @click="openPanel('chat')">
        <svgicon name="msg" width="24" height="24" :color="panel==='chat'?'#3CAF36':'#CDCDCD'"></svgicon>
      </li>
      <li @click="openPanel('user')">
        <svgicon name="user" width="24" height="24" :color="panel==='user'?'#3CAF36':'#CDCDCD'"></svgicon>
      </li>
    </ul>
  </div>
</template>
<script lang="ts">
import "~/icons";
import { Vue, Component } from "vue-property-decorator";
import store from "~/store";
@Component({
  components: {}
})
export default class MessageInput extends Vue {
  get panel() {
    return store.state.panel;
  }

  openPanel(value) {
    store.commit("updatePanel", value);
  }
}
</script>

<style lang="less" scoped>
.side-bar {
  background: #2e3238;

  ul {
    li {
      height: 22px;
      padding: 15px 15px;
    }
  }
}
</style>
