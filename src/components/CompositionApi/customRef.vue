<template>
  <div>
    <span>{{text}}</span>
    <input type="text" v-model="text">
  </div>
</template>

<script>
import { customRef } from '@vue/reactivity'

function useDebouncedRef(value, delay = 500) {
  let timer = null

  return customRef((track ,trigger )=> {
    return {
      get () {
        track()
        return value
      },
      set(newVal) {
        clearTimeout(timer)
        timer = setTimeout(() => {
          value = newVal
          trigger()
        },delay)
      }
    }
  })

}

export default {
  setup() {
    const text = useDebouncedRef('', 1000)
    return {
      text
    }
  },
}
</script>