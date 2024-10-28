<template>
    <div class="flex items-center justify-center min-h-screen bg-gray-100">
        <form class="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 class="text-2xl font-semibold text-gray-700 mb-6 text-center">Login Page</h2>

            <input type="text" v-model="email" placeholder="Enter your email"
                class="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />

            <input type="password" v-model="password" placeholder="Enter your password"
                class="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400" />

            <button type="submit"
                class="w-full py-3 mt-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600 transition duration-200">
                Login
            </button>

            <div class="text-center mt-4">
                <router-link to="/signup" class="text-blue-500 hover:underline">Signup</router-link>
            </div>
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