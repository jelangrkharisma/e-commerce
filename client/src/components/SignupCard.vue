<template>
  <div>
    <signinForm  v-if="userForm == 'signin'" />
    <signupForm  v-if="userForm == 'signup'"/>
  </div>
</template>

<script>
import signinForm from '../components/SigninForm.vue'
import signupForm from '../components/SignupForm.vue'
import { mapState } from 'vuex'
export default {
  components: {
    signinForm,
    signupForm
  },
  computed: mapState({
    userForm: 'userForm'
  })
}
</script>

<style>

</style>
