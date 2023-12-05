import usersApi from "../api";

// STATE
const state = () => ({
  user: null,
  jwt: null,
});

// GETTERS
const getters = {
  fullName: (state) => {
    return state.user?.firstname + " " + state.user?.lastname;
  },
  isLoggedIn: (state) => {
    return state.user ? true : false;
  },
};

// ACTIONS
const actions = {
  async login({ commit }, values) {
    try {
      const result = await usersApi.login(values);
      commit("LOGIN_SUCCESS", result);
    } catch (err) {
      commit("LOGIN_FAILURE");
      throw new Error((err as Error).message);
    }
  },

  logOut({ commit }) {
    try {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      commit("LOGOUT_SUCCESS");
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  async updatePassword({ commit, state }, values) {
    try {
      console.log(state);
      const result = await usersApi.updatePassword(values, state.jwt);
      commit("UPDATE_PASSWORD_SUCCESS", result);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  async register({}, values) {
    try {
      await usersApi.register(values);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  },

  getUserFromLocalStorage({ commit }) {
    commit("CHECK_LOGGED_USER");
  },
};

// MUTATIONS
const mutations = {
  LOGIN_SUCCESS(state, value) {
    state.user = value.user;
    state.jwt = value.jwt;
    localStorage.setItem("user", JSON.stringify(value.user));
    localStorage.setItem("token", value.jwt);
  },
  LOGIN_FAILURE(state) {
    state.user = null;
    state.jwt = null;
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },
  LOGOUT_SUCCESS(state) {
    state.user = null;
    state.jwt = null;
  },
  UPDATE_PASSWORD_SUCCESS(state, value) {
    state.user = value.user;
    state.jwt = value.token;
    localStorage.setItem("user", JSON.stringify(value.user));
    localStorage.setItem("token", JSON.stringify(value.jwt));
  },
  CHECK_LOGGED_USER(state) {
    state.user = JSON.parse(localStorage.getItem("user") as string);
    state.jwt = localStorage.getItem("token");
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
