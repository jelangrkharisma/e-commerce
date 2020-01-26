<template>
  <div>
    <div class="d-flex justify-content-end">
      <div class="mb-4 btn btn-outline-info" @click.prevent="logout">Logout</div>
    </div>
    <div class="card mb-2">
      <div class="card-body">
        <dt class="col-sm-3">Name :</dt>
        <dd class="col-sm-9">{{loggedOn.name}}</dd>
      </div>
    </div>
    <div class="card mb-2">
      <div class="card-body">
        <dt class="col-sm-3">Email :</dt>
        <dd class="col-sm-9">{{loggedOn.email}}</dd>
      </div>
    </div>

    <div class="card mb-2">
      <div class="card-body">
        <dt class="col-sm-3">Shopping cart :</dt>
        <cartList />
      </div>
    </div>

    <div class="card mb-2">
      <div class="card-body">
        <dt class="col-sm-12">Transaction history</dt>
        <dd class="col-sm-9">A description list is perfect for defining terms.</dd>
      </div>
    </div>

  </div>
</template>

<script>
import cartList from '../components/CartList'
import { mapState } from 'vuex'

export default {
  components: {
    cartList
  },
  methods: {
    logout () {
      localStorage.clear()
      this.$store.commit('logout')
      this.$router.push('/')
    }
  },
  computed: {
    ...mapState({
      loggedOn: 'loggedOn'
    })
  }
}
</script>

<style>

</style>
