<template>
  <div>
    <div>{{count}}</div>
    <div>
      <button @click="add">add</button>
      <button @click="cut">cut</button>
    </div>
  </div>
</template>

// optionsa api 和 compositions api 对比
                                                                                                                                                                                
<script>
import { ref } from 'vue'

const useCompute = (count) => {
    const add = () => {
      count.value ++
    }
    const cut = () => {
      count.value --
    }
    return {
      add,
      cut
    }
}

export default {
  name:'APP',

  // Composition API
  setup() {
    const count = ref(0)
    const { add, cut } = useCompute(count)
    // const add = () => {
    //   count.value ++
    // }
    // const cut = () => {
    //   count.value --
    // }
    return {
      count,
      add,
      cut
    }
  },



  // options API
  // data() {
  //   return {
  //     count: 0
  //   }
  // },
  // methods: {
  //   add() {
  //     this.count ++ 
  //   },
  //   cut() {
  //     this.count --
  //   }
  // }
}
</script>

