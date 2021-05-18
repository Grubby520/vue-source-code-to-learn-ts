
import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'
import { observe } from 'core/observer/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive,
} from '../util/index'
import type { GlobalAPI } from 'typescript/global-api'

export function initGlobalAPI(Vue: GlobalAPI) {
  // config
  const configDef: Record<string, any> = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }

  console.log('--添加 Vue.config');
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  console.log('--添加 Vue.util');
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive,
  }

  console.log('--添加 Vue.set');
  Vue.set = set
  console.log('--添加 Vue.delete');
  Vue.delete = del
  console.log('--添加 Vue.nextTick');
  Vue.nextTick = nextTick

  // 2.6 explicit observable API
  console.log('--添加 Vue.observable');
  Vue.observable = <T>(obj: T): T => {
    observe(obj)
    return obj
  }

  console.log('--添加 Vue.options: .components, .directives, .filters');
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach((type) => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  console.log('--添加 Vue.options: .base');
  Vue.options._base = Vue

  console.log('--添加 内置组件 KeepAlive');
  extend(Vue.options.components, builtInComponents)

  initUse(Vue)
  initMixin(Vue)
  initExtend(Vue)
  initAssetRegisters(Vue)
}
