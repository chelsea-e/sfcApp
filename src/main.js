import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import{ library } from '@fortawesome/fontawesome-svg-core'
import{ FontAwesomeIcon } from '@fortawesome/vue-fontawesome' 
import{ faCartShopping } from '@fortawesome/free-solid-svg-icons' 

 
import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
/* add icons to the library */ 
library.add(faCartShopping) 
/* add font awesome icon component */ 
Vue.component('font-awesome-icon', FontAwesomeIcon) 
Vue.config.productionTip= false


Vue.use(BootstrapVue)
new Vue({
  render: (h) => h(App)
}).$mount('#app')
