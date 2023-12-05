import categoriesApi from "../api/categories";
// STATE
const state = () => ({
  categories: [],
});

// GETTERS
const getters = {};

// ACTIONS
const actions = {
  async getCategories({ commit }) {
    try {
      const categories = await categoriesApi.getCategories();
      commit("FETCH_CATEGORIES_SUCCESS", categories.data);
    } catch (error) {
      commit("FETCH_CATEGORIES_FAILURE");
      console.log(error);
    }
  },
};

// MUTATIONS
const mutations = {
  FETCH_CATEGORIES_SUCCESS(state, categories: []) {
    state.categories = categories;
  },
  FETCH_CATEGORIES_FAILURE(state) {
    state.categories = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
