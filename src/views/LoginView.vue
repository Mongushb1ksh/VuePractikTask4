<template>
    <div class="login">
        <h1>Страница входа</h1>
        <form @submit.prevent="handleSubmit">
            <input v-model="username" type="text" placeholder="Логин" />
            <input v-model="password" type="password" placeholder="Пароль" />
            <button type="submit">Войти</button>
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
            password: '',
            error: '',
        };
    },

    methods: {
        async handleSubmit(){
            try {
                await this.$store.dispatch('auth/login', {
                    username: this.username,
                    password: this.password,
                });
                this.$router.push('/');
            }catch{
                this.error = 'Неверные данные';
            }
        },
    },
 };
</script>