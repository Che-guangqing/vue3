<template>
  <div>
    <p>Son</p>

    <h4>{{name}}</h4>
    <h4>{{age}}</h4>
    <h4>{{hobby}}</h4>
    <h4>{{career}}</h4>
    <p>
      <button @click="changeName">change</button>
      <button @click="injectChangeName">injectChangeName</button>
    </p>


  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  name: 'Son',
  setup() {
      let name =  inject('name', '默认值name'),
          changeName = inject('changeName'),
          age =  inject('age', '默认值age'),
          hobby =  inject('hobby', '默认值hobby'),
          career =  inject('career', '默认值career');


    const injectChangeName = () => {
      name.value = '哈哈'
      // 也可以修改父组件提供的数据 ,但是不建议
    }

    return {
      name,
      age,
      hobby,
      career,
      changeName,
      injectChangeName
    }
  },
  // inject: ['name', 'age', 'hobby', 'career']

}
</script>