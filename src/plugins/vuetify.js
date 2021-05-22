import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/lib/styles/main.sass'
import { createVuetify} from 'vuetify'
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'

export default createVuetify({
    components,
    directives,
    /* theme: {
      dark: false,
      themes: {
        dark: {
          primary: '#E65F58', //red
          accent: '#5ECC65', //green
          secondary: '#314E55', //dark teal
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252'
        },
        light: {
          primary: '#E65F58',
          accent: '#5ECC65',
          secondary: '#314E55',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252'
        }
      }
    } */
  })

