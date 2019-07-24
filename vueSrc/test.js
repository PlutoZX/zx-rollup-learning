import MyTest from './test.vue'


const MyComp = {
  install: function(Vue){
    Vue.component('MyComp', MyTest)
  }
}
// 导出组件
export default MyComp
