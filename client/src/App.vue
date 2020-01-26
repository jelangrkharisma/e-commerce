<template>
  <div id="app">
    <navigationBar/>
    <div class="container mt-3">
      <router-view/>
    </div>
    <br><br><br>

  </div>
</template>
<script>
import Swal from 'sweetalert2'
import navigationBar from './components/NavigationBar'
export default {
  name: 'CakeStore',
  components: {
    navigationBar
  },
  created () {
    const accessToken = localStorage.getItem('access_token')
    if (accessToken) {
      this.$store.dispatch('verifyToken', accessToken)
        .then(({ data }) => {
          this.$store.commit('assignLoggedOnInfo', data)
          Swal.fire({
            icon: 'success',
            title: 'Welcome Back, ' + data.name,
            showConfirmButton: false,
            timer: 1300,
            showClass: {
              popup: 'animated fadeInDown faster'
            },
            hideClass: {
              popup: 'animated fadeOutUp faster'
            }
          })
        })
        .catch(err => {
          throw err
        })
    }
    this.$store.dispatch('fetchCatalogue')
  }
}
</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Anton|Oxygen&display=swap');
*{
  font-family: 'Oxygen', sans-serif;
}
/* font-family: 'Bowlby One SC', cursive; */

</style>
