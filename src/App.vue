<template>
  <div class="app">
    <!-- <Setup :title='title' :count="count" @add='add' /> -->
    <Ref />

  </div>
</template>
                                                                                                                                                                                
<script>

import Setup from './components/CompositionApi/setup.vue'
import Reactive from './components/CompositionApi/reactive.vue'
import Ref from './components/CompositionApi/ref.vue'


import { ref } from 'vue'

export default {
  name:'APP',
  components: {
    Setup,
    Reactive,
    Ref
  },

  setup() {
    // Setup
    const title = ref('我是标题')
    const count = ref(0)

    setTimeout(() => {
      title.value = '我是标题 plus'
    }, 2000);

    const add  = (val) => {
      count.value += val
    }

    // Reactive
    
    return {
      // Setup
      title,
      count,
      add,

      // Reactive
    }
  },

}
</script>

<style>
.app{
  padding: 20px;
  font-size: 20px;
}
</style>
