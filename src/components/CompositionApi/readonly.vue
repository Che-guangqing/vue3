<template>
  <div></div>
</template>

<script>
import { reactive, readonly, ref} from '@vue/reactivity'
import { watchEffect } from '@vue/runtime-core'
export default {
  setup() {
    const reactiveObj = reactive({
      a:1,
      b:2,
      c: {
        d: 3,
        e: 4
      }
    })

    const newReactiveObj = readonly(reactiveObj)

    watchEffect(() => {
      console.log(newReactiveObj.c.e);
    })

    reactiveObj.a = 11
    reactiveObj.c.d = 13 // target is readonly
    console.log(reactiveObj);

    newReactiveObj.a = 22 // target is readonly
    newReactiveObj.c.d = 23 // target is readonly

    console.log(newReactiveObj);

    // 与 reactive 一样，如果任何 property 使用了 ref，当它通过代理访问时，则被自动解包：
    const raw = {
      count: ref(123)
    }
    const  copy = readonly(raw)
    console.log(raw.count.value) // 123
    console.log(copy.count) // 123
  },
}
</script>