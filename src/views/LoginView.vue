<template>
    <div>
        <form>
            <h2>Login page</h2>
            <input type="text" v-model="email" placeholder="enter your email">
            <input type="password" v-model="password" placeholder="enter your password">
            <button>login</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            email: '',
            password: '',
        }
    }
}
</script>

<style></style>