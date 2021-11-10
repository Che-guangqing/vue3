<template>
  <div>
    <p>{{foo}} - {{bar}}</p>
    <p> {{name}}- {{age}}</p>
  </div>
</template>

<script>
import {  isRef, reactive, toRef, toRefs } from '@vue/reactivity'

function useDoSth(name) {
  return `my name is ${name.value}`
}

function useFeatureX() {
  const state = reactive({
    foo: 1,
    bar: 2
  })

  // 操作 state 的逻辑

  // 返回时转换为ref
  return toRefs(state)
}

export default {
  // toRef , toRefs, 
  // toRefs 只会为源对象中包含的 property 生成 ref。如果要为特定的 property 创建 ref，则应当使用 toRef

  setup() {
    const state = {
      name: '车车',
      age: 18
    }


    // toRef可以用来为源响应式对象上的某个 property 新创建一个 ref。然后，ref 可以被传递，它会保持对其源 property 的响应式连接。
    const nameRef = toRef(state, 'name')
    state.name = '车车(⊙o⊙)'
    console.log(state.name);  // '车车(⊙o⊙)'
    console.log(nameRef.value); // '车车(⊙o⊙)'
    nameRef.value = '车车'
    console.log(state.name);  // '车车'
    console.log(nameRef.value); // '车车'
    // 当你要将 prop 的 ref 传递给复合函数时，toRef 很有用：   
    const say = useDoSth(nameRef)
    console.log(say);
    


    // toRefs将响应式对象转换为普通对象，其中结果对象的每个 property 都是指向原始对象相应 property 的 ref。
    const stateAsRefs = toRefs(state)


    console.log(stateAsRefs);
    // ref 和原始 property 已经“链接”起来了
    state.age = 19
    console.log(stateAsRefs.age.value);
    stateAsRefs.age.value = 20
    console.log(state.age);

    // 当从组合式函数返回响应式对象时，toRefs 非常有用，这样消费组件就可以在不丢失响应性的情况下对返回的对象进行解构/展开：
    let { foo, bar } = useFeatureX() // 可以在不失去响应性的情况下解构
    setTimeout(() => {
      foo.value += 20
    }, 1000);
    console.log(foo);

    console.log(isRef(nameRef));
    console.log(isRef(stateAsRefs));
    console.log(isRef(stateAsRefs.name));

    // stateAsRefs里的属性是ref  可以展开返回 ，不会失去响应式
    return {
       foo, bar , ...stateAsRefs
    }

  },
}
</script>