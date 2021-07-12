import { createApp } from 'vue'
import vuetify from './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Luxon from 'luxon'

const app = createApp(App)

app.use(router)
app.use(vuetify)
app.use(store)
app.use(Luxon)

app.mount('#app')
