<template>
  <div class="master-detail" v-if="isAuthenticated">
    <rapport-list></rapport-list>
    <rapport-detail></rapport-detail>
  </div>
  <h1 v-else>Veuillez vous enregistrer s.v.p.</h1>
</template>

<script>
import RapportDetail from './RapportDetail'
import RapportList from './RapportList'
import { mapGetters } from 'vuex'

export default {
  name: 'Rapports',
  components: {
    RapportDetail,
    RapportList
  },
  computed: mapGetters(['isAuthenticated'])
}
</script>

<style scoped>
  .master-detail {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }

</style>
