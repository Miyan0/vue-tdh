<template>
  <div id="app">
    <rapport-list :rapports="rapports" @rapportSelect="onRapportSelect"></rapport-list>
    <rapport-detail :rapport="selectedRapport" @addNewRapport="onAddNewRapport"></rapport-detail>

  </div>
</template>

<script>
import RapportDetail from './components/RapportDetail'
import RapportList from './components/RapportList'

export default {
  name: 'app',
  data() {
    return {
      rapports: [
        {
          id: 1,
          name: 'Rapport 1'
        },
        {
          id: 2,
          name: 'Rapport 2'
        },
        {
          id: 3,
          name: 'Rapport 3'
        },
        {
          id: 4,
          name: 'Rapport 4'
        }
      ],
      selectedRapport: null,
      nextId: 5
    }
  },
  components: {
    RapportDetail,
    RapportList
  },
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

<style scoped>
  #app {
    display: flex;
    justify-content: space-between;
    align-items: center
  }
</style>
