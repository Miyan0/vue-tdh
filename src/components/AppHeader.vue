<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <router-link to="/">TDH</router-link>
      <span>v.0.1</span>
    </div>
    <div class="navbar-right">
      <template v-if="isAuthenticated">
        <router-link to="/" >Dashboard <i class="pe-7s-graph1"></i></router-link>
        <router-link to="/factures"  >Facturation</router-link>
        <router-link to="/rapports"  >Rapports</router-link>
        <router-link to="/payes"  >Payes</router-link>
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
    // padding: 1.5rem;
    border: 1px solid #ddd;
    // margin-bottom: 1rem;
    height: 6rem;
    background-color: $color-white;

    a, a:visited {
      text-decoration: none;
      color: $color-grey-dark;
      cursor: pointer;
      font-size: 1.4rem;
    }
  }

  .navbar-brand {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: $color-brand;
    // padding: 1.5rem 10.6rem 1.5rem 3rem;
    width: 20rem;
    a, a:visited {
      color: $color-white;
      letter-spacing: 1rem;
    }
    span {
      color: $color-brand-version;
      letter-spacing: normal;
      font-size: 1.2rem;
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
