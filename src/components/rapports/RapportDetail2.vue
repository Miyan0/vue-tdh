<template>
  <section class="detail">
    <header class="detail__header">
      <a ><i class="fas fa-long-arrow-alt-left"></i></a>
      <div class="detail__header__title">{{procType}}</div>
      <a ><i class="fas fa-times"></i></a>
    </header>
    <div class="detail__content">
      <form-input :value="selectedRapport.no_lot" icon="stack2"></form-input>
      <form-input v-if="selectedRapport.audition_date" :value="selectedRapport.audition_date" icon="justice"></form-input>
      <form-input :value="selectedRapport.no_cause" icon="ticket"></form-input>
      <form-input value="12345 Henri-Bourassa Est # 245" icon="location"></form-input>
      <form-input :value="demarcheDateTime" icon="car"></form-input>
      <form-input v-if="selectedRapport.notes" :value="selectedRapport.notes" icon="comments"></form-input>
      <form-input value="$ 6.00 + $14.90 = $ 20.90" icon="calculator"></form-input>
    </div>
    <footer class="detail__footer">
       <div class="icon-wrapper">
         <svgicon class="icon-only" name=trashcan width="24" height="24"></svgicon>
       </div>
       <div class="icon-wrapper">
         <svgicon class="icon-only" name=printer width="24" height="24"></svgicon>
       </div>
      
    </footer>
  </section>
  
</template>

<script>
import FormInput from '@/components/FormInput'
import '@/components/icons'
import { mapGetters } from 'vuex'
import helpers from './helpers'
import moment from 'moment'

export default {
  components: {
    FormInput
  },
  computed: {
    ...mapGetters([
      'selectedRapport',
      'procedureTypes',
      'rapportTypes',
      'rapportTypeStr',
      'procedureTypeStr',
      'getRues'
    ]),
    procType() {
      if (this.selectedRapport !== null) {
        const type = this.$store.state.rapports.selectedRapport.procedure_type
        return this.$store.state.rapports.procedureTypes[type]
      } else {
        return ''
      }
      
    },
    noCause() {
      return helpers.formatNoCause(this.$store.state.rapports.selectedRapport.no_cause)
    },
    demarcheDateTime() {
      return moment(this.selectedRapport.demarche_date).format('YYYY-MM-DD - HH:mm')
    },
  }
}
</script>

<style lang="scss" scoped>
  .detail {
    display: flex;
    min-width: 30%;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    background: linear-gradient(to bottom right, rgba(30,34,43,1) 0%, rgba(40,47,55,1) 100%);
    box-shadow: -3px 1px 5px 0px rgba(44,139,255,0.54);

    &__header {
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;
      color: white;
      width: 100%;
      height: 6rem;
      background-color: transparent;
      border-bottom: 1px solid #18191D;

      i {
        padding: 2rem;
      }

      &__title {
        font-size: 2rem;
      }
    }

    &__content {
      background-color: transparent;
      display: flex;
      // justify-content: flex-start;
      align-items: center;
      flex-direction: column;
      min-width: 90%;
      flex-grow: 2;
      margin-top: 2rem;

      
    }

    &__footer {
      background-color: transparent;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem;
      width: 100%;
      height: 5rem;
      
      
     
    }
  }
  .form-input {
    margin: 1rem;

  }

  .icon-wrapper {
    cursor: pointer;
    padding: 1rem;
    color: white;
    &:hover {
      color: #2c8cff;
    }
  }

</style>

