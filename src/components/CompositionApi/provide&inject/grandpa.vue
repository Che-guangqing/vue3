<template>
  <div>
    <p>Grandpa</p>
    <Father/>
    <p> 
      <!-- <button @click="changeName">change</button> -->
    </p>
  </div>
  
</template>

<script>
import { provide, readonly, ref } from 'vue'
import Father from './father.vue'


export default {
  name: 'Grandpa',
  components: {
    Father
  },

  setup() {
    const name = ref('张三')

    const changeName = () => {
      name.value = '李四'
    }

    provide('name', readonly(name))
    provide('changeName', changeName)  // 父组件可以提供方法, 让子组件修改name

    provide('age', '26')
    provide('hobby', 'travel')
    provide('career', 'Programmer')

    return {
      // changeName
    }
  },


}
</script>