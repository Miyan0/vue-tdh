<template>
  <aside class="navigation">
    <nav>
      <div class="navbar-brand">
        <router-link to="/">TDH</router-link>
        <span>v.0.1</span>
      </div>
      <ul v-if="isAuthenticated" >
          <router-link class="nav-link" tag='li' to="/" >
            Dashboard
          </router-link>
          <router-link class="nav-link" tag='li' to="/factures"  >
            Facturation
          </router-link>
          <router-link class="nav-link" tag='li' to="/rapports"  >
            Rapports
          </router-link>
          <router-link class="nav-link" tag='li' to="/payes"  >
            Payes
          </router-link>
          <li class="nav-link">
            <a  @click="logout" href="">Logout</a>
          </li>
      </ul>
      <router-link v-else to="/login">Login</router-link>
    </nav>

  </aside>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: mapGetters(['isAuthenticated']),
  methods: {
    ...mapActions(['logout']), 
  },
  
}
</script>

<style lang="scss" scoped>
  
  @import "../../sass/abstracts/_variables";

  .navbar-brand {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: $color-brand;
    // padding: 1.5rem 10.6rem 1.5rem 3rem;
    width: 20rem;
    height: 6rem;
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

  a, a:visited {
    text-decoration: none;
    color: $color-white;
  }

  ul {
    padding-top: 3rem;
  }

  .nav-link {
    padding: .8rem 1.5rem .8rem 2.5rem;
    color: $color-white;
    cursor: pointer;

    &:hover {
      color: $color-theme-light;
    }

    &.router-link-exact-active {
      border-left: .4rem solid $color-theme;
      padding-left: 2.1rem;
      color: $color-theme-light-1;
    }
    
  }

  .navigation {
    // margin-top: 60px;
    background-color: darken($color-background, 5%);;
    width: $navigation-width;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 0;
    transition: left 0.3s ease-out;
    -webkit-transition: left 0.3s ease-out;

    nav {
      background-color: $color-navigation;
      // padding-top: 3rem;
    }

    &:before {
      transition: left 0.3s ease-out;
      -webkit-transition: left 0.3s ease-out;
      content: '';
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: -1;
      left: 0;
      background-color: darken($color-background, 5%);
      width: 200px;
    }
}
</style>

