<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
    </div> -->
    <navigationBar :isLoggedOn="isLoggedOn"/>
    <div class="container mt-3">
      <router-view :isLoggedOn="isLoggedOn"/>
    </div>
    <br><br><br>

  </div>
</template>
<script>
import navigationBar from './components/NavigationBar'
export default {
  name: 'CakeStore',
  data () {
    return {
      isLoggedOn: true
    }
  },
  components: {
    navigationBar
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
