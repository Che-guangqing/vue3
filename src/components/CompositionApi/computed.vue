<template>
  <div>computed </div>
</template>

<script>
import { computed,  ref } from '@vue/reactivity'
export default {
  setup() {
    const count = ref(1)


    // 接受一个 getter 函数，并根据 getter 的返回值返回一个不可变的响应式 ref 对象。
    // const usperCount = computed(() => {
    //   return  count.value + 1
    // })
    // usperCount ++ // usperCount接收一个getter函数， 只读
    // console.log(usperCount);


    // 或者，接受一个具有 get 和 set 函数的对象，用来创建可写的 ref 对象。
    const data = computed({
      get: () =>  count.value + 1,
      set: (val) => {
        console.log(val,'我修改了count的值');
      }
    })

    console.log(data.value);
    data.value = 2

  },
}
</script>