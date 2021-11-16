<template>
  <div></div>
</template>

<script>
import { isProxy, isReactive, markRaw, reactive } from '@vue/reactivity'
export default {
  setup() {

    const obj = {
      a:1,
      b:2,
      more: {
        c:3,
        d:4
      }
    }

    // const rawObj = markRaw(obj)
    // console.log(rawObj);
    // console.log(obj === rawObj); // true

    // const proxyObj = reactive(rawObj)
    // console.log(proxyObj); // 还是普通对象
    // console.log(isReactive(proxyObj.more)); // false


    // const newProxyObj = reactive( { proxyObj } )
    // console.log(newProxyObj); // 响应式对象对象
    // console.log(newProxyObj.proxyObj); // 普通对象

    // console.log(isReactive(newProxyObj)); // true
    // console.log(isReactive(newProxyObj.proxyObj)); // false


    // markRaw 和shallowXXX API 使你可以有选择地退出默认的深度响应式/只读转换模式，并将原始的未被代理的对象嵌入状态图中。它们可以根据情况灵活运用
    // 只是浅度的标记对象，使其永远不会转换为proxy
    const rawObj = markRaw(obj)
    const proxyObj = reactive({
      nested: rawObj.more
    })
    console.log(proxyObj.nested);
    // 虽然 `rawObj` 被标记为原始，但 rawObj.more 不是。
    console.log(obj.more === proxyObj.nested); // false

  }
}
</script>

<style>

</style>