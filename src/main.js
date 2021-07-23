import 'core-js/stable'
import 'regenerator-runtime/runtime'
import App from './App.vue'
// import VConsole from "vconsole";
// const vconsole = new VConsole();

/* eslint no-undef:0 */
App.name = COMPONENT_NAME
App.version = VERSION

console.log('App.name:', App.name)
console.log('App.version:', App.version)

const install = (App.install = Vue => Vue.component(App.name, App))

/* 自动注册 */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default App
