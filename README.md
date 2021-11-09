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
   - 为了使用composition api
   - 在初始化属性之后，boforecreated之前调用
   - 在模板中使用的任何属性方法都要在setup中返回
   - 在setup作用域中，也可以返回一个render函数

   ## ref
   -  ref函数生成的数据是个对象，读取修改数据时要用.value获取，但是return时会自动会返回count.value，所以在模板中使用不需要通过.value取值

   - 如果使用ref函数包装对象` const obj = ref({a:1}) `, 会对obj.value用proxy代理,即用reactive包装过的深度响应式数据
   - 如果使用reactive包装对象, 对象的属性是用ref包装的数据` const obj = reactive( {count:ref(0)} ) `, ref会自己展开.value; 即 `const obj = reactive( {count:ref(0).value} )`, obj.count就可获取
   - 如果使用reactive包装数组,或其他原生的集合类型如Map, 在数组或map中使用ref函数包装的数据, `const arr = reactive([ref(0)])`, ref不会自己展开, arr[0].value才可获取