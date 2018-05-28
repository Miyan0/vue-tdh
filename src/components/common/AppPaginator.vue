<template>
  <div class="paginator">
    <button class="btn" @click="prevPage" :disabled="!hasPrev">Prev</button>
      {{pageNumber}} / {{pageCount}}
    <button class="btn" @click="nextPage" :disabled="!hasNext">Next</button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'AppPaginator',
  computed: mapGetters([
    'hasPrev', 
    'pageNumber', 
    'pageCount',
    'hasNext'
  ]),
  methods: mapActions([
    'prevPage',
    'nextPage'
  ])
}
</script>

<style scoped lang="scss">
  .paginator {
    display: flex;
    justify-content: space-between;
    align-items: center;

    margin-top: 1rem;
  }
</style>


