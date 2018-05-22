<template>
  <div class="rapport-detail">
    <div v-if="selectedRapport">
      <p>
          <input class="form__input" type="text" placeholder="id" id="rapport_id" name="rapport_id" v-model="selectedRapport.id" required>
          <label class="form__label" for="rapport_id">ID</label>
      </p>
      <p>
          <input class="form__input" type="text" placeholder="name" id="rapport_name" name="rapport_name" v-model="selectedRapport.name" required>
          <label class="form__label" for="rapport_name">Name</label>
      </p>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: 'RapportDetail',
  computed: mapGetters(['selectedRapport']),
  methods: {
  }
}
</script>


<style scoped lang="scss">
    @import "../../sass/abstracts/_variables";
    .rapport-detail {
        min-width: 50%;
        margin-left: 2rem;
        margin-right: 2rem;
        // color: $color-primary;
        border: 1px solid #ddd;
    }
</style>
