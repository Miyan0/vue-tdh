<template>
  <nav class="navbar">
    <div class="navbar-left">
      <router-link to="/">Vue-TDH</router-link>
    </div>
    <div class="navbar-right">
      <template v-if="isAuthenticated">
        <router-link to="/"  >Facturation</router-link>
        <router-link to="/"  >Rapports</router-link>
        <router-link to="/"  >Payes</router-link>
        <a  @click="logout">Logout</a>
      </template>
      <router-link v-else to="/login"  @click="onClickLogin">Login</router-link>
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

  .navbar-right {
    display: flex;
    justify-content: space-between;
    align-items: center;

    a {
      padding: 0 1rem;
    }
  }

</style>
