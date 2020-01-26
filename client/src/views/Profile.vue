<template>
  <router-view />
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    // proses untuk dia udah login belom
    if (localStorage.getItem('access_token')) {
      next('/')
    } else {
      next()
    }
  },
  beforeCreate (to, from, next) {
    // cek access token di local storage valid apa engga
    const accessToken = localStorage.getItem('access_token')
    this.$store.dispatch('verifyToken', accessToken)
      .then(result => {
        if (result._id !== '') {
          next('/')
        } else {
          this.$router.push('/')
        }
      })
      .catch(err => {
        this.$router.push('/')
        throw err
      })
  }
}
</script>

<style>

</style>
