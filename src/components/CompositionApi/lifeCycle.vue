<template>
  <div>
    <h1>{{count}}</h1>
  </div>
</template>

<script>
import { getCurrentInstance, onBeforeMount, onBeforeUpdate, onMounted, onUpdated, ref, watch, watchEffect } from '@vue/runtime-core'
export default {
  setup() {
    const count = ref(0)


    setTimeout(() => {
      count.value = 1
    }, 2000);

    console.log('setup');


    onBeforeMount(() => {
      console.log('onBeforeMount');
    })

    onMounted(() => {
      console.log('onMounted');
    })

    onUpdated(() => {
      console.log('onUpdated');
    })

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate');
      // onBeforeUpdate默认情况下 在watchEffect之后执行
    })

    watchEffect(() => {
      const a = count.value
      console.log('watchEffect');
    }, {
      flush: 'post'
      // 默认情况下,  flush: 'pre'：  watchEffect在onBeforeUpdate之前执行
      // flush: 'post': watchEffect在onBeforeUpdate之后执行
    })





    // const instance = getCurrentInstance()
    // console.log(instance);

    return {
      count,
    }
  },
}
</script>