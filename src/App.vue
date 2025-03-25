<template>
  <nav>
    <router-link to="/">Каталог</router-link> 
    <router-link v-if="isAuthenticated" to="/cart">Корзина</router-link> 
    <router-link v-if="!isAuthenticated" to="/login">Вход</router-link>
    <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link> 
    <button v-if="isAuthenticated" @click="logout">Выйти</button>
  </nav>
  <router-view></router-view>
</template>

<script>
export default{

  

  computed: {
    isAuthenticated(){
      return this.$store.getters['auth/isAuthenticated'];
    },
  },
  methods:{
    async logout(){
        await this.$store.dispatch('auth/logout');
        this.$router.push('/');
    },
  },
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-bottom: 1px solid black;
  gap: 5%;
  background-color: #ebebeb;
  padding: 10px 20px;
}

form {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #e4e4e4;
  border-radius: 8px;
}

form h2 {
  text-align: center;
  margin-bottom: 20px;
  color: #000000;
}

input {
  padding: 10px;
  border: 1px solid #000000;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 10px;
}

button {
  background-color: #efefef;
  padding: 10px 15px;
  border-radius: 5px;
}


a{
  text-decoration: none;
  color: #000000;
}

</style>
