import { initMixin } from "./init";
import { stateMixin } from "./state";
import { renderMixin } from "./render";
import { eventsMixin } from "./events";
import { lifecycleMixin } from "./lifecycle";
import { warn } from "../util/index";
import type { GlobalAPI } from "typescript/global-api";

// Vue Level 4
console.log('Vue Level 4');
console.log('--初始化 Vue 构造函数 开始 ------------------------------------------------')
console.log('声明 Vue 构造函数');
function Vue(options) {
  if (process.env.NODE_ENV !== "production" && !(this instanceof Vue)) {
    warn("Vue is a constructor and should be called with the `new` keyword");
  }
  this._init(options);
}

console.log('初始化 initMixin');
//@ts-expect-error Vue has function type
initMixin(Vue);

console.log('初始化 stateMixin');
//@ts-expect-error Vue has function type
stateMixin(Vue);

console.log('初始化 eventsMixin');
//@ts-expect-error Vue has function type
eventsMixin(Vue);

console.log('初始化 lifecycleMixin');
//@ts-expect-error Vue has function type
lifecycleMixin(Vue);

console.log('初始化 renderMixin');
//@ts-expect-error Vue has function type
renderMixin(Vue);

export default (Vue as unknown) as GlobalAPI;
