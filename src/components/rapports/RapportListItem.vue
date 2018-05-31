<template>

    <li @click="selectRapport(rapport)" :class="{selected: isSelected}">
      <div class="rapport-item-left">
        Lot: {{ rapport.no_lot}}
        <br>
        {{ rapport.secteur }}
      </div>
      <div class="rapport-item-right">
        # <span class="txt-bold">{{noCause}}</span> - {{address}}
        <br>
        {{ demarcheDate }} - <span class="txt-bold">{{ procType }}</span> {{ audition }}
      </div>
      
    </li>

</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import helpers from './helpers'
import moment from 'moment'

export default {
  name: 'RapportListItem',
  props: ['rapport'],
  methods: {
    ...mapActions(['selectRapport']),
  },
  computed: {
    ...mapGetters(['selectedRapport', 'procedureTypes']),
    address() {
      return helpers.formatAddress(this.rapport)
    },
    noCause() {
      return helpers.formatNoCause(this.rapport.no_cause)
    },
    isSelected() {
      if (this.selectedRapport == null) {
        return false
      }
      return this.rapport.id === this.selectedRapport.id
    },
    demarcheDate() {
      return moment(this.rapport.demarche_date).format('YYYY-MM-DD - HH:mm')
    },
    procType() {
      return this.procedureTypes[this.rapport.procedure_type]
    },
    audition() {
      if (this.rapport.audition_date != null) {
        return `- (${moment(this.rapport.demarche_date).format('YYYY-MM-DD')})`
      }
      return ''
    }
  }
}
</script>

<style scoped lang="scss">
  @import "../../sass/abstracts/_variables";

  li {
    display: flex;
    justify-content: flex-start;
    cursor: pointer;
    padding: 10px;
    list-style: none;
    border: 1px solid $color-default;
    border-radius: 3px;
    font-size: 1.2rem;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &:hover, &:active, &:focus {
      border-color: $color-primary;
    }

    
  }

  .selected {
      border-color: $color-accent;
  }

  .rapport-item-left {
    padding-right: 1rem;
  }
  
</style>
