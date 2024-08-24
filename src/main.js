// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'bootstrap-css-only/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'mdbvue/build/css/mdb.css';
import Vue from 'vue';
import App from './App';
import router from './router';
import Tippy from 'v-tippy';
import 'v-tippy/dist/tippy.css';

//import {dmghelper} from './assets/js/dmghelper.js';

//Vue.prototype.dmghelper = dmghelper;
Vue.use(Tippy, {
  position: 'bottom',
  arrow: true
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
