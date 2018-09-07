<template>
  <div class="side-bar">
    <ul>
      <li>
        <svgicon name="msg" width="24" height="24" color="#fff"></svgicon>
      </li>
      <li>
        <svgicon name="user" width="24" height="24" color="#fff"></svgicon>
      </li>
    </ul>
   </div>
</template>
<script lang="ts">
import '~/icons'
import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
  }
})
export default class MessageInput extends Vue {
}
</script>

<style lang="less" scoped>
.side-bar{
  background:#2e3238;

  ul{
    li{
      height:22px;
      padding:15px 15px;
    }
  }
}
</style>
