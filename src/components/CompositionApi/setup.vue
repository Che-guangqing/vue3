<template>
  <div>
    <!-- <p>
      <span>{{count}}</span> 
      <span>{{obj.name}}</span>
      <span>{{name}}</span>
    </p> -->
    <hr />
    <p>{{title}}</p>

    <hr />
    <p>{{attrs.title}}</p>

    <hr />
    <p>
      <button @click="add">add</button>
      {{count}}
    </p>


  </div>
</template>

<script>
import { reactive, ref, toRefs, h, watchEffect, watch } from 'vue'
export default {
  name: 'Setup',

  // props不需要使用ref包裹使其变成响应式，props本身就是响应式的， props更新会传递一个新的props过来
  // 为什么不把props放进setup第二个参数context中作为其中有个属性？ props频繁使用，单独给props做类型推断
  props: {
    title: String,
    count: Number
  },

  // setup({ title }) {}  ❌ lose reactivity
  // setup( props, {attrs, emit, slots} ) {}  context可以结构
  setup(props, context) {
    // const { title } = props  ❌ lose reactivity
    // const {attrs, emit, slots} = context   context可以结构

    // const count = ref(0)
    // setTimeout(() => {
    //   count.value = 1
    // }, 1000);
    // // ref函数生成的数据count是个对象，在这里修改使用count时要用.value得到，但是return时候，自动会返回count.value，所以在模板中使用不需要通过.value取值
    // console.log(count);
    // const obj = reactive({
    //   name: 'cc'
    // })
    // return {
    //   count,
    //   obj,
    //   // 展开对象，模板中直接用对象的属性，不用toRefs方法会使数据失去响应式
    //   ...toRefs(obj),
    // }


    // 在setup作用域中，可以返回一个render函数
    // return () => h('h2', [count.value])


    // // 可以在监测props更新的时候做些什么
    // // watchEffect会监测到组件初始化时及变化时都会执行
    // watchEffect(() => {
    //   console.log(props.title);
    // })
    // // watch有两个参数，第一个参数要返回监测的值，第二个参数中可以拿到变化之后的新值，变化的时候执行
    // watch(() => {
    //   return props.title
    // }, (newValue) => {
    //   console.log(newValue);
    // })
    // // props.title = 'hhh' ❌更改props要去提供props的地方更改

    const {attrs, emit, slots} = context
    console.log(context);
    // 修改父组件传递的count
    const add = () => {
      emit('add', 100)
    }
    return {
      // 当父组件传递的值，在子组件中没有用props接收，这个值就会出现在attrs中，同样可以返回出去使用title
      attrs,
      add
    }
    
  },
}
</script>


<style scoped>
  p{
    line-height: 40px;
    background: peachpuff;
  }
  span{
    margin-right: 40px;
  }
</style>