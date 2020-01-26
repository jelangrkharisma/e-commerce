<template>
  <div class="cart-row">
    <div class="row px-3">
      <div class="left-side mr-auto">
        <div class="title d-flex align-items-center">
          <div class="">
            <button @click.prevent="remove" class="mr-4 btn-cart btn btn-sm btn-light text-danger" :disabled="isLoading">
              <i v-if="isLoading" class="fas fa-spinner"></i>
              <i v-if="!isLoading" class="fas fa-times"></i>
            </button>
          </div>

          <div class="mr-2 align-self-center">
            <div v-if="outOfStocks.includes(product._id._id)" class="">
              <span class="cupcake-title"><s>{{product._id.name}}</s></span>
              <small class="mx-2">out of order</small>
            </div>
            <span v-else class="cupcake-title">{{product._id.name}}</span>
          </div>
        </div>
      </div>

      <div class="right-side d-flex justify-content-between align-items-center">
        <div class="d-flex justify-content-start align-items-center">
          <small class="quantity">Rp.<span>{{product._id.price}}</span></small>
          <small class="mx-2">X</small>
          <small class="quantity">{{product.quantity}}</small>
        </div>

        <div class="d-flex justify-content-center align-items-center" style="min-width:4rem">
          <spinner v-if="isLoading" class="mr-2" :color="'#d78398'" :height="'14px'" />
          <button @click.prevent="decrease" v-if="product.quantity>0 && !isLoading" class="mr-2 btn btn-sm btn-outline-info btn-cart"><i class="fas fa-minus"></i></button>
          <button @click.prevent="increase" v-if="!isLoading" class="btn btn-cart btn-sm btn-outline-info"><i class="fas fa-plus"></i></button>
        </div>
      </div>
    </div>
    <hr class="my-2">
  </div>
</template>

<script>
import spinner from 'vue-spinner/src/ScaleLoader'
export default {
  data () {
    return {
      isLoading: false
    }
  },
  props: ['product', 'outOfStocks'],
  components: {
    spinner
  },
  methods: {
    increase () {
      // console.log('increase',this.product._id._id)
      this.isLoading = true
      this.$store.dispatch('addToCartPromise', this.product._id._id)
        .then(() => {
          this.isLoading = false
        })
        .catch(err => {
          throw err
        })
    },
    decrease () {
      this.isLoading = true
      this.$store.dispatch('minusFromCartPromise', this.product._id._id)
        .then(() => {
          this.isLoading = false
        })
        .catch(err => {
          throw err
        })
    },
    remove () {
      this.remLoading = true
      this.$store.dispatch('banishFromCartPromise', this.product._id._id)
        .then(() => {
          this.remLoading = false
        })
        .catch(err => {
          throw err
        })
    }
  }
}
</script>

<style scoped>
.cupcake-title{
  text-transform: capitalize
}
.quantity {
  font-size: 1em
}
.right-side {
  min-width: 200px
}
.btn-cart {
  width:30px;
  height: 30px
}
</style>
