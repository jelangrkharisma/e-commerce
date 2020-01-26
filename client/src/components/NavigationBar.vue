<template>
  <div class="container-fluid">
    <nav class="navbar navbar-light d-flex">
      <router-link to="/" id="brand"  class="navbar-brand mb-0 h1">
        <img src="https://storage.googleapis.com/ecommerce.jelangrkharisma.site/brand.png" class="biteLogo"/>
      </router-link>

      <router-link to="/profile" v-if="loggedOn.name !== ''" class="navbar-brand mb-0 h1 nav-profile">{{loggedOn.name}}<i  class="fas fa-shopping-basket pink ml-3"></i></router-link>
    </nav>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    isLoggedOn: Boolean
  },
  computed: mapState({
    loggedOn: 'loggedOn'
  })
}
</script>

<style>
.pink {
  color: #d78398
}
#brand{
  font-family: 'Anton', sans-serif;
}
.biteLogo{
  max-width: 60px;
}
*::-webkit-scrollbar {
  display: none;
}
.nav-profile {
  text-transform: capitalize
}
</style>
