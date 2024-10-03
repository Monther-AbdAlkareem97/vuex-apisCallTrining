import { createStore } from 'vuex'

export default createStore({
  state: {
    products: "",
  },
  getters: {
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
      console.log(products)
    }
  },
  actions: {
    async doGetProducts (context){
      await fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then((data) => {
        context.commit('setProducts', data.products)
      })
    }
  },
  modules: {
  }
})
