<template>
  <div>Unref</div>
</template>
<script>
import { isRef, ref, unref } from '@vue/reactivity'

export default {
  setup() {
    // 如果参数是一个 ref，则返回内部值，否则返回参数本身。
    // 这是 val = isRef(val) ? val.value : val 的语法糖函数。
    const info1 = {
      name: '车车',
      age: 18
    }

    const info2 = ref({
      name: '车车',
      age: 18
    })

    // 判断是否用ref包装
    // isRef(ref(0)) true  ;  isRef(0)  false
    const res1 = isRef(info1) ? info1.value : info1
    console.log(res1);

    const res2 = unref(info1)
    console.log(res2);
  },
}
</script>