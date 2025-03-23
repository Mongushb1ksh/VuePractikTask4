import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://lifestealer86.ru/api-shop',
    mode: 'no-cors',
    headers: {
        'Content-Type': 'application/json',
    },
});



export default {
    login(username, password){
        return apiClient.post('/login', { username, password });
    },

    register(username, email, password){
        return apiClient.post('/signup', { username, email, password });
    },
}
