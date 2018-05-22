<template>
  <div id="app">
    <div>
        <app-header></app-header>
      </div>
    <main>
      <router-view></router-view>
    </main>
    
    

  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import { mapGetters } from 'vuex'

export default {
  name: 'app',
  
  components: {
    AppHeader,
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
