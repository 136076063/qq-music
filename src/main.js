import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import fastclick from 'fastclick';
import router from './router/index.js';

import 'common/stylus/index.styl';

Vue.config.productionTip = false;

fastclick.attach(document.body);
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
