<template>
  <div class="row middle-span center-span no-chat">
    请选择聊天对象
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import store from "~/store";
@Component({})
export default class NoChat extends Vue {}
</script>

<style lang="less" scoped>
.no-chat {
   background: #f0f0f0;
   height: 100%;
}
</style>
