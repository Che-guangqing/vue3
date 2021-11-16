# 使用Vue 3
### 安装脚手架vite
 ` npm init vite vue3 -- --template vue 或者 yarn init vite vue3 --template vue `
### 安装脚手架vue-cli
 ` npm install -g @vue/cli  或者 yarn global add @vue/cli `


# 变化

 -  ref属性 
 -  this.$children: del
 -  v-slot: 属性 -> 指令
 -  响应式
 -  生命周期
 -  this.$emit('name', data) -> context.emit('name', data)

 ` 在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。 在beforecreate之前`



# vite

 ### webpack
  每次修改，都会进行编译打包
 ### vite
  - 打包原因之一是浏览器可能不支持es6/7的语法，转成js，以及scss转成css等，
  - 开发过程中不进行打包，用原生es6 module  import引入
  - 只适配vue3.0及不能用不能适配vue3的库
  - 创建 ` npm init vite-app <name>  or  yarn create vit-app <name>`


  vite适配vue2 : vite-plugin-vue2
 
 
#  Options API （选项api, 配置项api）
  - 分散，逻辑不内聚，横向拆分

#  Composition API （组合api, 框架设计模式）
  - 基于函数
  - 要用哪个hook就从vue导入哪个hook, 在setup的作用域中使用他` { watch, computed, onMounted } from  'vue' `

   ## setup
   - 为了使用composition api
   - 在初始化属性之后，boforecreated之前调用
   - 在模板中使用的任何属性方法都要在setup中返回
   - 在setup作用域中，也可以返回一个render函数
   - 可以接收两个参数 
     - 参数1：props, 不要在接收参数时解构props, 会使其失去响应式；更改props要去提供props的地方更改
     - 参数2：context上下文, 可以解构 ` const {attrs, emit, slots} = context `; attrs: 当父组件传递的值，在子组件中没有用props接收，这个值就会出现在attrs对象中; 子组件更改props需要emit事件，让父组件自己修改

   ## reactive
   - 

   ## readonly
   - 接受一个对象 (响应式或纯对象) 或 ref 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的

   
   ## ref
   -  ref函数生成的数据是个对象，读取修改数据时要用.value获取，但是return时会自动会返回count.value，所以在模板中使用不需要通过.value取值

   - 如果使用ref函数包装对象` const obj = ref({a:1}) `, 会对obj.value用proxy代理,即用reactive包装过的深度响应式数据
   - 如果使用reactive包装对象, 对象的属性是用ref包装的数据` const obj = reactive( {count:ref(0)} ) `, ref会自己展开.value; 即 `const obj = reactive( {count:ref(0).value} )`, obj.count就可获取
   - 如果使用reactive包装数组,或其他原生的集合类型如Map, 在数组或map中使用ref函数包装的数据, `const arr = reactive([ref(0)])`, ref不会自己展开, arr[0].value才可获取

   ## isRef
   - 检查值是否为一个 ref 对象 `isRef(ref(0)) true  ;  isRef(0)  false`

   ## unref
   - 如果参数是一个 ref, 则返回内部值(数据.value), 否则返回参数本身。是`val = isRef(val) ? val.value : val`的语法糖函数。

   ## toRef
   - `toRef(reactive对象, reactive对象的某个属性)`,toRef可以用来为源reactive对象上的某个属性新创建一个ref。然后，ref可以被传递，它会保持对其源属性的响应式连接。

   ## toRefs
   -  `toRefs(reactive对象)`, 将reactive对象转换为普通对象，其中结果对象的每个属性都是指向原始对象相应属性的ref。
   > toRefs会为源reactive对象中的所有属性变成ref。如果要为特定的属性创建ref，则应当使用toRef
   
   ## customRef
   - 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并且应该返回一个带有 get 和 set 的对象。可以实现一个防抖函数

   ## shallowRef
   -  创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。`const info= ref( { name: '张三'} ); info.value =  name: '李四' }; info.value => Proxy {name: '李四'}`; `const info= shallowRef( { name: '张三'} ); info.value =  name: '李四' }; info.value => {name: '李四'}`

   ## triggerRef
   - 手动执行与 shallowRef 关联的任何作用 (effect)。

  ## isReactive
  - 检查对象是否是由 reactive 创建的响应式代理。

  ## computed
  - 接受一个getter函数，并根据 getter 的返回值返回一个只读的响应式ref对象。
  - 接受一个具有 get 和 set 函数的对象，用来创建可写的 ref 对象。



  ## watchEffect
  - 会进行依赖收集，凡是依赖的数据的变化都会检测到然后执行此函数，立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数
  - 此函数在组件被卸载的时候会自动停止监听，但是watchEffect可以返回一个函数，执行此函数就会停止监听，
  - 未理解 清除副作用 和  副作用刷新时机 多查资料理解 💢 💢

  ## watch
  -  默认情况下，它也是惰性的，即只有当被侦听的源发生变化时才执行回调, 第一个参数返回要观测的值，第二个参数是观测到变化的回调
  - 观测多个值，第一个参数可以传数组

  ## isProxy
  -  检查对象是否是由reactive 或 readonly 创建的proxy

  ## isReactive
  -  检查对象是否是由reactive创建的响应式代理, 如果该代理是 readonly 创建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true

  ## isReadonly
  -  检查对象是否是由reactive 或 readonly 创建的proxy

  ## shallowReactive
  -  创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换

  ## shallowReadonly
  -  创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)。
  
  ## toRaw
  -  把响应式对象转换成一个普通的对象

  ## markRaw
  -  标记一个对象，使其永远不会转换为 proxy。返回对象本身。
  >  只是浅度的标记对象使其永远不会转换为proxy；可以让有些嵌套的对象避免响应式的包装

  ## 生命周期