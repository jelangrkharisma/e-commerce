<template>
  <div class="p-3">
    <cartRow
    v-for="(product) in loggedOn.cart"
    v-bind:key="product._id._id"
    v-bind:product=product
    v-bind:outOfStocks="outOfStocks"
    />
    <hr class="my-2">
    <div v-if="outOfStocks.length > 0" class="text-center alert alert-danger">
      Checkout failed, some product out of order
    </div>
    <div v-if="isSuccess" class="text-center alert alert-success">
      Thankyou for your order
    </div>
    <div class="d-flex justify-content-between">
      <strong>Total: </strong>
      <div class="d-flex flex-column align-items-end">
        <strong>{{totalPayment}}</strong>
        <button :disabled="isLoading" @click.prevent="checkout" class="mt-2 btn btn-info">
          <div v-if="isLoading" class="">
            Checking-Out
            <spinner v-if="isLoading" class="mr-2" :color="'#ffffff'" :height="'14px'" />
          </div>
          <div v-else class="">
            Check-Out
          </div>
        </button>

      </div>
    </div>

  </div>
</template>

<script>
import spinner from 'vue-spinner/src/ScaleLoader'
import { mapState } from 'vuex'
import cartRow from '../components/CartRow'
export default {
  name: 'shoppingTray',
  data () {
    return {
      outOfStocks: [],
      isLoading: false,
      isSuccess: false
    }
  },
  components: {
    cartRow,
    spinner
  },
  methods: {
    checkout () {
      this.isLoading = true
      this.$store.dispatch('checkout')
        .then(result => {
          return this.$store.dispatch('fetchUserData')
        })
        .then(() => {
          this.isLoading = false
          this.isSuccess = true
        })
        .catch(err => {
          this.isLoading = false
          this.outOfStocks = err.response.data.outOfStockProducts
        })
    }
  },
  computed: {
    ...mapState({
      loggedOn: 'loggedOn'
    }),
    totalPayment () {
      const cart = this.$store.state.loggedOn.cart
      let total = 0
      cart.forEach(row => {
        const subTotal = row._id.price * row.quantity
        total += subTotal
      })
      return total
    }
  }
}
</script>

<style>
</style>
