<template>
  <div>
    <p>Grandpa</p>
    <Father :age='age'/>
  </div>
  
</template>

<script>
import Father from './father.vue'


export default {
  name: 'Grandpa',
  components: {
    Father
  },
  data() {
    return {
      age: 100,
      text1: '组件实例上的数据'
    }
  },
  // provide: {
  //   text: 'provide传值',
  //   // text1: this.text1  // ❌ 不能这样,可以把provide转换成函数, 因为传递父组件实例上的属性过去, 可能会在子组件中意外的改变这个引用,所以需要和data一样,用函数形成一个作用域
  // },
  provide() {
    return {
      text: 'provide传值',
      text1: this.text1,
    }
  },
  mounted() {
    this.text1 = '哈哈哈哈'
    console.log(this.text1); //失去响应式
  }

}
</script>