<template>
<div>
  <h1>{{name}}: {{info.age}} </h1>
  <p>
    <button @click="changeAge">changeAge</button>
  </p>
  <p>
    <button @click="changeName">changeName</button>
  </p>

</div>
  
</template>

<script>
import { reactive, toRefs, shallowReactive, isProxy, isReactive, shallowReadonly, isReadonly } from '@vue/reactivity'
export default {
  setup() {

    // shallowReactive  shallowReadonly  浅响应式

    const state = shallowReactive({
      name: '张三',
      info: {
        age: 18
      }
    })
    const changeAge = () => {
      state.info.age = 20
      console.log(state.info.age); //20 值改了，但是渲染的值没有变，不是响应式的
      console.log(isReactive(state.info)); //false
    }

    const changeName = () => {
      state.name = '李四' // 响应式的
    }


    const state1 = shallowReadonly({
      name1: '张三',
      info1: {
        age1: 18
      }
    })
    console.log(isReadonly(state1)); // true
    console.log(isReadonly(state1.info1)); // false



    return {
      ...toRefs(state),
      changeAge,
      changeName
    }

  }
}
</script>

<style>

</style>