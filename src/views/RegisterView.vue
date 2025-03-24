<template>
    <div class="register">
        <form @submit.prevent="handleSubmit">
            <h2>Регистрация</h2>
            <input v-model="username" type="text" placeholder="Логин" />
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
            }catch (error) {
                console.error('Ошибка регситрации', error);
                this.error = this.error.message || 'Ошибка регистрации';
            }
        },
    },
 };
</script>