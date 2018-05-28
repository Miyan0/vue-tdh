<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/">Vue-TDH</router-link>
    </div>
    <div class="navbar-right">
      <router-link to="/login" v-if="!isAuthenticated" @click="onClickLogin">Login</router-link>
      <a v-else @click="logout">Logout</a>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  methods: {
    ...mapActions(['logout']), 
    onClickLogin() {

    }
  },
  computed: mapGetters(['isAuthenticated'])
}
</script>

<style scoped lang="scss">
  @import "../sass/abstracts/_variables";

  .navbar {
    display: flex;
    justify-content: space-between;
    padding: 1.5rem;
    border: 1px solid #ddd;
    margin-bottom: 1rem;

    a, a:visited {
      text-decoration: none;
      color: $color-primary;
      cursor: pointer;
    }
  }

</style>
