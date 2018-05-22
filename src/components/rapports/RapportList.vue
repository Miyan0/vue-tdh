<template>
  <div class="list-rapport">
    <button class="btn" @click="addRapport">Nouveau rapport</button>    
    <ul >
        <rapport-list-item 
          v-for="rapport in allRapports"
          :key="rapport.id"
          :rapport="rapport"
        >
        </rapport-list-item>
    </ul>
  </div>
    
</template>

<script>
import RapportListItem from './RapportListItem'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'RapportList',
  components: {
    RapportListItem
  },
  computed: mapGetters(['allRapports']),
  methods: mapActions(['addRapport'])
}
</script>

<style scoped lang="scss">
  .list-rapport {
      min-width: 30%;
      .btn {
        margin-bottom: 1rem;
        width: 100%;
      }
  }
</style>
