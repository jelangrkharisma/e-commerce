<template>
  <div class="">
    <div class="d-flex justify-content-between">
      <div class="title d-flex">
        <spinner v-if="remLoading" class="mr-2" :color="'#d78398'" :size="'23px'" />
        <button v-else @click.prevent="remove" class="mr-4 btn btn-sm btn-outline-danger"><i class="fas fa-times"></i></button>
        <div class="mr-2 align-self-center">
          <span class="cupcake-title">{{product._id.name}}</span>
        </div>
      </div>
      <div class="amount d-flex justify-content-end align-align-items-start">
        <div class="mr-auto">
          <small class="align-self-center mr-1 quantity">Rp.<span>{{product._id.price}}</span></small>
          <small class="align-self-center mr-1">X</small>
          <small class="align-self-center mr-1 quantity">{{product.quantity}}</small>
        </div>
        <div class="ml-4 d-flex align-items-baseline justify-content-center">
          <spinner v-if="isLoading" class="mr-2" :color="'#d78398'" :height="'15px'" :width="'2px'" />
          <button @click.prevent="decrease" v-if="product.quantity>0 && !isLoading" class="mr-2 btn btn-sm btn-outline-info"><i class="fas fa-minus"></i></button>
          <button @click.prevent="increase" v-if="!isLoading" class="btn btn-sm btn-outline-info"><i class="fas fa-plus"></i></button>
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
      isLoading: false,
      incLoading: false,
      remLoading: false
    }
  },
  props: ['product'],
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
      console.log('ini remove di methods CartRow')
      this.$store.dispatch('banishFromCartPromise', this.product._id._id)
        .then(() => {
          console.log('dispatch remove berhasil, ini di methods Cartrow')
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
</style>
