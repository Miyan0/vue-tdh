<template>

    <li @click="selectRapport(rapport)" :class="{selected: rapport === selectedRapport}">
      # <span class="txt-bold">{{noCause}}</span> - {{address}} ({{ rapport.secteur }})
      <br>
      Lot: {{ rapport.no_lot}} - {{ rapport.demarche_date}}
    </li>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import helpers from './helpers'

export default {
  name: 'RapportListItem',
  props: ['rapport'],
  methods: {
    ...mapActions(['selectRapport']),
  },
  computed: {
    ...mapGetters(['selectedRapport']),
    address() {
      return helpers.formatAddress(this.rapport)
    },
    noCause() {
      return helpers.formatNoCause(this.rapport.no_cause)
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../sass/abstracts/_variables";

  li {
    cursor: pointer;
    padding: 10px;
    list-style: none;
    border: 1px solid #ddd;
    font-size: 1.2rem;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &:hover, &:active, &:focus {
      background-color: $color-primary-light;
    }

    
  }

  .selected {
      background-color: $color-primary-light;
      border: 1px solid $color-primary-dark;
  }
  
</style>
