import Vue from 'vue';
import Vuex from 'vuex';

import columns from '@/stores/columns';
import cards from '@/stores/cards';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    columns,
    cards,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
});
