import Vue from 'vue';

export default {
  namespaced: true,

  state: {
    instances: [],
  },
  mutations: {
    CREATE_COLUMN: (state) => {
      const newColumn = {
        id: 'asdadadsadsas',
        title: 'batata',
      };

      // Nao queria usar o Vue.set, porem o linter da erro quando se tenta
      // fazer um assign a uma propriedade da store :(
      Vue.set(state, 'instances', [...state.instances, newColumn]);
    },
  },

  actions: {
    createColumn: (context) => {
      context.commit('CREATE_COLUMN');
    },
  },
};
