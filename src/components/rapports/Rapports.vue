<template>
  <div class="main">
    <content-header
      :icon=icon
      title="Rapports"
      infos="Page d'acceuil pour les rapports. Pour afficher, créer, modifier, imprimer et supprimer les rapports."
      top="Rapports"
      middle="Ajout"
      bottom="Liste"
    ></content-header>
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
import ContentHeader from '@/components/layout/ContentHeader'
import { mapGetters, mapActions } from 'vuex'
import {RAPPORTS_ICON} from '@/app_constants'

export default {
  name: 'Rapports',
  mounted() {
    this.fetchAllRues()
  },
  data() {
    return {
      icon: RAPPORTS_ICON
    }
  },

  methods: mapActions(['fetchAllRues']),
  components: {
    RapportDetail,
    RapportList,
    ContentHeader
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
