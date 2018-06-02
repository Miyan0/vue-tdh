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
  <div v-if="dateInvalid" class="error">
    <p>La date n'est pas valide</p>
  </div>
</div>

</template>

<script>
import moment from 'moment'

// constants
const DATE_FORMAT = 'YYYY-MM-DD'
const TIME_FORMAT = 'HH:mm'

// module functions
const isValidDate = aDate => !isNaN(Date.parse(aDate))

// VueJs stuff
export default {
  data() {
    return {
      dateInvalid: false,
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
    required: String,
    callback: Function
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
      // let time = moment(this.currentDate)
      // console.log('typeof(time) :', typeof(time))
      // const parts = this.$refs.time_input.value.split(':')
      // console.log('parts :', parts)
      // time.hour(parts[0])
      // time.minutes(parts[1])
      // this.currentTime = time.format(TIME_FORMAT)
      const input = this.$refs.time_input
      input.select()
      this.currentTime = input.value
    },
    onDateInput(event) {
      const char = event.data
      console.log('event :', event)
      switch (char) {
      case 't':
        event.target.value = moment().format(DATE_FORMAT)
        this.currentDate = event.target.value
        break
      case '+':
        event.target.value = moment(this.currentDate).add(1, 'days').format(DATE_FORMAT)
        this.currentDate = event.target.value
        break
      case '-':
        event.target.value = moment(this.currentDate).subtract(1, 'days').format(DATE_FORMAT)
        this.currentDate = event.target.value
        break
      default:
        break
      }
      this.$refs.date_input.select()
      console.log('data :', event.data)
    },
    onDateChanged(event) {
      const value = event.target.value
      if (!isValidDate(value)) {
        this.dateInValid = true
      } else {
        console.log('event :', value)
        this.dateInValid = false
        const time = this.$refs.time_input.value
        console.log('time :', time)
        const newDate = this.buildDate(value, time)
        this.$store.commit('updateDemarche', newDate)
      }
    },
    onTimeInput(event) {
      const char = event.data
      console.log('char :', char)
      let currentDateTime
      switch (char) {
      case '+':
        currentDateTime = this.buildDate(this.currentDate, this.currentTime)
        event.target.value = moment(currentDateTime).add(1, 'minutes').format(TIME_FORMAT)
        this.currentTime = event.target.value
        break
      case '-':
        currentDateTime = this.buildDate(this.currentDate, this.currentTime)
        event.target.value = moment(currentDateTime).subtract(1, 'minutes').format(TIME_FORMAT)
        this.currentTime = event.target.value
        break
      default:
        break
      }
      this.$refs.time_input.select()
    },
    onTimeChanged(event) {
      console.log('event.target.value :', event.target.value)
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

