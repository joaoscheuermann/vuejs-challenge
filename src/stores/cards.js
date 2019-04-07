import Vue from 'vue';
import uuid from 'uuid/v1';

export default {
  namespaced: true,

  state: { },

  getters: {
    order: state => parentID => Object.keys(state).filter(cardID => state[cardID].parent === parentID).sort((a, b) => state[a].order - state[b].order),
    card: state => cardID => state[cardID],
  },
  mutations: {
    ADD_CARD: (state, payload) => Vue.set(state, payload.id, payload),
  },
  actions: {
    addCard: ({ commit, state }, { parentID }) => {
      let order = Object.keys(state).filter(cardID => state[cardID].parent === parentID).map(id => state[id].order).reduce((previous, current) => current > previous ? current : previous, -1);

      const card = {
        id: uuid(),
        parent: parentID,
        title: 'Untitled',
        order: ++order,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
      };

      commit('ADD_CARD', card);
    }
  },
};
