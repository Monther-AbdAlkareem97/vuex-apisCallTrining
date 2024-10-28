<template>
    <div>
        <h1>Signup</h1>
        <form @submit.prevent="submitForm">
            <input type="text" v-model="name" placeholder="Enter your name" required>
            <input type="email" v-model="email" placeholder="Enter your email" required>
            <input type="text" v-model="password" placeholder="Enter your Password" required>
            <button type="submit">Signup</button>
            <a href="#">Login</a>
        </form>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
export default {
    data() {
        return {
            name: '',
            email: '',
            password: ''
        }
    },
    methods: {
        ...mapActions(['signUpUser']),
        submitForm() {
            const signUpInfo = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            this.name = '';
            this.email = '';
            this.password = '';
            this.signUpUser(signUpInfo);
        }
    }
}
</script>

<style></style>