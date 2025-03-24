<template>
    <div class="catalog">
        <h1>Каталог товаров</h1>
        <div v-for="product in products" :key="product.id" class="product">
            <h3>{{ product.name }}</h3>
            <p>{{ product.description }}</p>
            <p>Цена: {{ product.price }}</p>
            <button @click="addCart(product.id)">В корзину</button>
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