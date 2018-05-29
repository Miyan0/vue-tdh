<template>
  <form class="detail">
    <template v-if="selectedRapport">
      <!-- left section -->
      <section class="detail__left-section">
        <div class="form-group">
            <label class="form-label" for="id_rapport_type">Rapport</label>
          <select
              name="proc-type"
              class="form-control select"
              id="id_rapport_type"
              v-model="rapportType"
          >
            <option v-for="(option, index) in rapportTypes" :value="option" :key="index">
              {{ option }}
            </option>
          </select>
          </div>
        <div class="form-group">
          <label class="form-label" for="id_proc_type">Procédure</label>
          <select
              name="proc-type"
              class="form-control select"
              id="id_proc_type"
              v-model="procType"
          >
            <option v-for="(option, index) in procedureTypes" :value="option" :key="index">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="form-group" v-show="showAuditionDate">
          <label class="form-label" for="id_audition">Audition</label>
          <input
              class="form-control"
              type="date"
              placeholder="Audition"
              id="id_audition"
              name="audition"
              v-model="selectedRapport.audition_date"
              required
          >
        </div>
        <div class="form-group">
          <label class="form-label" for="id_nocause">#</label>
          <input
              class="form-control"
              type="text"
              placeholder="no cause"
              id="id_nocause"
              name="nocause"
              @focus="onNoCauseFocus"
              @change="onNoCauseChange"
              :value="noCause"
              required
          >
        </div>
        
        <div class="form-group">
          <label class="form-label" for="id_lot">Lot</label>
          <input class="form-control" type="text" placeholder="secteur" id="id_lot" name="no_lot"
                 v-model="selectedRapport.no_lot" disabled>
        </div>
        
      </section> <!-- end left section -->
      
      <!-- middle section -->
      <section class="detail__middle-section">
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="id_proc_type">Démarche</label>
            <input
                class="form-control"
                type="date"
                placeholder="id"
                id="id_demarche_date-date"
                name="demarche_date-date"
                v-model="demarcheDate"
                required
            >
          </div>
          <div class="form-group">
            <label class="form-label" for="id_proc_type">&nbsp;</label>
            <input
                class="form-control"
                type="time"
                placeholder="id"
                id="id_demarche_date-time"
                name="demarche_date-time"
                v-model="demarcheTime"
                required
            >
          </div>
        </div>
      
      </section> <!-- end middle section -->
      
      <!-- right section -->
      <section class="detail__right-section">
        <button class="btn" @click.prevent="onRevert">Revert</button>
        <button class="btn" @click.prevent="onSave">Save</button>
      </section> <!-- end right section -->
      
    </template>
    <div v-else>
      <p>Selectionner un rapport dans la liste</p>
    </div>
    
  </form>
</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment'
import helpers from './helpers'

const hasAuditionDate = (procType) => {
  // procedure types which needs an audtion date (ex subpoena)
  const typesWithAudition = [1, 2, 3, 10, 11, 12, 13, 14]
  return typesWithAudition.indexOf(procType) !== -1
}


export default {
  name: 'RapportDetail',
  components: {
  },
  data() {
    return {
      showAuditionDate: this.hasAuditionDate,
    }
  },
  
  beforeUpdate() {
    console.log('RapportDetail, updated Called')
    // this.demarcheDate = moment(this.selectedRapport.demarche_date).format('YYYY-MM-DD')
    // this.demarcheTime = moment(this.selectedRapport.demarche_date).format('HH:mm')
    this.showAuditionDate = hasAuditionDate(this.selectedRapport.procedure_type)
  },
  computed: {
    ...mapGetters([
      'selectedRapport',
      'procedureTypes',
      'rapportTypes',
      'rapportTypeStr',
      'procedureTypeStr',
    ]),

    demarcheDate() {
      return moment(this.selectedRapport.demarche_date).format('YYYY-MM-DD')
    },

    demarcheTime() {
      return moment(this.selectedRapport.demarche_date).format('HH:mm')
    },
    
    rapportType: {
      get () {
        const type = this.$store.state.rapports.selectedRapport.rapport_type
        return this.$store.state.rapports.rapportTypes[type]
      },
      set (value) {
        const types = this.$store.state.rapports.rapportTypes
        this.$store.commit('updateRapportType', types.indexOf(value))
      }
    },
    noCause() {
      return helpers.formatNoCause(this.$store.state.rapports.selectedRapport.no_cause)
    },
    procType: {
      get () {
        const type = this.$store.state.rapports.selectedRapport.procedure_type
        return this.$store.state.rapports.procedureTypes[type]
      },
      set (value) {
        const types = this.$store.state.rapports.procedureTypes
        this.$store.commit('updateProcType', types.indexOf(value))
      }
    },

  },
  methods: {
    onNoCauseFocus(event) {
      // remove '-'
      const val = event.target.value
      event.target.value = helpers.unformatNoCause(val)
    },
    onNoCauseChange() {
      const val = event.target.value
      console.log('onChange, val :', val)
      event.target.value = helpers.formatNoCause(val)
      this.$store.commit('updateNoCause', val)
    },
    onRevert() {
      this.$store.commit('revertFormChanges', this.selectedRapport)
    },
    onSave() {
      this.$store.commit('saveFormChanges', this.selectedRapport)
    }

  }
}
</script>


<style scoped lang="scss">
  @import "../../sass/abstracts/_variables";
  
  .detail {
    min-width: 60%;
    margin-left: 2rem;
    margin-right: 2rem;
    // color: $color-primary;
    border: 1px solid #ddd;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    &__left-section {
      margin-left: 2rem;
    }
  }
</style>
