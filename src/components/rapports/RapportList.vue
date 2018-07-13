<template>
  <div class="list-rapport">
    <div class="list-header">
      <button class="btn btn-block btn-default" @click="toggleDetail">toggleDetail</button>    
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
import { mapGetters } from 'vuex'

export default {
  name: 'RapportList',
  props: ['toggleDetail'],
  components: {
    RapportListItem,
    AppPaginator
  },
  computed: {
    ...mapGetters(['allRapports', 'hasNext', 'hasPrev', 'pageNumber', 'pageCount'])
  },
  created() {
    // this.loadRecords()
  },

  // methods: {
  //   ...mapActions(['fetchRapports', 'nextPage', 'prevPage']),
  //   loadRecords() {
  //     this.fetchRapports(this.$route.query)
  //   }
  // }
}
</script>

<style scoped lang="scss">
  .list-rapport {
      // min-width: 30%;
      .list-header {
        margin-bottom: 1rem;
      }
  }
</style>
