import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import wysiwyg from "vue-wysiwyg";
import firebase from 'firebase'
import firebaseui from 'firebaseui';
import {config} from './helpers/firebaseConfig'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)

Vue.use(wysiwyg); // config is optional. more below

Vue.config.productionTip = false

new Vue({
  router,
  store,
  created() {
    firebase.initializeApp(config);
    firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.$router.push('/')
      } else {
        this.$router.push('/login')
      }
     })
  },
  render: h => h(App)
}).$mount('#app')
