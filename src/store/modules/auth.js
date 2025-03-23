import api from '../../utils/api';

export default{
    state: {
        token: localStorage.getItem('user_token') || null,
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
    },
    mutation: {
        SET_TOKEN(state, token){
            state.token = token;
            localStorage.setItem('user_token', token);
        },
        CLEAR_TOKEN(token){
            state.token = null;
            localStorage.removeItem('user_token');
        },
    },
    actions: {
        async login({ commit }, { email, password }){
            try{
                const response = await api.login(email, password);
                commit('SET_TOKEN', response.data.user_token);
            }catch(error){
                throw error;
            };

           
        },
        logout({ commit }) {
                commit('CLEAR_TOKEN');
        },
    }
}