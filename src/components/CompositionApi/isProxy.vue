<template>
  <div>
    <p>isProxy</p>
    <p>isReactive</p>
    <p>isProxy</p>

  </div>
</template>

<script>
import { isProxy, reactive, readonly, ref, isRef, isReactive, isReadonly } from '@vue/reactivity'
export default {

  setup() {

    // // isProxy
    // const reactiveData = reactive({ a:1 })
    // const readonlyData = readonly({ b:2 })
    // const refData = ref(0)
    // const obj = {c:3}
    // const originProxy = new Proxy({
    //   d: 4
    // }, {})

    // console.log(isProxy(reactiveData)); //true
    // console.log(isProxy(readonlyData)); //true
    // console.log(isProxy(refData)); //false
    // console.log(isProxy(obj)); // false
    // console.log(isProxy(obj)); // false


    // isReactive, isReadonly
    const state = reactive({
      name: 'cc'
    })

    const plan = readonly({ // 普通对象创建的只读proxy
      name: 'Mary'
    })

    // 如果该代理是 readonly 创建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true
    const stateReadonly = readonly(state)  // 响应式proxy创建的只读proxy

    console.log(isProxy(state), isReactive(state), isReadonly(state)); //true true false
    console.log(isProxy(plan), isReactive(plan), isReadonly(plan)); //true false true
    console.log(isProxy(stateReadonly), isReactive(stateReadonly), isReadonly(stateReadonly)); //true true true


  }
}
</script>

<style>

</style>