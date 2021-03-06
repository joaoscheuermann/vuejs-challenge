import Vue from 'vue';
import uuid from 'uuid/v1';
import faker from 'faker';

export default {
  namespaced: true,

  state: {},

  getters: {
    column: state => columndID => state[columndID],
    order: state => Object.keys(state).filter(id => state[id] !== null).sort((a, b) => state[a].order - state[b].order)
  },

  mutations: {
    ADD_COLUMN: (state, payload) => Vue.set(state, payload.id, payload),
    FLIP_COLUMNS: (state, { from, to }) => {
      let oldFromOrder = state[from].order
      let oldToOrder = state[to].order
      Vue.set(state[from], 'order', oldToOrder)
      Vue.set(state[to], 'order', oldFromOrder)
    },
    REMOVE_COLUMN: (state, { column }) => {
      state[column] = null;
      delete state[column];
    }
  },

  actions: {
    addColumn: ({ commit, state }) => {
      let order = Object.keys(state).map(id => state[id].order).reduce((previous, current) => current > previous ? current : previous, -1);

      const column = {
        id: uuid(),
        title: `${faker.commerce.department()}`,
        order: ++order,
      };

      commit('ADD_COLUMN', column);
    },

    flipColumns ({ commit }, payload) {
      commit('FLIP_COLUMNS', payload)
    },

    removeColumn ({ commit }, payload) {
      commit('REMOVE_COLUMN', payload)
    }
  },
};
