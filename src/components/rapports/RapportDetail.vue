<template>
  <form class="detail">
    <template v-if="selectedRapport">
      <!-- left section -->
      <section class="detail__left-section">
        <div class="form-group">
            <label class="form-label" for="id_rapport_type">Procédure</label>
          <select
              name="proc-type"
              class="form-control select"
              id="id_rapport_type"
              :value="rapportTypes[rapportCopy.rapport_type]"
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
              :value="procedureTypes[rapportCopy.procedure_type]"
          >
            <option v-for="(option, index) in procedureTypes" :value="option" :key="index">
              {{ option }}
            </option>
          </select>
          
        </div>
        <div class="form-group">
          <label class="form-label" for="id_nocause">#</label>
          <input
              class="form-control"
              type="text"
              placeholder="no cause"
              id="id_nocause"
              name="nocause"
              v-model="rapportCopy.no_cause"
              required
          >
        </div>
        <div class="form-group">
          <label class="form-label" for="id_audition">Audition</label>
          <input
              class="form-control"
              type="date"
              placeholder="Audition"
              id="id_audition"
              name="audtion"
              v-model="rapportCopy.audition_date"
              required
          >
        </div>
        <div class="form-group">
          <label class="form-label" for="id_lot">Lot</label>
          <input class="form-control" type="text" placeholder="secteur" id="id_lot" name="no_lot"
                 v-model="rapportCopy.no_lot" required>
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


export default {
  name: 'RapportDetail',
  data() {
    return {
      demarcheDate: null,
      demarcheTime: null
    }
  },
  
  beforeUpdate() {
    console.log('updated Called')
    this.demarcheDate = moment(this.selectedRapport.demarche_date).format('YYYY-MM-DD')
    this.demarcheTime = moment(this.selectedRapport.demarche_date).format('HH:mm')
  },
  computed: {
    ...mapGetters([
      'selectedRapport',
      'procedureTypes',
      'rapportTypes',
      'rapportTypeStr',
      'procedureTypeStr',
      'rapportCopy'
    ]),
  },
  methods: {}
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
