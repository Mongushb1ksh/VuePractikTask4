import { createStore } from 'vuex'
import api from '@/utils/api';



export default createStore({
  state: {
    token: localStorage.getItem('user_token') || '',
    cartItems: [],
    products: [],
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
    cartItems: (state) => state.cartItems,
    products: (state) => state.products,
    groupedCartItems: (state) => {
      const grouped = {};
      state.cartItems.forEach((item) => {
        if(!grouped[item.product_id]){
          grouped[item.product_id] = {...item, quantity: 0};
        }
        grouped[item.product_id].quantity += 1;
      });
      return Object.values(grouped);
    }
  },

  

  actions: {
    async login({ commit }, {email, password}) {
      try {
        const response = await api.login(email, password);
        commit('SET_TOKEN', response.data.user_token);
      } catch (error){
        throw new Error('Ошибка входа');
      }
    },
    async register({ commit }, {fio, email, password}) {
      try {
        const response = await api.register( fio, email, password);
        commit('SET_TOKEN', response.data.user_token);
      } catch (error){
        throw new Error('Ошибка регитрации');
      }
    },
  
 

    

    async fetchProducts({ commit }){
      try{
        const response = await api.getProduct();
        commit('SET_PRODUCTS', response.data.data);
      }catch(error){
        throw new Error('Ошибка при загрузке товаров:', error);
      }
    },

    async addToCart({ commit }, productId){
      try{
        await api.addToCart(productId);
        commit('ADD_TO_CART', productId);
      }catch(error){
         throw new Error('Ошибка при добавления товара в корзину:');
      }
    },


    async fetchCart({ commit }){
      try{
        const response = await api.getCart();
        commit('SET_CART', response.data.data);
      }catch(error){
        throw new Error('Ошибка загрузки корзины');
      }
    },

    async removeFromCart({ commit }, itemId){
      try{
        await api.removeFromCart(itemId);
        commit('REMOVE_FROM_CART', itemId);
      }catch(error){
        throw new Error('Ошибка удаления товара из корзины');
      }
    },

    async logout({ commit }) {
      try{
        await api.logout();
        commit('CLEAR_TOKEN');
      }catch (error){
        throw new Error('Ошибка выхода');
      }
    },
  },
   mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
      localStorage.setItem('user_token', token);
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      localStorage.removeItem('user_token');
    },
    ADD_TO_CART(state, productId){
      state.cartItems.push(productId);
    },
    REMOVE_FROM_CART(state, productId){
      state.cartItems = state.cartItems.filter((id) => id !== productId);
    },
    SET_PRODUCTS(state, products){
      state.products = products;
    },
    SET_CART(state, cartItems){
      state.cartItems = cartItems;
    },
    REMOVE_FROM_CART(state, itemId){
      state.cartItems.pop(itemId);
    }
  },
})
