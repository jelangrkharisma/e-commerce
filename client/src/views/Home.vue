<template>
  <div class="div">
    <div v-if="loggedOn._id == ''" class="card">
      <div class="card-body">
        <signupCard />
      </div>
    </div>
    <br>
    <catalogue />
  </div>
</template>

<script>
import signupCard from '../components/SignupCard'
import catalogue from '../components/Catalogue'
import { mapState } from 'vuex'
export default {
  computed: mapState({
    loggedOn: 'loggedOn'
  }),
  components: {
    signupCard,
    catalogue
  }
}
</script>

<style>

</style>
