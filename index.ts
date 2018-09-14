import Vue from 'vue'
import SvgIcon from 'vue-svgicon'
import ChatBox from './src/chat-box.vue'
import { VTree, VSelectTree } from 'vue-tree-halower'
Vue.use (VTree)
Vue.use (VSelectTree)
import 'vue-tree-halower/dist/halower-tree.min.css' 
import "./src/styles/layout.less"
import "./src/styles/common.less"


// Default tag name is 'svgicon
Vue.use(SvgIcon, {
  tagName: 'svgicon'
})

const install = (Vue, options) => {
  Vue.component('chat-box', ChatBox);
  console.log(options)
}

export default {
  version: '0.0.1',
  install
}

export { ChatBox }
