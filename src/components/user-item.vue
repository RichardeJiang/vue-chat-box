<template>
  <div class="user-item row between-span">
    <div class="avator">
      <img src="@/assets/images/avator.png" />
    </div>
    <div class="content col col-span center-span">
      <div class="user">{{data.username}}</div>
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { dateFormat } from "~/utils/filter";
@Component({
  components: {},
  filters: {
    dateFormat
  }
})
export default class ChatItem extends Vue {
  @Prop({
    default: () => {}
  })
  private data;
}
</script>

<style lang="less" scoped>
.user-item {
  padding: 10px;
  .avator img {
    width: 40px;
    height: 40px;
  }
  .content {
    padding: 0 10px;
    
    div {
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .message {
      color: #a0a0a0;
    }
  }
  .time {
    font-size: 8px;
    color:#a0a0a0;
  }

}
</style>
