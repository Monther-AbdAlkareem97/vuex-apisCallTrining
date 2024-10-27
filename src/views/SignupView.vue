<template>
    <div>
        <h1>Signup</h1>
        <form @submit.prevent="submitForm">
            <input type="text" v-model="name" placeholder="Enter your name">
            <input type="email" v-model="email" placeholder="Enter your email">
            <input type="text" v-model="password" placeholder="Enter your Password">
            <button type="submit">Signup</button>
        </form>
    </div>
</template>

<script>
import { mapState , mapActions } from 'vuex';
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