import Vue from 'vue';
import uuid from 'uuid/v1';
import faker from 'faker';

faker.locale = 'pt_BR'

export default {
  namespaced: true,

  state: { },

  getters: {
    order: state => parentID => Object.keys(state).filter(cardID => state[cardID].parent === parentID).sort((a, b) => state[a].order - state[b].order),
    card: state => cardID => state[cardID],
  },
  mutations: {
    ADD_CARD: (state, payload) => Vue.set(state, payload.id, payload),
    CHANGE_CARD_PARENT: (state, { card, parent, order }) => {
      Vue.set(state[card], 'order', order)
      Vue.set(state[card], 'parent', parent)
    },
    FLIP_CARDS: (state, { from, to }) => {
      let oldFromOrder = state[from].order;
      let oldToOrder = state[to].order;
      Vue.set(state[from], 'order', oldToOrder);
      Vue.set(state[to], 'order', oldFromOrder);
    },
    REMOVE_CARD: (state, { card }) => {
      state[card] = null;
      delete state[card];
    }
  },
  actions: {
    addCard: ({ commit, state }, { parentID }) => {
      let order = Object.keys(state).filter(cardID => state[cardID].parent === parentID).map(id => state[id].order).reduce((previous, current) => current > previous ? current : previous, -1);

      const card = {
        id: uuid(),
        parent: parentID,
        title: `${faker.commerce.productName()}`,
        order: ++order,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
      };

      commit('ADD_CARD', card);
    },

    changeCardParent: ({ commit, state, getters }, payload) => {
      const order = Object.keys(state).filter(cardID => state[cardID].parent === payload.parent).map(id => state[id].order).reduce((previous, current) => current > previous ? current : previous, -1) + 1;
      commit('CHANGE_CARD_PARENT', {...payload, order})
    },

    flipCards ({ commit }, payload) {
      commit('FLIP_CARDS', payload)
    },

    removeCard ({ commit }, payload) {
      commit('REMOVE_CARD', payload)
    }
  },
};
