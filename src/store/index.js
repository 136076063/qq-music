import Vue from 'vue';
import Vuex from 'vuex';
import * as types from './types';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
    singerInfo: {}
};

const actions = {
};

const getters = {
    // 歌手详情数据 => 歌手列表带到歌手详情
    singer (state) {
        return state.singerInfo;
    }
};

const mutations = {
    // 在歌手详情页传入歌手信息
    [types.SINGER_INFO] (state, data) {
        state.singerInfo = data;
    }
};

export default new Vuex.Store({
    state,
    actions,
    mutations,
    getters,
    strict: debug,
    plugins: debug ? [createLogger()] : []
});
