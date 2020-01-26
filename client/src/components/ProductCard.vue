<template>
  <div class="img-container">
    <div class="product-card img-thumbnail">
      <div class="img-wrapper">
        <img class="product-img" v-bind:src="product.image" alt="">

        <div class="caption">
          <div class="button-row d-flex align-items-center">
              <removeLoadingAnimation class="mr-3" v-if="isLoadingMin" :color="'#d78398'" :size="'30px'" />
              <i v-if="!isLoadingMin && quantity>0" class="fa-btn fas fa-minus-circle mr-3" @click.prevent="removeFromCart"></i>

            <div class="btn-fixedwidth">
              <button class="btn-block btn btn-pink btn-lg" @click.prevent="addToCart">
                <div class="d-flex align-items-center justify-content-between">
                  <addLoadingAnimation v-if="isLoadingAdd" :color="'#ffffff'" :size="'8px'"/>
                  <strong v-else >On your cart:</strong>
                  <span class="ml-2 badge badge-light pink-quantity">{{quantity}}</span>
                </div>
              </button>
            </div>
          </div>
          <a>{{product.name}}</a>
          <small>Rp.{{product.price}}</small>

          <router-link class="readmore" v-if="alert == ''" :to="`/products/${product._id}`"><u>readmore...</u></router-link>
          <router-link class="readmore" v-if="alert !== ''" :to="`/products/${product._id}`">{{alert}}</router-link>

        </div>
      </div>
    </div>

  </div>
</template>

<script>
import addLoadingAnimation from 'vue-spinner/src/SyncLoader'
import removeLoadingAnimation from 'vue-spinner/src/BounceLoader'
export default {
  data () {
    return {
      alert: '',
      isLoadingAdd: false,
      isLoadingMin: false
    }
  },
  components: {
    addLoadingAnimation,
    removeLoadingAnimation
  },
  props: {
    product: Object
  },
  methods: {
    addToCart () {
      this.isLoadingAdd = true
      this.alert = 'wait...'
      this.$store.dispatch('addToCartPromise', this.product._id)
        .then(() => {
          this.alert = 'added to cart'
          setTimeout(() => {
            this.alert = ''
          }, 8000)
          this.isLoadingAdd = false
        })
    },
    removeFromCart () {
      this.isLoadingMin = true
      this.alert = 'wait...'
      this.$store.dispatch('minusFromCartPromise', this.product._id)
        .then(() => {
          this.alert = 'removed from cart'
          setTimeout(() => {
            this.alert = ''
          }, 8000)
          this.isLoadingMin = false
        })
    }
  },
  computed: {
    quantity () {
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
.btn-pink {
  background-color: #d78398;
  color: white;
}
.btn-pink:hover {
  transform: translateY(1px)
}
.pink-quantity {
  color: #d78398;
  font-size: 1.05em
}
.readmore{
  text-transform: lowercase;
  color: black;
  font-size: 0.6em;
  font-weight: 300
}
.img-container{
  margin:0.5em;
}
.product-img{
  width: 300px;
  height: 480px;
  object-fit: cover;
  box-sizing: border-box;
}
.img-wrapper{
  position: relative;
}
.caption {
  display: flex;
  flex-direction: column;
  font-size: 1.5rem;
  font-weight: bold;
  font-style: italic;
  text-transform: capitalize;
  position: absolute;
  width:100%;
  bottom: 10%;
  left: 0;
  background-color: rgba(255,255,255,0.78);
  padding-top: 0.5em;
  padding-bottom: 1em;
  padding-left: 0.5em;
  padding-right: 2em;
}
.button-row{
  position: absolute;
  bottom: -20%;
  right: -5%;
}
.btn-fixedwidth{
  display: block;
  min-width: 200px
}
.fa-btn{
  color: #d78398;
  cursor: pointer;
}
.fa-btn:hover{
  cursor: pointer;
  transform: translateY(1px)
}
</style>
