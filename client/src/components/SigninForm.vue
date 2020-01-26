<template>
  <div class="">
    <div class="d-flex justify-content-between">
      <h2>Signin</h2>
      <div class="">
        Doesn't have any account? <a v-on:click.prevent="showSignin" href="">Register here</a>
      </div>
    </div>
    <form @submit.prevent="submitSignin">
      <div class="form-group">
        <label >Email address</label>
        <input v-model="formEmail" type="email" class="form-control">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input v-model="formPassword" type="password" class="form-control">
      </div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input">
        <label class="form-check-label">cupcakes??</label>
      </div>
      <div v-if="alert" class="alert alert-danger">
        {{alert}}
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formEmail: '',
      formPassword: '',
      alert: ''
    }
  },
  methods: {
    showSignin () {
      this.$store.commit('changeUserForm', 'signup')
    },
    submitSignin () {
      const payload = {
        email: this.formEmail,
        password: this.formPassword
      }
      this.$store.dispatch('submitSignin', payload)
        .then(({ data }) => {
          localStorage.setItem('access_token', data.access_token)
          this.$store.dispatch('verifyToken', localStorage.getItem('access_token'))
        })
        .catch(err => {
          this.alert = 'Wrong username / password'
          this.formPassword = ''
          throw err
        })
    }
  }
}
</script>

<style>

</style>
