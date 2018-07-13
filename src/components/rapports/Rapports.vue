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
    
      <div class="master-detail" v-if="isAuthenticated">
        <app-table-view :titles="titles" :data="allRapports" />
        <transition name=bounce>
          <rapport-detail2 v-if="selectedRapport"></rapport-detail2>
         </transition>
    </div>
    <h1 v-else>Veuillez vous enregistrer s.v.p.</h1>
   

    
  </div>

</template>

<script>

// <rapport-list :toggleDetail="toggleDetail"></rapport-list>

import RapportDetail from './RapportDetail'
import RapportDetail2 from './RapportDetail2'
import RapportList from './RapportList'
import ContentHeader from '@/components/layout/ContentHeader'
import { mapGetters, mapActions } from 'vuex'
import {RAPPORTS_ICON} from '@/app_constants'
import AppTableView from '@/components/common/AppTableView'
// import helpers from './helpers'

export default {
  name: 'Rapports',

  mounted() {
    this.fetchAllRues()
    this.loadRecords(this.$route.query)
    console.log('params :', this.$route.query)
  },

  data() {
    return {
      icon: RAPPORTS_ICON,
      showDetail: false
    }
  },
  
    

  methods: {
    ...mapActions(['fetchRapports', 'nextPage', 'prevPage', 'fetchAllRues']),
    toggleDetail() {
      this.showDetail = this.selectedRapport !== null 
    },
    loadRecords(query) {
      this.fetchRapports(query)
    },

  },

  components: {
    RapportDetail,
    RapportDetail2,
    RapportList,
    ContentHeader,
    AppTableView
  },
  computed:{
    ...mapGetters(['isAuthenticated', 'selectedRapport','allRapports', 'hasNext', 'hasPrev', 'pageNumber', 'pageCount', 'procedureTypes']),
    titles() {
      return ['Procédure','Lot', 'No Cause', 'Adresse', 'Démarche', 'Secteur']
    },
    
  },
  demarcheDate() {
    if (this.selectedRapport) {
      return this.selectedRapport.demarche_date
    }
    return 'no selected rapport'
  },
 
  
}
</script>

<style scoped>
  .master-detail {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .bounce-enter-active {
  animation: bounce-in .5s;
  }
  .bounce-leave-active {
    animation: bounce-in .5s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

</style>
