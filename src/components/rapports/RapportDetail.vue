<template>
  <form class="detail panel">
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
              :value="procType"
              @change="onProcTypeChange"
          >
            <option v-for="(option, index) in procedureTypes" :value="option" :key="index">
              {{ option }}
            </option>
          </select>
        </div>
        <div class="form-group" v-if="showAuditionDate">
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
              ref="nocause"
              @focus="onNoCauseFocus"
              @change="onNoCauseChange"
              @blur="onNoCauseBlur"
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
            <label class="form-label" for="id_demarche_date">Démarche</label>
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
            <label class="form-label" for="id_demarche_date-time">&nbsp;</label>
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
        <div class="form-row">
          <div class="address-line1">
            <label class="address-line1__label" for="id_no_civique">Adresse</label>
            <div class="address-line1__inputs">
              <input
                  class="address-line1__no"
                  type="text"
                  placeholder="no civique"
                  id="id_no_civique"
                  name="no_civique"
                  v-model="selectedRapport.no_civique"
                  required
                  autocomplete="address-line1"
              >
            
              <input
                  class="address-line1__rue"
                  type="text"
                  placeholder="rue"
                  id="id_rue"
                  name="rue"
                  v-model="selectedRapport.rue"
                  required
                  autocomplete="address-line1"
              >
            
              <input
                  class="address-line1__apt"
                  type="text"
                  placeholder="apt"
                  id="id_apt"
                  name="apt"
                  v-model="selectedRapport.apt"
                  required
                  autocomplete="address-line1"
              >
            </div>            
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label class="form-label" for="id_ville">Ville</label>
            <input
                class="form-control"
                type="text"
                placeholder="ville"
                id="id_ville"
                name="ville"
                v-model="selectedRapport.ville"
                required
                autocomplete="city"
            >
          </div>
          <div class="form-group">
            <label class="form-label" for="id_km">Km</label>
            <input
                class="form-control form-control__medium"
                type="text"
                placeholder="km"
                id="id_km"
                name="km"
                v-model="selectedRapport.km"
                required
            >
          </div>
          <div class="form-group">
            <label class="form-label" for="id_secteur">Secteur</label>
            <input
                class="form-control form-control__small"
                type="text"
                placeholder="secteur"
                id="id_secteur"
                name="secteur"
                v-model="selectedRapport.secteur"
                required
            >
          </div>
          
          </div>
          <div class="form-row">
            <div class="form-group text-area-full">
            <label class="form-label" for="id_notes">Notes</label>
            <textarea
                class="form-control"
                cols="40"
                rows="10"
                placeholder="notes"
                id="id_notes"
                name="notes"
                v-model="selectedRapport.notes"
                required
            ></textarea>
          </div>
        </div>
      </section> <!-- end middle section -->
      
      <!-- right section -->
      <section class="detail__right-section">
        <div class="buttons">
          <button class="btn" @click.prevent="onRevert">Revert</button>
          <button class="btn" @click.prevent="onSave">Save</button>
        </div>
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
      isNewRecord: false,
      isDirty: false,
      beforeUpdateCalled: false,
    }
  },
  
  beforeCreate() {
    console.log('beforeCreate()')
  },
  created() {
    console.log('created()')
  },
  beforeMount() {
    console.log('beforeMount()')
  },
  mounted() {
    console.log('mounted()')
  },
  
 
  beforeUpdate() {
    console.log('beforeUpdate()')
    this.beforeUpdateCalled = true
    this.initState()
    // this.demarcheDate = moment(this.selectedRapport.demarche_date).format('YYYY-MM-DD')
    // this.demarcheTime = moment(this.selectedRapport.demarche_date).format('HH:mm')
    this.showAuditionDate = hasAuditionDate(this.selectedRapport.procedure_type)
  },
  updated() {
    console.log('updated()')
    this.$refs.nocause.focus()
  },

  activated() {
    console.log('activated()')
  },
  deactivated() {
    console.log('deactivated()')
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
    
    rapportType() {
      const type = this.$store.state.rapports.selectedRapport.rapport_type
      return this.$store.state.rapports.rapportTypes[type]
    },
    noCause() {
      return helpers.formatNoCause(this.$store.state.rapports.selectedRapport.no_cause)
    },
    procType() {
      const type = this.$store.state.rapports.selectedRapport.procedure_type
      return this.$store.state.rapports.procedureTypes[type]
    },

  },
  methods: {
    initState() {
      this.isNewRecord = false
      this.isNewRecord = false,
      this.isDirty = false
    },
    onNoCauseFocus(event) {
      // remove '-'
      const val = event.target.value
      event.target.value = helpers.unformatNoCause(val)
    },
    onNoCauseChange() {
      const val = event.target.value
      event.target.value = helpers.formatNoCause(val)
      this.$store.commit('updateNoCause', val)
    },
    onNoCauseBlur(event) {
      event.target.value = helpers.formatNoCause(event.target.value)
    },
    onProcTypeChange(event) {
      // console.log('event.target.value :', event.target.value)
      const types = this.$store.state.rapports.procedureTypes
      this.$store.commit('updateProcType', types.indexOf(event.target.value))
      
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
    min-width: 65%;
    margin-left: 2rem;
    margin-right: 2rem;
    // color: $color-primary;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    
    &__left-section,
    &__middle-section,
    &__right-section {
      margin-top: 2rem;
      margin-bottom: 2rem;
    }

    &__left-section {
      padding-left: 2rem;
      padding-right: 2rem;
    }

    &__right-section {
      margin-right: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
    }
  }

  #id_notes {
    
    height: 11rem;
  }
  .text-area-full {
    min-width: 100%;
    max-width: 100%;
  }
</style>
