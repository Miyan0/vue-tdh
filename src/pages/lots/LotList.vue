<template>
<div>

   <div v-for="lot in $store.state.lots.lots" :key='lot.id' class="lot-tile" @click="showRapports(lot.id)">
     <div class="lot-tile__date">{{ created(lot.created) }}</div>
     <div class="lot-tile__secteur">{{lot.secteurs}}</div>
     <div class="lot-tile__lot-and-count">
       <span class="lot-tile__no-lot">{{lot.no_lot}} - </span>
       <span class="lot-tile__count">{{lot.nb_pvs}}</span>
      </div>
    </div>
</div>
</template>

<script>
import moment from 'moment'

export default {
  mounted() {
    this.$store.dispatch('fetchLots', { limit: 28 })
  },
  methods: {
    created(date) {
      const aDate = moment(date)
      const today = moment()
      let format = 'D-MM Y'
      if (today.isSame(aDate, 'year')) {
        format = 'D-MM'
      }
      return aDate.format(format)
    },
    showRapports(no_lot) {
      console.log('no lot', no_lot)
      this.$router.push({name: 'rapports', query: {no_lot: no_lot}})
    }
  }
  
}
</script>

<style lang="scss">
  $lot-color: #f6a821;

 .lot-tile {
    display: inline-block;
    box-shadow: inset 0 0 0 1px rgb(142, 142, 197), 0 0 0 1px #5643fa;
    border-radius: .6rem;
    padding: 1rem;
    margin: 1rem;
    min-width: 15rem;
    text-align: center;
    font-size: 1.6rem;
    cursor: pointer;

    &:hover {
      box-shadow: inset 0 0 0 1px #D7D7DB, 0 0 0 5px #D7D7DB;
    }

   &__date {
     color: $lot-color;
     font-weight: 700;
   }

   &__secteur {
     color: #5643fa;
     font-weight: 700;
   }

   &__no-lot {
     color: white;
   }

   &__count {
     color: green;
   }

 }
</style>
