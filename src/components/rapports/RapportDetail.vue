<template>
  <div class="panel detail">
    <div class="detail__header">
      <div class="buttons">
            <button class="btn" @click.prevent="onValidate">Validate</button>
            <button class="btn " @click.prevent="onRevert"><i class="fas fa-ban color-danger"></i></button>
            <button class="btn" @click.prevent="onSave"><i class="far fa-save color-success"></i></button>
          </div>
    </div>
    <form ref="form" class="detail__form" >
      <template v-if="selectedRapport">
        <!-- left section -->
        <section class="detail__form__left-section">
          <div class="form-group">
              <label class="form-label" for="id_rapport_type">Rapport</label>
            <select
                name="rapport-type"
                class="form-control select"
                id="id_rapport_type"
                :value="rapportType"
                @change="onInputChanged"
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
                @change="onInputChanged"
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
                :value="selectedRapport.audition_date"
                @change="onInputChanged"
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
                @change="onInputChanged"
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
        <section class="detail__form__middle-section">
          <div class="form-row">
            <!-- <div class="form-group"> -->
              <app-date-input
                labelTitle="Démarche"
                labelClass="form-label"
                inputDateClass="form-control"
                inputDateId="id_demarche_date"
                inputDateName="demarche-date"
                :inputDateValue="selectedRapport.demarche_date"
                inputTimeClass="form-control"
                inputTimeId="id_demarche_time"
                inputTimeName="demarche-date"
                required="true"
              ></app-date-input>
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
                    name="nocivique"
                    ref="noCivique"
                    :value="selectedRapport.no_civique"
                    @change="onInputChanged"
                    required
                    autocomplete="address-line1"
                >
              
                <input
                    class="address-line1__rue"
                    type="text"
                    placeholder="rue"
                    id="id_rue"
                    name="rue"
                    ref="rue"
                    :value="selectedRapport.rue"
                    @change="onInputChanged"
                    required
                    autocomplete="address-line1"
                >
              
                <input
                    class="address-line1__apt"
                    type="text"
                    placeholder="apt"
                    id="id_apt"
                    name="apt"
                    :value="selectedRapport.apt"
                    @change="onInputChanged"
                    autocomplete="address-line1"
                >
              </div>            
            </div>
          </div>
          <div v-if="invalidStreet" class="mg-sm-l">
            <p class="color-warning pd-sm-t">
              <i class="fas fa-exclamation-triangle txt-lg pd-sm-r"></i>
              <span class="txt-sm">
                Rue introuvable!
              </span>
            </p>
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
                  :value="selectedRapport.ville"
                  @change="onInputChanged"
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
                  :value="selectedRapport.km"
                  @change="onInputChanged"
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
                  :value="selectedRapport.secteur"
                  @change="onInputChanged"
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
                  :value="selectedRapport.notes"
                  @change="onInputChanged"
              ></textarea>
            </div>
          </div>
        </section> <!-- end middle section -->
        
        <!-- right section -->
        <section class="detail__form__right-section">
          
        </section> <!-- end right section -->
        
      </template>
      <div v-else>
        <p>Selectionner un rapport dans la liste</p>
      </div>
      
    </form>
    <div class="detail__footer">
      <h2>Footer</h2>
      <!-- <modal name="street-picker">
        <h3>Hello</h3>
        <ul class="list">
        <li v-for="rue in pickerRues" :key="rue.id" @click=onSelectStreet(rue)>{{rue.name}} - ({{rue.secteur}})</li>
      </ul>
      </modal> -->
      <street-picker 
        :rues=pickerRues 
        :pick=handlePickRue 
        :cancel=handleCancelPickRue
        title="Pick a rue"
      >
      </street-picker>
    </div>
  </div>
  
</template>

<script>
import {mapGetters} from 'vuex'
import moment from 'moment'
import helpers from './helpers'
import AppDateInput from '@/components/common/AppDateInput'
import StreetPicker from '@/components/common/StreetPicker'

const hasAuditionDate = (procType) => {
  // procedure types which needs an audtion date (ex subpoena)
  const typesWithAudition = [1, 2, 3, 10, 11, 12, 13, 14]
  return typesWithAudition.indexOf(procType) !== -1
}


export default {
  name: 'RapportDetail',
  components: {
    AppDateInput,
    StreetPicker
  },
  data() {
    return {
      invalidStreet: false,
      showAuditionDate: this.hasAuditionDate,
      isNewRecord: false,
      isDirty: false,
      beforeUpdateCalled: false,
      theRapport: null,
      showPicker: false,
      pickerRues: []
    }
  },
  
  beforeUpdate() {
    // console.log('beforeUpdate()')
    this.beforeUpdateCalled = true
    this.initState()
    this.showAuditionDate = hasAuditionDate(this.selectedRapport.procedure_type)
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
      this.isDirty = false
    },
    
    onNoCauseFocus(event) {
      // remove '-'
      const val = event.target.value
      event.target.value = helpers.unformatNoCause(val)
    },

    onNoCauseBlur(event) {
      event.target.value = helpers.formatNoCause(event.target.value)
    },

    onInputChanged(event) {
      const name = event.target.name
      console.log('name :', name)
      const value = event.target.value
      console.log('value :', value)

      const rapportTypes = this.$store.state.rapports.rapportTypes
      const procTypes = this.$store.state.rapports.procedureTypes

      switch (name) {

      case 'rapport-type':
        this.$store.commit('updateRapportType', rapportTypes.indexOf(value))
        break

      case 'proc-type':
        this.$store.commit('updateProcType', procTypes.indexOf(value))
        break

      case 'nocause':
        this.$store.commit('updateNoCause', helpers.formatNoCause(value))
        break

      // demarche date and time are updated in the AppDateInput component
      
      case 'nocivique':
        this.$store.commit('updateNoCivique', value)
        break

      case 'rue':
        this.handleRueChanged()
        break
      
      case 'apt':
        this.$store.commit('updateApt', value)
        break

      case 'ville':
        this.$store.commit('updateVille', value)
        break

      case 'km':
        this.$store.commit('updateKm', value)
        break

      case 'secteur':
        this.$store.commit('updateSecteur', value)
        break

      case 'notes':
        this.$store.commit('updateNotes', value)
        break
        
        
      default:
        console.log(`No input named ${name}`)
        break
      }
    },

    

    //-------------------------------------------------------------------------
    // Misc buttons handling
    //-------------------------------------------------------------------------

    onRevert() {  // cancel button
      this.$store.commit('revertFormChanges', this.selectedRapport)
    },

    onSave() {  // save button
      this.$store.commit('saveFormChanges', this.selectedRapport)
    },

    onValidate() { // validate button
      // test method to check validations
      const form = this.$refs.form
      // console.log('ref :', form)
      form.reportValidity()
    },



    //-------------------------------------------------------------------------
    // Demarche date/time handling
    //-------------------------------------------------------------------------

    updateDemarcheDate(event) {
      // the date part has changed (YYYY-MM-DD)
      // we need to keep the time value and update the date part of the state
      if (isNaN(Date.parse(event.target.value))) {
        alert('Date invalide')
        event.target.value = moment(this.selectedRapport.demarche_date).format('YYYY-MM-DD')
        return
      }

      let newDate = new Date(event.target.value)
      const demarcheDate = new Date(this.selectedRapport.demarche_date)
      newDate.setHours(demarcheDate.getHours())
      newDate.setMinutes(demarcheDate.getMinutes())
      newDate.setSeconds(demarcheDate.getSeconds())
      newDate.setMilliseconds(demarcheDate.getMilliseconds())
      // console.log('newDate :', newDate)
      this.$store.commit('updateDemarche', newDate)
    },

    updateDemarcheTime(event) {
      // the time part has changed (HH:mm)
      // we need to keep the date value and update the time part of the state
      const parts = event.target.value.split(':')
      if (parts == null || parts.length < 2) {
        alert('Heure invalide')
        event.target.value = moment(this.selectedRapport.demarche_date).format('HH:mm')
        return
      }

      const hours = parseInt(parts[0])
      const minutes = parseInt(parts[1])
      if (!(0 <= hours <= 24 && 0 <= minutes <= 60)) {
        alert('Heure invalide')
        event.target.value = moment(this.selectedRapport.demarche_date).format('HH:mm')
        return
      }
      let newDate = new Date(this.selectedRapport.demarche_date)
      newDate.setHours(hours)
      newDate.setMinutes(minutes)
      // console.log('newDate :', newDate)
      this.$store.commit('updateDemarche', newDate)
    },




    //-------------------------------------------------------------------------
    // StreetPicker handling
    //-------------------------------------------------------------------------
    loadRues(noCivique, rue) {
      const result = this.$store.getters.getRues(noCivique, rue)
      console.log('result :', result)
      return result
    },

    handleRueChanged() {
      this.invalidStreet = false
      const result = this.loadRues(this.$refs.noCivique.value, this.$refs.rue.value)
      if (result === undefined || result.length === 0) {
        this.invalidStreet = true
        this.$refs.rue.select()
        return
      }
      if (result.length === 1) {
        const rue = result[0]
        console.log('rue.name :', rue.name)
        this.$store.commit('updateRue', rue.name)
        this.$store.commit('updateKm', rue.km)
        this.$store.commit('updateSecteur', rue.secteur)
        // sometimes the UI doesn't update;
        // for example, if the selectedRecord.rue is 'Charlemagne' and
        // we searched using 'c' 
        if (this.$refs.rue !== rue.name) {
          console.log('force update')
          this.$forceUpdate()
          // Vue.set(this.selectedRapport, 'rue', rue.name)
        }
      } else {
        this.pickerRues = result
        this.$modal.show('street-picker')
      }
    },

    handlePickRue(rue) {
      this.pickerRues = []
      console.log('rue.name :', rue.name)
      this.$store.commit('updateRue', rue.name)
      this.$store.commit('updateVille', rue.ville)
      this.$store.commit('updateKm', rue.km)
      this.$store.commit('updateSecteur', rue.secteur)
      this.$refs.rue.select()

    },

    handleCancelPickRue() {
      this.showPicker = false
      this.pickerRues = []
      this.$refs.rue.select()
    },
  }
}
</script>


<style scoped lang="scss">
  @import "../../sass/abstracts/_variables";
  
  .detail {
    // min-width: 65%;
    margin-left: 2rem;
    margin-right: 2rem;
    // color: $color-primary;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    &__header {
      display: flex;
      justify-content: flex-end;
      margin-top: 1rem;
      margin-right: 1rem;
    }

    &__form {
      display: flex;
      justify-content: space-around;

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
    
    
  }

  #id_notes {
    
    height: 11rem;
  }
  .text-area-full {
    min-width: 100%;
    max-width: 100%;
  }
</style>
