<template>
  <div></div>
</template>

<script>
import { onBeforeUpdate, ref, watchEffect } from '@vue/runtime-core'
export default {
  setup() {
    // 立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数
    const count = ref(0)

    setTimeout(() => {
      count.value  = 1
    }, 1000);
    setTimeout(() => {
      count.value  = 2
    }, 3000);
    watchEffect(() => {
      // 同时响应式追踪其依赖
      console.log(count.value); // 0  1  2
    }, {
      onTrack(e) {
        console.log(e, 'onTrack');
      },
      onTrigger(e) {
        // 当依赖改变的时候会执行
        console.log(e, 'onTrigger');
      }
    })


    // // watchEffect在组件被卸载的时候回自动停止监听，但是watchEffect可以返回一个函数，执行此函数就会停止监听
    // const stop = watchEffect((onInvalidate) => {
    //   console.log(count.value); // 0 1

    //   onInvalidate(() => {
    //     // 即将要执行监听函数(console.log(count.value);)之前，先执行onInvalidate
    //     console.log('onInvalidate is triggered');
    //   })
    // })

    // onBeforeUpdate(() => {
    //   console.log('onBeforeUpdate');
    // })

    // setTimeout(() => {
    //   // stop()
    // }, 2000);

    return {
      count
    }

  },
}
</script>