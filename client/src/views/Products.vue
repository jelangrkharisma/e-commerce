<template>
  <router-view />
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: mapState({
    loggedOn: 'loggedOn'
  }),
  created () {

  }
}
</script>

<style>

</style>
