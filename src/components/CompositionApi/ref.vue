
<template>
  <div>
    {{count}}
    {{b}}
    {{obj1.count}}
  </div>
</template>

<script>
import { reactive, ref, toRefs } from 'vue'

export default {
  name: 'Ref',

  setup() {
    // 1.ref函数生成的数据count是个对象，在这里读取修改count时要用.value获取，但是return时候，自动会返回count.value，所以在模板中使用不需要通过.value取值
    const count = ref(0)
    console.log(count);
    count.value = 1
    console.log(count.value);

    // 如果用ref函数,传入对象,他会用reactive函数去实现深度的响应式数据
    const obj = ref({
      a:1, b:2
    })
    console.log(obj.value.a);
    // obj.value会用proxy代理,即用reactive包装过的深度响应式数据

    // ref()数据作为reactive()对象的某个属性来说,会自动展开.value
    const obj1 = reactive({
      count
    })
    obj1.count = 3
    console.log(obj1.count);


    const otherCount = ref(9)
    const obj2 = reactive({
      count
    })
    obj2.count = otherCount
    console.log(obj2.count); // 9
    console.log(count.value); // 3

    // 当你把ref用在reactive的属性中使用,当reactive中传的时数组,或其他原生的集合类型如Map, 访问的时候ref不会自动展开.value
    const arr = reactive([ref(0)])
    console.log(arr[0].value);

    const map = reactive(new Map([['foo',ref(8)]]))
    console.log(map.get('foo').value);

    return {
      count,
      ...toRefs(obj.value),
      obj1
    }
  },
}
</script>