<template>
  <div class="main">
    <input type="text" :value="demarcheDate" class="form-control">
    <div class="master-detail" v-if="isAuthenticated">
      <rapport-list></rapport-list>
      <rapport-detail></rapport-detail>
    </div>
    <h1 v-else>Veuillez vous enregistrer s.v.p.</h1>
  </div>

</template>

<script>
import RapportDetail from './RapportDetail'
import RapportList from './RapportList'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Rapports',
  mounted() {
    this.fetchAllRues()
  },

  methods: mapActions(['fetchAllRues']),
  components: {
    RapportDetail,
    RapportList
  },
  computed:{
    ...mapGetters(['isAuthenticated', 'selectedRapport']),
    demarcheDate() {
      if (this.selectedRapport) {
        return this.selectedRapport.demarche_date
      }
      return 'no selected rapport'
    }
  }
}
</script>

<style scoped>
  .master-detail {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

</style>
