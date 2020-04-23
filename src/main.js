import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify';
import session from './plugins/session';
import Vuelidate from 'vuelidate'

Vue.use(Vuelidate)
Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://localhost:8080/backend/index.php';    
Vue.config.productionTip = false

new Vue({
render: h => h(App),
router,
vuetify,
session,
components: { App }
}).$mount('#app')
