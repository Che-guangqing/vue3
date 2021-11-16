<template>
  <div>
    <p>姓名: {{name}}</p>
    <p>年龄: {{age}}</p>

    <button @click="change">change</button>
  </div>
</template>

<script>
import { onBeforeUpdate, reactive, ref, watch } from 'vue';
export default {
  setup() {
    // 默认情况下，它也是惰性的，即只有当被侦听的源发生变化时才执行回调。
    //  const count = ref(0)
    //  const obj = reactive({a:1})

    //  setTimeout(() => {
    //    count.value ++
    //    obj.a = 11
    //  }, 1000);
     
    //  watch(() => {
    //    return count.value
    //  }, (newValue, oldValue) => {
    //    console.log(newValue, oldValue);
    //  })

    // ref
    // watch(count, (newValue, oldValue) => {
    //   console.log(newValue, oldValue);
    // })

    // // reactive
    // watch(() => obj.a, (newValue, oldValue) => {
    //   console.log(newValue, oldValue);
    // })

    // 观测多个值
    const name = ref('张三')
    const age = ref(18)

    const stop = watch([name, age], (newValue, oldValue, onInvalidate) => {
      console.log(newValue, oldValue);

      onInvalidate(() => {
        console.log('onInvalidate is trigger');
      })
    }, {
      flush: 'post',
      onTrack(e) {
        console.log(e, 'ontrack');
      },
      onTrigger(e) {
        console.log(e, 'ontrigger');
      }
    })

    // setTimeout(() => {
    //   name.value = '李四' //  ['李四', 19]  ['张三', 18]
    // }, 1000);

    // setTimeout(() => {
    //   age.value = 19      //  ['李四', 19]  ['李四', 18]
    // }, 2000);


    // 如果你在同一个函数里同时改变这些被侦听的来源，侦听器仍只会执行一次：
    const change = () => {
      name.value = '李四'
      age.value ++ 
      //  ['李四', 19] (2) ['张三', 18]
    }

    setTimeout(() => {
      stop()
    }, 5000);

    onBeforeUpdate(() => {
      console.log('onBeforeUpdate');
    })


    return {
      name,
      age,
      change
    }

  },
}
</script>