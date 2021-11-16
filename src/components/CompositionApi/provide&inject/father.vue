<template>
  <div>
    <p>Father</p>
    <Son />
  </div>
  
</template>

<script>
import Son from './son.vue'
export default {
  name: 'Father',
  components: {
    Son
  },

}
</script>