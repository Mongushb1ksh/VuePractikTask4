<template>
    <div class="cart">
        <h1>Корзина</h1>
        <div v-if="groupedCartItems.length === 0">Коризина пустая</div>
        <div v-else>
            <div v-for="(item, index) in constCartItems" :key="index">
                <h3>{{ item.name }}</h3>
                <p>{{ item.description }}</p>
                <p>Цена: {{ item.price }} руб.</p>
                <p>Количество: {{ item.quantity }}</p>
                <button @click="removeFromCart(item.id)">Удалить</button>
            </div>
        </div>
        <h3>Итого: {{ totalPrice() }}</h3>
        <button v-if="cartItems.length > 0">Оформить заказ</button>
    </div>
</template>

<script>
import api from '@/utils/api';

    export default {
        data() {
           return {
              cartItems: [],
           };
        },
        async mounted() {
            const response = await api.getCart();
            this.cartItems = response.data.data;
        },

        computed:{
            groupedCartItems() {
                const grouped = {};
                this.cartItems.forEach((item) => {
                    if(!grouped[item.product_id]){
                        grouped[item.product_id] = {...item, quantity: 0};
                    }
                    grouped[item.product_id].quantity += 1;
                });
                return Object.values(grouped);
            },
            totalPrice(){
                return this.cartItems.reduce((total, item) => total + item.price, 0);
            },
         },

        methods: {
            async removeFromCart(itemId) {
                try {
                    await api.removeFromCart(itemId);
                    this.cartItems = this.cartItems.filter(item => item.id !== itemId);
                } catch (error) {
                    alert('Ошибка удаления товара');
                }
            },
        },
    };
</script>