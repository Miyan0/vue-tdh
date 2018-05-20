<template>
    <ul class="list-rapport" >
        <rapport-list-item 
          v-for="rapport in rapports"
          :key="rapport.id"
          :rapport="rapport"
          @rapportSelect="onRapportSelect"
        >

        </rapport-list-item>
    </ul>
</template>

<script>
import RapportListItem from './RapportListItem'

export default {
  name: 'RapportList',
  props: ['rapports'],
  components: {
    RapportListItem
  },
  methods: {
    onRapportSelect(rapport) {
      this.$emit('rapportSelect', rapport)
    }
  }
}
</script>

<style scoped>
    .list-rapport {
        min-width: 30%;
    }
</style>
