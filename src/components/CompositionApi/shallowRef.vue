<template>
  <div></div>
</template>

<script>
import { ref, shallowRef, triggerRef, watchEffect} from 'vue';
export default {
  setup() {
    // shallowRef  triggerRef
    
    // const info= ref({
    //   name: '车车'
    // })
    // console.log(info);
    // info.value = {
    //   name: '哈哈'
    // }
    // // 此时给value赋值一个对象，这个对象也被代理，是响应式的
    // console.log(info.value); //Proxy {name: '哈哈'}


    const info1= shallowRef({
      name: '张三'
    })
    console.log(info1);
    info1.value = {
      name: '李四'
    }
    // 此时给value赋值一个对象，这个对象是普通对象，没有响应式
    console.log(info1.value); //{name: '李四'}

    let name = ''
    watchEffect(() => {
      name = info1.value.name
      console.log(name); 
    })
    info1.value.name = '张三' //在此修改 不会触发watchEffect监听

    triggerRef(info1) // 会触发watchEffect


  },
}
</script>