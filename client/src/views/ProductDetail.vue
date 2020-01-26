<template>
  <div class="wrapper">
    <div class="card">
      <div class="d-flex">
        <img class="product-img" :src="product.image" alt="">
        <div class="p-3 d-flex flex-column justify-content-between">
          <div class="upper">
            <h4>{{product.name}}</h4>
            <hr class="my-2">
            <br>
            <strong>Price: </strong>{{product.price}}<br>
            <strong>Stock: </strong>{{product.stock}}
            <br>
            <p>{{product.description}}</p>
          </div>

          <div class="under">
            <hr class="my-2">
            <strong>On your cart: </strong>{{onMyCart}}<br>
            <strong>Total: </strong>{{onMyCart * product.price}}<br>
            <br>
            <i class="fa-btn fas fa-minus-circle text-info mr-2"></i>
            <div class="btn btn-info">add to cart</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axiosInstance from '../axios'
export default {
  data () {
    return {
      product: {}
    }
  },
  created () {
    axiosInstance({
      method: 'get',
      url: '/products/' + this.$route.params.id
    })
      .then(({ data }) => {
        this.product = data.products
      })
  },
  computed: {
    onMyCart () {
      let index = -1
      let cart = this.$store.state.loggedOn.cart
      for (let i = 0; i < cart.length; i++) {
        if (this.product._id === cart[i]._id._id) {
          index = i
          break
        }
      }
      if (index === -1) {
        return 0
      } else {
        return cart[index].quantity
      }
    }
  }
}
</script>

<style scoped>
h4 {
  text-transform: capitalize
}
.product-img{
  max-width: 20vw;
  min-height: 100%;
  object-fit: cover;
  box-sizing: border-box;
}
.fa-btn{
  cursor: pointer;
}
.fa-btn:hover{
  cursor: pointer;
  transform: translateY(1px)
}
</style>
