import 'babel-polyfill';
import Vue from 'vue';
import App from './App.vue';
import FastClick from 'fastclick';
import Router from './router/index.js';
import VueLazyLoad from 'vue-lazyload';

import 'common/stylus/index.styl';

Vue.use(VueLazyLoad, {
    loading: require('common/image/default.png')
});

Vue.config.productionTip = false;

FastClick.attach(document.body);
new Vue({
    el: '#app',
    router: Router,
    render: h => h(App)
});
