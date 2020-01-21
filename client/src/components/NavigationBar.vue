<template>
  <div class="container-fluid">
    <nav class="navbar navbar-light bg-light d-flex">
      <router-link to="/" id="brand"  class="navbar-brand mb-0 h1"><i class="fas fa-cookie-bite fa-3x"></i>Cups-aCake Store</router-link>
      <router-link to="/shoppingcart" v-if="isLoggedOn" class="navbar-brand mb-0 h1">Shopping Tray <i class="fas fa-shopping-basket"></i></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    isLoggedOn: Boolean
  },
  data () {
    return {}
  }
}
</script>

<style>
#brand{
  font-family: 'Anton', sans-serif;
}
</style>
