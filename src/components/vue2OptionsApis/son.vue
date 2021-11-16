<template>
  <div>
    <p>Son</p>
    <p>{{age}}</p>
    <p>{{text}}</p>
    <p>{{text1}}</p>

  </div>
</template>

<script>
export default {
  name: 'Son',
  props: {
    age: Number
  },
  inject: ['text', 'text1'],
  data() {
    return {
      count: 0
    }
  },
  methods: {
    changCount() {
      this.count ++
    }
  }
}
</script>