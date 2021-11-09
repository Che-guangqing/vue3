<template>
  <div>
    DD
  </div>
</template>

<script>
import {  reactive, toRef, toRefs } from '@vue/reactivity'

function useDoSth(name) {
  return `my name is ${name.value}`
}
export default {
  // toRef , toRefs, 

  // toRef可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。
  setup() {

    const state = reactive({
      name: '车车',
      age: 18
    })

    const nameRef = toRef(state, 'name')

    state.name = '车车(⊙o⊙)'
    console.log(state.name);  // '车车(⊙o⊙)'
    console.log(nameRef.value); // '车车(⊙o⊙)'

    nameRef.value = '车车'
    console.log(state.name);  // '车车'
    console.log(nameRef.value); // '车车'

    const say = useDoSth(nameRef)
    console.log(say);
  },
}
</script>