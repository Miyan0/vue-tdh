<template>
  <div class="list-rapport">
    <div class="list-header">
      <button class="btn btn-block btn-default" @click="loadRecords">Fetch Rapports</button>    
    </div>
    <ul >
        <rapport-list-item 
          v-for="rapport in allRapports"
          :key="rapport.id"
          :rapport="rapport"
        >
        </rapport-list-item>
    </ul>
    <app-paginator></app-paginator>
  </div>
    
</template>

<script>
import RapportListItem from './RapportListItem'
import AppPaginator from '../common/AppPaginator'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RapportList',
  components: {
    RapportListItem,
    AppPaginator
  },
  computed: {
    ...mapGetters(['allRapports', 'hasNext', 'hasPrev', 'pageNumber', 'pageCount'])
  },
  created() {
    this.loadRecords()
  },

  methods: {
    ...mapActions(['fetchRapports', 'nextPage', 'prevPage']),
    loadRecords() {
      this.fetchRapports({
        limit: 10,
        no_lot__gte: 258
        // no_cause__iexact: '83417302333'
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .list-rapport {
      min-width: 30%;
      .list-header {
        margin-bottom: 1rem;
      }
  }
</style>
