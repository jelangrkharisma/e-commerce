<template>
  <div class="">
    <div class="d-flex justify-content-between">
      <h2>Signup as a new members</h2>
      <div class="">
        a member? <a v-on:click.prevent="showSignin" href="">signin here</a>
      </div>
    </div>
    <form v-on:submit.prevent="signUp">
      <div class="form-group">
        <label >Full Name</label>
        <input v-model="formFullName" type="text" required class="form-control">
      </div>
      <div class="form-group">
        <label >Email address</label>
        <input v-model="formEmail" type="email"  required class="form-control">
        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
      </div>
      <div class="form-group">
        <label>Password</label>
        <input required v-bind:class="{'is-invalid': passwordAlert !== ''}" v-model="formPassword" type="password" class="form-control">
      </div>
      <div class="form-group">
        <label>Password Confirm</label>
        <input required v-bind:class="{'is-invalid': passwordAlert !== ''}" v-model="formPasswordConfirm" type="password" class="form-control">
      </div>
      <div v-if="alert === ''" class="alert alert-danger d-flex justify-content-center">{{passwordAlert}}</div>
      <div class="form-group form-check">
        <input type="checkbox" class="form-check-input">
        <label class="form-check-label">cupcakes??</label>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    <div v-if="successAlert !== ''">
      <hr class="my-3">
      <div class="alert alert-success d-flex justify-content-center">{{successAlert}}</div>
    </div>
  </div>
</template>

<script>
// import axios from '@/axios'
export default {
  data () {
    return {
      successAlert: '',
      passwordAlert: '',
      formFullName: '',
      formEmail: '',
      formPassword: '',
      formPasswordConfirm: ''
    }
  },
  methods: {
    showSignin () {
      this.$store.commit('changeUserForm', 'signin')
    },
    signUp () {
      if (this.formPassword !== this.formPasswordConfirm) {
        this.passwordAlert = 'password does not match'
      } else {
        const payload = {
          name: this.formFullName,
          email: this.formEmail,
          password: this.formPassword
        }
        this.$store.dispatch('submitSignup', payload)
          .then(result => {
            this.successAlert = 'Successfullly registered, you can signin now'
            this.formFullName = ''
            this.formEmail = ''
            this.formPassword = ''
            this.formPasswordConfirm = ''
          })
      }
    }
  }
}
</script>

<style>

</style>
