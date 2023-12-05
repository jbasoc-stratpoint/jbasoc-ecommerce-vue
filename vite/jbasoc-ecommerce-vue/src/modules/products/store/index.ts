import productsApi from "../api/products";

export interface Meta {
  pagination?: {
    page?: 0;
    pageSize?: 0;
    pageCount?: 0;
    total?: 0;
  };
}

// initial state
const state = () => ({
  products: [],
  product: null,
  meta: {
    pagination: {
      page: 0,
      pageSize: 0,
      pageCount: 0,
      total: 0,
    },
  },
  strapiProducts: [],
  isLoading: false,
});

// getters
const getters = {};

// actions
const actions = {
  async getProducts({ commit }, query) {
    try {
      commit("SET_LOADING", true);
      const products = await productsApi.getProducts(query);
      commit("FETCH_PRODUCTS_SUCCESS", products);
      commit("SET_LOADING", false);
      return products;
    } catch (error) {
      commit("FETCH_PRODUCTS_FAILURE");
      commit("SET_LOADING", false);
      throw new Error((error as Error).message);
    }

    //commit('setProducts', products)
  },
  async getProduct({ commit }, id) {
    try {
      commit("SET_LOADING", true);
      const product = await productsApi.getProduct(id);
      commit("FETCH_PRODUCT_SUCCESS", product.data);
      commit("SET_LOADING", false);
    } catch (error) {
      commit("FETCH_PRODUCT_FAILURE");
      commit("SET_LOADING", false);
      throw new Error((error as Error).message);
    }
  },
  async getStripeProducts({ commit }) {
    try {
      commit("SET_LOADING", true);
      const statpiProducts = await productsApi.getStripeProducts();
      commit("FETCH_STRIPE_PRODUCT_SUCCESS", statpiProducts.data);
      commit("SET_LOADING", false);
    } catch (error) {
      commit("FETCH_STRIPE_PRODUCT_FAILURE");
      commit("SET_LOADING", false);
      throw new Error((error as Error).message);
    }
  },
};

// mutations
const mutations = {
  SET_LOADING(state, isLoading: boolean) {
    state.isLoading = isLoading;
  },
  FETCH_PRODUCTS_SUCCESS(state, products: { data; meta }) {
    state.products = products.data;
    state.meta = products.meta;
  },
  FETCH_PRODUCTS_FAILURE(state) {
    state.products = [];
    state.meta = {
      pagination: {
        page: 0,
        pageSize: 0,
        pageCount: 0,
        total: 0,
      },
    };
  },
  FETCH_STRIPE_PRODUCT_SUCCESS(state, strapiProducts) {
    console.log(strapiProducts);
    state.strapiProducts = strapiProducts;
  },
  FETCH_STRIPE_PRODUCT_FAILURE(state) {
    state.strapiProducts = [];
  },
  FETCH_PRODUCT_SUCCESS(state, product) {
    state.product = product;
  },
  FETCH_PRODUCT_FAILURE(state) {
    state.product = null;
  },
  SET_EMPTY_PRODUCTS(state) {
    state.products = [];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
