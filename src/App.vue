<template>
  <div id="app">
    <div>
        <app-header></app-header>
    </div>
    <main v-if="isAuthenticated">
      <router-view></router-view>
    </main>
    <div v-else>
      <Login />
    </div>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import Login from '@/components/Login'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  
  components: {
    AppHeader,
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
  #app {
    display: flex;
    flex-direction: column;

    main {
      margin: 1rem;
    }
    
    
  }
</style>
