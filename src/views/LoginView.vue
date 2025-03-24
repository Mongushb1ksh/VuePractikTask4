<template>
    <div class="login">
        <form @submit.prevent="handleSubmit">
            <h2>Вход</h2>
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
<style>

</style>