import Vue from 'vue';
import uuid from 'uuid/v1';

export default {
  namespaced: true,

  state: {
    instances: {},
    order: [],
  },

  getters: {
    order: state => state.order,
    column: state => id => state.instances[id],
    columns: state => state.instances,
  },

  mutations: {
    CREATE_COLUMN: (state) => {
      const column = {
        id: uuid(),
        title: 'Untitled',
      };

      Vue.set(state.instances, column.id, column);
      Vue.set(state, 'order', [...state.order, column.id]);
    },

    SWITCH_COLUMN_ORDER: (state, { from, to }) => {
      const order = [...state.order];
      const indexTo = state.order.indexOf(to);
      const indexFrom = state.order.indexOf(from);

      order[indexTo] = from;
      order[indexFrom] = to;

      Vue.set(state, 'order', order);
    },
  },

  actions: {
    createColumn: ({ commit }) => {
      commit('CREATE_COLUMN');
    },

    switchColumnOrder: ({ commit }, payload) => {
      commit('SWITCH_COLUMN_ORDER', payload);
    },
  },
};
