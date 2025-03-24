<template>
    <div class="register">
        <form @submit.prevent="handleSubmit">
            <h2>Регистрация</h2>
            <input v-model="fio" type="text" placeholder="ФИО" />
            <input v-model="email" type="email" placeholder="Email">
            <input v-model="password" type="password" placeholder="Пароль" />
            <button type="submit">Зарегистрироваться</button>
            <p v-if="error" class="error">{{ error }}</p>
        </form>
    </div>
</template>


<script>

import api from '../utils/api';

export default{
    data() {
        return{
            username: '',
            email: '',
            password: '',
            error: '',
        };
    },

    methods: {
        async handleSubmit(){
            try {
                await api.register(this.username, this.email, this.password);
                this.$router.push('/login');
            }catch (err) {
                if(err.response && err.response.status === 422){
                    const validationErrors = err.response.data.error.errors;
                    this.error = Object.values(validationErrors).flat().join(', ');
                }else{
                    this.error = 'Произошла ошибка.';
                }
                console.error('Ошибка регситрации', error);
                this.error = this.error.message || 'Ошибка регистрации';
            }
        },
    },
 };
</script>