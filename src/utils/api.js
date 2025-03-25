import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://lifestealer86.ru/api-shop',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('user_token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if(error.response){
            console.error('Ошибки сервера:', error.response.data);
        }else if(error.request){
            console.error('Нет ответа от сервера:', error.request);
        } else {
            console.error('Ошибка запроса:', error.message);
        }
        return Promise.reject(error);
    }
)

export default {
    async login(email, password){
        try{
            const response = await apiClient.post('/login', { email, password });
            return response.data;
        } catch (error) {
            console.error('Ошибка при входе:', error);
            if(error.response && error.response.data.error){
                throw new Error(error.response.data.error.message || 'Ошибка входа');
            } else {
                throw new Error('Неизвуестная ошибка');
            }
        }
    },

    async register(fio, email, password){
        try{
            const response = apiClient.post('/signup', { fio, email, password });
            return response.data;
        } catch (error){
            console.error('Ошибка при регистрации:', error);
            if(error.response && error.response.data.error){
                throw new Error(error.response.data.error.message || 'Ошибка регистраци');
            } else {
                throw new Error('Неизвуестная ошибка');
            }
        }
    },

    async getProducts(){
        try{
            const response = await apiClient.get('/products');
            return response.data;
        } catch (error){
            console.error('Ошибка при получении товаров:', error);
            throw new Error('Ошибка при получении товара');
        }
    },

    addToCart(productId){
        return apiClient.post(`/cart/${productId}`)
    },

    removeFromCart(itemId){
        return apiClient.post(`/cart/${itemId}`)
    },


    async logout(){
        try{
            const response = await apiClient.get('/logout');
            return response.data;
        }catch(error){
            console.error('Ошибка при выходе:', error);
            throw new Error('Ошибка при выходе');
        }
    },
};
