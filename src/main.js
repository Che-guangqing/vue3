import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
// app.use()
app.mount('#app')

console.log(createApp(App).config);


// const vm = new Vue({
//   data() {},
//   methods: {},
// })
// vm.$mount('#app')
// Vue.use()

