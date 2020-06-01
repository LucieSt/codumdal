import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'
import { store } from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import './assets/sass/index.scss'

const fb = require('./firebaseConfig.js')

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

let app
fb.auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})

// // Wrap functionality in a function
// function getOpenGraphMeta () {
//   // Return a promise as execution of request is time-dependent
//   return new Promise((resolve, reject) => {
//     let response

//     osmosis
//       // Tell Osmosis to load steemit.com
//       .get('https://steemit.com')
//       // We want to get the metatags in head, so provide the head element as a value to find
//       .find('head')
//       // Set creates our final object of data we will get calling .data
//       // the secondary values for these are select lookups. We are saying find meta tag with this property and return its content
//       .set({
//         title: "meta[property='og:title']@content",
//         description: "meta[property='og:description']@content"
//       })
//       // Store a copy of the above object in our response variable
//       .data(res => { response = res })
//       // If we encounter an error we will reject the promise
//       .error(err => reject(err))
//       // Resolve the promise with our response object
//       .done(() => resolve(response))
//   })
// }

// getOpenGraphMeta().then(res => {
//   console.log(res)
// })
