<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <form @submit.prevent="submitForm" class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h1 class="text-2xl font-semibold text-gray-700 mb-6 text-center">Signup</h1>
            <input type="text" v-model="name" placeholder="Enter your name" required
                class="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="email" v-model="email" placeholder="Enter your email" required
                class="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <input type="password" v-model="password" placeholder="Enter your Password" required
                class="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="submit"
                class="w-full py-3 mt-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200">
                Signup
            </button>
            <div class="text-center mt-4">
                <router-link to="/login" class="text-blue-500 hover:underline">Login</router-link>
            </div>
        </form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        };
    },
    methods: {
        ...mapActions(['signUpUser']),
        submitForm() {
            const signUpInfo = {
                name: this.name,
                email: this.email,
                password: this.password
            };
            this.name = '';
            this.email = '';
            this.password = '';
            this.signUpUser(signUpInfo);
        }
    }
};
</script>