<template>
  <div class="p-3">
    <cartRow
    v-for="(product) in loggedOn.cart"
    v-bind:key="product._id._id"
    v-bind:product=product
    />
    <hr class="my-2">
    <div class="d-flex justify-content-between">
      <strong>Total: </strong>
      <div class="d-flex flex-column align-items-end">
        <strong>{{totalPayment}}</strong>
        <br>
        <button class="btn btn-info">Checkout</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import cartRow from '../components/CartRow'
export default {
  name: 'shoppingTray',
  components: {
    cartRow
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
      });
      return total
    }
  }
}
</script>

<style>
</style>
