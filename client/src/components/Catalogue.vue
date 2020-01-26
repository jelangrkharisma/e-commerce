<template>
  <div class="d-flex flex-wrap justify-content-around">
    <productCard
      v-for="product in products"
      v-bind:key="product._id"
      v-bind:product="product"
    />
  </div>
</template>

<script>
import productCard from '../components/ProductCard'
import { mapState } from 'vuex'

export default {
  components: {
    productCard
  },
  computed: mapState({
    products: 'products'
  })
}
</script>

<style>
</style>
