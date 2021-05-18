// Vue Level 3
console.log('Vue Level 3')

import Vue from './instance/index'
import { initGlobalAPI } from './global-api/index'
import { isServerRendering } from 'core/util/env'
import { FunctionalRenderContext } from 'core/vdom/create-functional-component'

console.log('初始化全局API');
initGlobalAPI(Vue)
console.log('初始化全局API 结束');

console.log('--添加 Vue.prototype.$isServer');
Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering,
})

console.log('--添加 Vue.prototype.$ssrContext');
Object.defineProperty(Vue.prototype, '$ssrContext', {
  get() {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  },
})

// expose FunctionalRenderContext for ssr runtime helper installation
console.log('--添加 Vue.FunctionalRenderContext');
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext,
})

// 这个字符串最后怎么被替换掉的？
Vue.version = '__VERSION__'

export default Vue
