# 一、使用Vue3
### 安装脚手架vite
 ` npm init vite@latest <project-name> --template vue 或者 yarn create vite <project-name> --template vue `
### 安装脚手架vue-cli
 ` npm install -g @vue/cli  或者 yarn global add @vue/cli `

# 二、Vue2 到 vue3变化
## 1、Vue构造函数 -> createApp()
  - 如果一个页面有多个vue应用时，vue2全局的配置在Vue构造函数上，会影响两个应用` Vue.use() 、Vue.mixin()、 Vue.component() ` ；
  - vue3使用createApp,`createApp(根组件).use()`
## 2、Vue构造函数上的方法 -> vue实例上
  - Vue.use(); ->  app.use()
  - Vue.prototype.$api = api; ->  app.config.globalProperties.$api
  - 实例属性
  - 实例方法

## 3、this
  指向组件实实例   ->  指向组件代理对象
  - vue2: 访问属性 -> vue2组件实例 -> 返回属性值；  
  - vue3: 访问属性 -> 组件代理对象 -> 访问属性 -> 组件实例 -> 返回属性值 -> 组件代理对象 -> 返回属性值

## 4、生命周期
  - vue2和vue3都在 beforeCreate 之后 created之前 注入响应式(vue2新增属性 $set)、在setup中，响应式api都变成了函数，不需要在次注入，所以在setup中，没有beforeCreate，reated生命周期
## 5、看vue2迁移vue3文档
  > 升级vue-cli; 检查所用的库有没有升级对应vue3版（element-plus）

  - (1) v-bind.sync替换为v-model
          :visible.sync="showModify"  -> v-model="showModify"
  - (2) vue2 v-for优先级高于v-if，但是官方不推荐同时使用，vue3 v-if高于v-for ,展示的数据需要循环列表， 但是要通过v-if筛选列表时建议通过计算属性建据
  - (3) 允许使用多个根节点
  - (4) 异步组件 defineAsyncComponent 
  - (5) teleport
  - (6) 插槽（属性 -> 指令）
          具名插槽： <slot name='title'></slot>  ->  <template slot='title'></template>
          在slot上绑定数据使用作用域插槽：<slot name='title' :data='data'></slot>  ->   <template slot='title' slot-scope='scoped'>{{scoped.data}}</template>
          vue3合并两种插槽： <template v-slot:content="scoped">{{scoped.data}}</template>  简写： #
          <el-dropdown><el-table>中所有的slot-scope="scope" => #default="scope"
  - (7) ref属性获取节点对象
            ref="dialog"  => this.$refs.dialog 
            :ref="dialog"  也可以写一个相同名称的方法，会自动调用这个方法
            dialog(el) {
              if(el) {
                console.log(el, 'ref el');
                this.refArr.push(el)
              }
            }
            this.refArr[0].showDialog()
  - (8) 删除filters, 建议使用方法调用或计算属性替代
  - (9) 删除$children, 建议使用上条ref属性代替


## 6、options api  ->  composition api
  - optionsApi分散，逻辑不内聚，横向拆分
  - compositionApi基于函数
 
# 三、composition api

## 1、setup (作用, this, 生命周期, 返回值)
  - 为了使用composition api
  - 在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data   property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取。
  - 在初始化属性之后，boforecreated之前调用
  - 在模板中使用的任何属性方法都要在setup中返回, 在setup作用域中，也可以返回一个render函数
  - 可以接收两个参数:
      - 参数1：props, 不要在接收参数时解构props, 会使其失去响应式；更改props要去提供props的地方更改
      - 参数2：context上下文, 可以解构 ` const {attrs, emit, slots} = context `; attrs: 当父组件传递的值，在子组件中没有用props接收，这个值就会出现在attrs对象中; 子组件更改props需要emit事件，让父组件自己修改
     
## 2、与mixin对比
  - 可以聚合功能，但是一个聚合无法使用另一个聚合的东西, 数据来源不明确

## 3、  
   reactive和ref、响应式、 api介绍

  - (1) reactive、ref、readonly、computed(缓存)、watchEffect(依赖收集)、watch(监控ref 和 reactive时，第 一个参数; 检测的是`响应式数据`)、
  - (2) isProxy、isReactive、isReadonly、isRef、
  - (3) unref(isRef(val) ? val.value : val )、toRef、toRefs、
  - (4) shallowReactive、shallowReadonly、 customRef、shallowRef、triggerRef、toRaw、 markRaw

   #### reactive
   - 

   #### isReactive
  - 检查对象是否是由 reactive 创建的响应式代理。

   #### readonly
   - 接受一个对象 (响应式或纯对象) 或 ref 并返回原始对象的只读代理。只读代理是深层的：任何被访问的嵌套 property 也是只读的

   #### isProxy
  -  检查对象是否是由reactive 或 readonly 创建的proxy

   #### isReactive
  -  检查对象是否是由reactive创建的响应式代理, 如果该代理是 readonly 创建的，但包裹了由 reactive 创建的另一个代理，它也会返回 true

   #### isReadonly
  -  检查对象是否是由reactive 或 readonly 创建的proxy

   #### shallowReactive
  -  创建一个响应式代理，它跟踪其自身 property 的响应性，但不执行嵌套对象的深层响应式转换

   #### shallowReadonly
  -  创建一个 proxy，使其自身的 property 为只读，但不执行嵌套对象的深度只读转换 (暴露原始值)。

   #### ref
   - ref函数生成的数据是个对象，读取修改数据时要用.value获取，但是return时会自动会返回count.value，所以在模板中使用不需要通过.value取值

   - 如果使用ref函数包装对象` const obj = ref({a:1}) `, 会对obj.value用proxy代理,即用reactive包装过的深度响应式数据
   - 如果使用reactive包装对象, 对象的属性是用ref包装的数据` const obj = reactive( {count:ref(0)} ) `, ref会自己展开.value; 即 `const obj = reactive( {count:ref(0).value} )`, obj.count就可获取
   - 如果使用reactive包装数组,或其他原生的集合类型如Map, 在数组或map中使用ref函数包装的数据, `const arr = reactive([ref(0)])`, ref不会自己展开, arr[0].value才可获取

   #### isRef
   - 检查值是否为一个 ref 对象 `isRef(ref(0)) true  ;  isRef(0)  false`

   #### unref
   - 如果参数是一个 ref, 则返回内部值(数据.value), 否则返回参数本身。是`val = isRef(val) ? val.value : val`的语法糖函数。

   #### toRef
   - `toRef(reactive对象, reactive对象的某个属性)`,toRef可以用来为源reactive对象上的某个属性新创建一个ref。然后，ref可以被传递，它会保持对其源属性的响应式连接。

   #### toRefs
   -  `toRefs(reactive对象)`, 将reactive对象转换为普通对象，其中结果对象的每个属性都是指向原始对象相应属性的ref。
   > toRefs会为源reactive对象中的所有属性变成ref。如果要为特定的属性创建ref，则应当使用toRef
   
   #### customRef
   - 创建一个自定义的 ref，并对其依赖项跟踪和更新触发进行显式控制。它需要一个工厂函数，该函数接收 track 和 trigger 函数作为参数，并且应该返回一个带有 get 和 set 的对象。可以实现一个防抖函数

   #### shallowRef
   - 创建一个跟踪自身 .value 变化的 ref，但不会使其值也变成响应式的。`const info= ref( { name: '张三'} ); info.value =  name: '李四' }; info.value => Proxy {name: '李四'}`; `const info= shallowRef( { name: '张三'} ); info.value =  name: '李四' }; info.value => {name: '李四'}`

   #### triggerRef
   - 手动执行与 shallowRef 关联的任何作用 (effect)。


   #### computed
  - 接受一个getter函数，并根据 getter 的返回值返回一个只读的响应式ref对象。
  - 接受一个具有 get 和 set 函数的对象，用来创建可写的 ref 对象。

   #### watchEffect
  - 会进行依赖收集，凡是依赖的数据的变化都会检测到然后执行此函数，立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数
  - 此函数在组件被卸载的时候会自动停止监听，但是watchEffect可以返回一个函数，执行此函数就会停止监听，
  - 和computed有点像
  - 未理解 清除副作用 和  副作用刷新时机 多查资料理解 💢 💢

   #### watch
  - 默认情况下，它也是惰性的，即只有当被侦听的源发生变化时才执行回调, 第一个参数返回要观测的值，第二个参数是观测到变化的回调
  - 多个同步更改只会触发一次侦听器。
  - 观测多个值，第一个参数可以传数组
  - 监测ref数据, 第一个值直接写ref包裹的变量
      - 如果ref包裹的是基本数据类型，第一个参数直接写变量名
      - 如果ref包裹的是对象，第一个参数直接写变量名, 不会触发监听，因为你会发现，`数据.value`是一个Proxy，说明你监听的其实是reactive包裹的数据, 也就是说ref包裹对象，就是用reactive定义那个对象，再用ref包裹他，所以第一个参数写`数据.value`, 或者第三个参数开启深度监听就会触发，但是会存在监测reactive数据的问题， 如下

  - 监测reactive数据：
      - 监测整个数据，第一个参数如果传入要监测对象数据， 可以监听到但是无法获取到正确的oldvalue, 想解决这个问题，第一个参数可以返回数据的深拷贝， 强制开启了深度监听; 
      - 监测数据的某一个或多个属性， 第一个参数用函数返回要监测的属性（一个函数，或数组中包含多个函数）、
      - 监测数据的某一个属性，此属性是对象，监测不到，要配置第三个参数 {deep: false}
  
   #### toRaw
  -  把reactive创建的响应式对象转换成一个普通的对象
  
   #### markRaw
  -  标记一个对象，使其永远不会转换为 proxy。返回对象本身。
  >  只是浅度的标记对象使其永远不会转换为proxy；可以让有些嵌套的对象避免响应式的包装

# 四、效率提升
  ### 1、静态提升
  - 元素节点
  - 没有绑定的动态内容

  ### 2、预字符串化
  - 当编译器遇到大量连续的静态内容， 会直接将其编译为一个普通字符串节点

  ### 3、缓存事件处理函数

  ### 4、Block Tree
  - vue2对比新旧树的时候，不知道哪些节点是静态的，哪些是动态的， 因此是一层一层比较， 但是对于静态节点就浪费了时间
  - vue3编译器会标记静态动态节点，在Block节点中存入所有动态节点，两个数组对比

  ### 5、PatchFlag
  - vue2对比每一个节点时，并不知道这个节点的哪些相关信息会发生变化，因此只能将所有的信息一次比对
# 五、vite

 ### 1、webpack
  每次修改，都会进行编译打包
 ### 2、vite
  - 打包原因之一是浏览器可能不支持es6/7的语法，转成js，以及scss转成css等，
  - 开发过程中不进行打包，用原生es6 module  import引入
  - 只适配vue3.0及不能用不能适配vue3的库
  - 创建 ` npm init vite-app <name>  or  yarn create vit-app <name> `

  > vite适配vue2 : vite-plugin-vue2
 