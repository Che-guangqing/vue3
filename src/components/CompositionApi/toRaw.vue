<template>
  <div></div>
</template>

<script>
import { reactive, toRaw } from '@vue/reactivity'
export default {
  setup() {
    const obj = {
      name: '张三',
      age: 18
    }

    const proxyObj = reactive(obj)
    console.log(proxyObj);

    const newObj = toRaw(proxyObj)
    console.log(newObj);
    console.log(newObj === obj); //true

  }
}
</script>

<style>

</style>