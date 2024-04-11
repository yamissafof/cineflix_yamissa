import './assets/main.css'

import { createApp } from 'vue';

import axios from "axios";
import router from "./router/router.js";
import App from "./App.vue"
import VueAxios from "vue-axios";

createApp(App)
    .use(VueAxios, axios)
    .use(router)
    .mount('#app')
