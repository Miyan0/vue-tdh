<template>
  <div id="app" >
    <navigation></navigation>
    <main v-if="isAuthenticated" class="content">
      <router-view></router-view>
    </main>
    <div v-else>
      <Login />
    </div>
    
  </div>
</template>

<script>
import AppHeader from '@/components/layout/AppHeader'
import Navigation from '@/components/layout/Navigation'
import Login from '@/components/Login'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  
  components: {
    AppHeader,
    Navigation,
    Login
  },
  computed: mapGetters(['isAuthenticated']),
  methods: {
    onRapportSelect(rapport) {
      this.selectedRapport = rapport
    },
    onAddNewRapport() {
      const newRapport = {
        id: this.nextId,
        name: `Rapport ${this.nextId}`
      }
      this.selectedRapport = newRapport
      this.rapports.push(newRapport)
      this.nextId += 1
    }
  }
}
</script>

<style lang="scss">
  
  // #app {
  //   display: flex;
  //   flex-direction: column;

  //   main {
  //     margin: 1rem;
  //   }
    
    
  // }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
