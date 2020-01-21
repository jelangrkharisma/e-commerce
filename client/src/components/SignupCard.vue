<template>
  <div class="">
    <signinForm v-if="showform == 'signin'" />
    <signupForm v-if="showform == 'signup'"/>
  </div>
</template>

<script>
import signinForm from '../components/SigninForm.vue'
import signupForm from '../components/SignupForm.vue'
export default {
  data () {
    return {
      showform: 'signin'
    }
  },
  components: {
    signinForm,
    signupForm
  }
}
</script>

<style>

</style>
