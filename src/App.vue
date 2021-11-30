<template>
  <div class="app">
    <!-- <Setup :title='title' :count="count" @add='add' /> -->
    <WatchEffect />

  </div>
</template>
                                                                                                                                                                                
<script>

import Setup from './components/CompositionApi/setup.vue'
import Reactive from './components/CompositionApi/reactive.vue'
import Ref from './components/CompositionApi/ref.vue'
import Unref from './components/CompositionApi/unref.vue'
import ToRef from './components/CompositionApi/toRef.vue'
import CustomRef from './components/CompositionApi/customRef.vue'
import ShallowRef from './components/CompositionApi/shallowRef.vue'
import Computed from './components/CompositionApi/computed.vue'
import Readonly from './components/CompositionApi/readonly.vue'
import WatchEffect from './components/CompositionApi/watchEffect.vue'
import Watch from './components/CompositionApi/watch.vue'
import IsProxy from './components/CompositionApi/isProxy.vue'
import ShallowReactive from './components/CompositionApi/shallowReactive.vue'
import ToRaw from './components/CompositionApi/toRaw.vue'
import MarkRaw from './components/CompositionApi/markRaw.vue'
import lifeCycle from './components/CompositionApi/lifeCycle.vue'

import vue2Provide from './components/vue2OptionsApis/grandpa.vue'
import vue3Provide from './components/CompositionApi/provide&inject/grandpa.vue'





import { ref, watch, watchEffect } from 'vue'
import Button from '../../element-plus-dev/docs/examples/config-provider/button.vue'

export default {
  name:'APP',
  components: {
    Setup,
    Reactive,
    Ref,
    Unref,
    ToRef,
    CustomRef,
    ShallowRef,
    Computed,
    Readonly,
    WatchEffect,
    Watch,
    IsProxy,
    ShallowReactive,
    ToRaw,
    MarkRaw,
    lifeCycle,
    vue2Provide,
    vue3Provide,
    Button
  },
  mounted() {
    // console.log(this);
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
