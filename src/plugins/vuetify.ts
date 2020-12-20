import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
Vue.use(Vuetify);
export default new Vuetify( {
    rtl: false,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: '#00ACC1',
          accent: '#0288D1',
          secondary: '#29B6F6',
          success: '#81C784',
          info: '#64B5F6',
          warning: '#26A69A',
          error: '#00897B'
        },
        light: {
          primary: '#1976D2',
          accent: '#e91e63',
          secondary: '#30b1dc',
          success: '#4CAF50',
          info: '#2196F3',
          warning: '#FB8C00',
          error: '#FF5252'
        }
      }
    }
});
