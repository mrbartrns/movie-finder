import { createStore } from 'vuex';

const store = createStore({
  state() {
    return {
      isLoading: false,
    };
  },
  mutations: {
    updateIsLoading(state, payload) {
      state.isLoading = payload;
    },
  },
  actions: {
    async fetchData({ commit }, fn) {
      try {
        commit('updateIsLoading', true);
        await fn();
        commit('updateIsLoading', false);
      } catch (e) {
        commit('updateIsLoading', false);
      }
    },
  },
});

export { store };
