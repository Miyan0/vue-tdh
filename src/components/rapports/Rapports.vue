<template>
  <div class="master-detail">
    <rapport-list></rapport-list>
    <rapport-detail></rapport-detail>
  </div>
</template>

<script>
import RapportDetail from './RapportDetail'
import RapportList from './RapportList'


export default {
  name: 'Rapports',
  components: {
    RapportDetail,
    RapportList
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
