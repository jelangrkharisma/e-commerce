<template>
  <div class="div">
    <div v-if="!isLoggedOn" class="card">
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
export default {
  props: {
    isLoggedOn: Boolean
  },
  data () {
    return {}
  },
  components: {
    signupCard,
    catalogue
  }
}
</script>

<style>

</style>
