<template>
  <div>
    <p>Father</p>
    <Son :age='age' ref="son"/>

    <button @click="change">change</button>
  </div>
  
</template>

<script>
import Son from './son.vue'
export default {
  name: 'Father',
  components: {
    Son
  },
  props: {
    age: Number
  },


  methods: {
    change() {
      this.$refs.son.changCount()
    }
  }

}
</script>