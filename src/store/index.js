import { createStore } from 'vuex'
import api from '@/utils/api';



export default createStore({
  state: {
    token: localStorage.getItem('user_token') || '',
  },

  getters: {
    isAuthenticated: (state) => !!state.token,
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
  },

  actions: {
    login({ commit }, {username, password}) {
      return new Promise((resolve, reject) => {
        api.login({username, password})
            .then((response) => {
              commit('SET-TOKEN', response.data.data.user_token);
              resolve(response);
            })
            .catch((error) => {
              console.error('Ошибка авторизации:', error);
              reject(error);
            });
      });
      
    },
    logout({ commit }) {
            commit( 'CLEAR_TOKEN' );
    }
  }
})
