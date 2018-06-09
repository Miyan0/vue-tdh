<template>
<div class="form-group" >
  <label class="labelClass" for="inputId">{{ labelTitle }}</label>
  <div class="date-time-control">
    <input
      class="date-part"
      ref='date_input'
      :class="inputDateClass"
      type="text"
      placeholder="date (YYYY-MM-DD)"
      :id="inputDateId"
      :name="inputDateName"
      :value="dateStr"
      @change="onDateChanged"
      @focus="onDateFocus"
      @input="onDateInput"
      :required="required==='true'"
      data-value-missing="Ce champs est obligatoire"
    >
    <input
      class="time-part"
      ref='time_input'
      :class="inputTimeClass" 
      type="text"
      placeholder="time (HH:mm)"
      :id="inputTimeId"
      :name="inputTimeName"
      :value="timeStr"
      @change="onTimeChanged"
      @focus="onTimeFocus"
      @input="onTimeInput"
      :required="required==='true'"
      data-value-missing="Ce champs est obligatoire"
  >
  </div>
  <div v-if="dateInvalid">
    <p>La date n'est pas valide</p>
  </div>
  <div v-if="futureDate" class="mg-sm-l">
    <p class="color-warning pd-sm-t">
      <i class="fas fa-exclamation-triangle txt-lg pd-sm-r"></i>
      <span class="txt-sm">
        Démarche future ?
      </span>
    </p>
  </div>
</div>

</template>

<script>
import moment from 'moment'
import { partialStrToDate, isFutureDate, isValidDate } from '@/utils/dateutils'
import { partialStrToTime } from '@/utils/timeutils'

// constants
import { DATE_FORMAT, TIME_FORMAT } from '@/app_constants'

// module functions



// VueJs stuff
export default {
  data() {
    return {
      dateInvalid: false,
      futureDate: false,
      currentDate: null,
      currentTime: null
    }
  },
  computed: {
    dateStr() {
      return moment(this.inputDateValue).format(DATE_FORMAT)
    },
    timeStr() {
      return moment(this.inputDateValue).format(TIME_FORMAT)
    },
  },

  props: {
    labelTitle: String,
    labelClass: String,
    inputDateClass: String,
    inputDateValue: String,
    inputDateId: String,
    inputDateName: String,
    inputTimeClass: String,
    inputTimeId: String,
    inputTimeName: String,
    required: String
  },
  methods: {
    buildDate(datePart, timePart) {
      let date = moment(datePart)
      let time = timePart.split(':')
      date.hour(time[0])
      date.minutes(time[1])
      return date.format('YYYY-MM-DDTHH:mm:ssZ')
    },
    onDateFocus() {
      // this.currentDate = moment(this.currentDate).format(DATE_FORMAT)
      const input = this.$refs.date_input
      input.select()
      this.currentDate = input.value
    },

    onTimeFocus() {
      const input = this.$refs.time_input
      input.select()
      this.currentTime = input.value
    },
    onDateInput(event) {
      // we do not modify the selectedRapport here, it'll be done in the 'change' event.
      const char = event.data
      // console.log('event :', event)
      switch (char) {
      case 't':
        event.target.value = moment().format(DATE_FORMAT)
        this.currentDate = event.target.value
        this.$refs.date_input.select()
        break

      case '+':
        event.target.value = moment(this.currentDate).add(1, 'days').format(DATE_FORMAT)
        this.currentDate = event.target.value
        this.$refs.date_input.select()
        break

      case '-':
        event.target.value = moment(this.currentDate).subtract(1, 'days').format(DATE_FORMAT)
        this.currentDate = event.target.value
        this.$refs.date_input.select()
        break

      default:
        // all other chars are passed through
        break
      }
      
    },
    onDateChanged(event) {
      this.futureDate = false
      const value = partialStrToDate(event.target.value)
      event.target.value = value
      // console.log('value :', value)

      if (!isValidDate(value)) {
        this.dateInValid = true
      } else {
        this.dateInValid = false

        const time = this.$refs.time_input.value
        const newDate = this.buildDate(value, time)
        this.$store.commit('updateDemarche', newDate)
        this.futureDate = isFutureDate(newDate)
      }
    },
    onTimeInput(event) {
      // handle + and - chars
      const char = event.data
      let currentDateTime
      switch (char) {
      case '+':
        currentDateTime = this.buildDate(this.currentDate, this.currentTime)
        event.target.value = moment(currentDateTime).add(1, 'minutes').format(TIME_FORMAT)
        this.currentTime = event.target.value
        this.$refs.time_input.select()
        break
      case '-':
        currentDateTime = this.buildDate(this.currentDate, this.currentTime)
        event.target.value = moment(currentDateTime).subtract(1, 'minutes').format(TIME_FORMAT)
        this.currentTime = event.target.value
        this.$refs.time_input.select()
        break
      default:
        break
      }
      
    },
    onTimeChanged(event) {
      // parse and format time value as HH:mm
      const time = partialStrToTime(event.target.value)
      event.target.value = time

      const date = this.$refs.date_input.value
      const newDate = this.buildDate(date, time)
      this.$store.commit('updateDemarche', newDate)
    }
  }
}
</script>

<style lang="scss" scoped>
  .date-time-control {
    display: flex;
    justify-content: flex-start;

  }

  .date-part {
    width: 10rem;
  }

  .time-part {
    width: 7rem;
  }

</style>

