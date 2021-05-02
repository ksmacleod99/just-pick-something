import {createApp} from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'


//createApp(App).use(router).mount('#app')

const app = createApp(App);
app.use(router);
app.mount('#app');