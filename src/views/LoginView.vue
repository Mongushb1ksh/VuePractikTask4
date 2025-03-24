<template>
    <div class="login">
        <form @submit.prevent="handleSubmit">
            <h2>Вход</h2>
            <input v-model="email" type="email" placeholder="Email" />
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
            email: '',
            password: '',
            error: '',
        };
    },

    methods: {
        async handleSubmit(){
            try {
                await this.$store.dispatch('auth/login', {
                    email: this.username,
                    password: this.password,
                });
                this.$router.push('/');
            }catch{
                if(err.response && err.response.status === 401){
                    this.error = 'Неверный email или пароль';
                }else{
                    this.error = 'Произошла ошибка. Попробуйте позже.';
                }
            }
        },
    },
 };
</script>
<style>
.error{
    color: red;
}
</style>