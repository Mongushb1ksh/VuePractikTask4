import axios from 'axios';

const apiClient = axios.create({
    baseURL: '',
    headers: {
        'Content-Type': 'application/json',
    },
});



export default {
    login(username, password){
        return apiClient.post('/login', { username, password });
    },

    register(fio, email, password){
        return apiClient.post('/signup', { fio, email, password });
    },
}

export const loginRequest = (user) => {
    return new Promise((resolve, reject) => {
        fetch( `${API}/login`,{
            method: 'POST',
            headers:{
               'Content-Type':'application/json;charset=utf-8',
            },
            body: JSON.stringify(user),
        })
            .then((response) => response.json())
            .then((result) => resolve(result.data.user_token))
            .catch((error) => {
                reject(error);
            });
    });
};