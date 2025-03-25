<template>
    <div class="catalog">
        <h1>Каталог товаров</h1>
        <div class="conteiner">
            <div v-for="product in products" :key="product.id" class="product">
                <h3>{{ product.name }}</h3>
                <img :src="'http://lifestealer86.ru/' + product.image" :alt="product.image" class="product-image">
                <p>{{ product.description }}</p>
                <p>Цена: {{ product.price }}</p>
                <button @click="addCart(product.id)">В корзину</button>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/utils/api';

    export default {
        data(){
            return{
                products: [],
            };
        },

        async mounted(){
            const response = await api.getProducts();
            this.products = response.data;
        },

        methods: {
            async addCart(productId){
                try {
                    await api.addCart(productId);
                    alert('Товар добавлен в корзину!');
                } catch (error){
                    alert('Ошибка добавления товара');
                }
            },

            async fetchProducts() {
                try {
                    const products = await api.getProducts();
                    this.products = products;
                } catch (error) {
                    console.error('Ошибка загрузки товаров:', error);
                }
            },
        },
     };
</script>

<style>


    .catalog{
        max-width: 1200px;
        margin: 0 auto;
        padding: 20px;
    }

    .catalog h1{
        text-align: center;
        margin-bottom: 30px;
    }

    .conteiner{
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }

    .product{
        border: 1px solid black;
        border-radius: 8px;
        padding: 15px;
        margin-bottom: 20px;
        background-color: #efefef;
        width: 30%;
    }

    .product h3{
        margin: 0 0 10px;
        font-size: 18px;
    }

    .product p {
        margin: 5px 0;
        font-size: 14px;
    }

    .product-image{
        max-width: 90%;
        height: auto;
        border: 2px solid rgb(176, 176, 176);;
        border-radius: 8px;
        margin-top: 10px;
    }
</style>