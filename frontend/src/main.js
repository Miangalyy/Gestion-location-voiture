//import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueLazyload from 'vue-lazyload';
import store from './store/store';
import 'vuetify/styles';
import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives
})

const app = createApp(App)
app.use(VueLazyload, {
    preLoad: 1.3,
    error: 'YOUR_ERROR_IMAGE_URL',
    loading: 'YOUR_LOADING_IMAGE_URL',
    attempt: 1
  })
  
app.use(router)
app.use(vuetify)
//app.config.globalProperties.$axios = axios;
//app.use(axios)
const options = {
    confirmButtonColor: '#41b882',
    CancelButtonColor: '#ff7674'

}
app.config.globalProperties.$apiURL = "http://localhost:8800"
app.config.globalProperties.$headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + localStorage.getItem("accessTokenKey")
};
app.use(VueSweetalert2, options);
app.use(store);
app.mount('#app')
