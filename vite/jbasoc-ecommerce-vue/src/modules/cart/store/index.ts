// STATE
const state = () => ({
  cart: [],
});

// GETTERS
const getters = {
  cartTotalPrice: (state) => {
    return state.cart.reduce((a, b) => a + b.price * b.quantity, 0);
  },
  cartItemCount: (state) => {
    console.log(state.cart);
    return state.cart.length;
  },
};

// ACTIONS
const actions = {
  addItemToCart({ commit, state }, product) {
    const updatedCart = state.cart;
    const item = updatedCart.find((i) => i.id === product.id);
    if (item) {
      item.quantity += product.quantity;
    } else {
      updatedCart.push({ ...product });
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    commit("UPDATE_CART", updatedCart);
  },
  removeProductFromCart({ commit, state }, product) {
    const updatedCart = state.cart.filter((i) => i.id !== product.id);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    commit("UPDATE_CART", updatedCart);
  },
  updateItemQtyFromCart({ commit, state }, product) {
    const updatedCart = state.cart.map((i) => {
      if (i.id === product.id) {
        i.quantity = product.quantity;
      }
      return i;
    });

    localStorage.setItem("cart", JSON.stringify(state.cart));
    commit("UPDATE_CART", updatedCart);
  },
  getCartFromLocalStorage({ commit }) {
    const cartItems = JSON.parse(localStorage.getItem("cart") as string);
    const updatedCart = cartItems ? cartItems : [];

    commit("UPDATE_CART", updatedCart);
  },
};

// MUTATIONS
const mutations = {
  UPDATE_CART(state, cart) {
    state.cart = cart;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
