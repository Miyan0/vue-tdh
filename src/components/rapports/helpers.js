//-------------- VARIOUS UTILITY FUNCTIONS
import moment from 'moment'

const formatAddress = (rapport) => {
  let apt = ''
  if (rapport.apt) {
    apt = `# ${rapport.apt}`
  }
  return `${rapport.no_civique} ${rapport.rue} ${apt}`
}

const formatNoCause = (numero) => {

  if (numero.length !== 9) {
    return numero
  }
  
  return `${numero.slice(0,3)}-${numero.slice(3,6)}-${numero.slice(6)}`
}

const unformatNoCause = (numero) => {
  if (numero.indexOf('-')) {
    return numero.split('-').join('')
  }
  return numero
}

/**
 * Return a moment showing only the time part
 * @param {Date} aDate 
 */
const dateTime2Time = (aDate) => {
  return moment(aDate).format('HH:mm')
}


/**
 * Return a moment showing only the date part
 * @param {Date} aDate 
 */
const dateTime2Date = (aDate) => {
  return moment(aDate).format('YYYY-MM-DD')
}


/** 
 * Given 2 dates,
 * Sets the date, keeps the time part
 * @param {Date} aDate 
 * @param {Date} aTime 
 * 
 * ex: 
 *  aDate = 2018-05-19 11:45:02:0012
 *  aTime = 2017-09-30 09:52:12:0001
 * 
 *  -> 2017-09-30 11:45:02:0012
 */
const setDate2Time = (aDate, aTime) => {
  const target = moment(aTime)
  const source = moment(aDate)
  target.set('year', source.get('year'))
  target.set('month', source.get('month'))
  target.set('date', source.get('date'))
  return target
}


/** 
 * Given 2 dates,
 * Sets the time, keeps the date part
 * @param {Date} aDate 
 * @param {Date} aTime 
 * 
 * ex: 
 *  aDate = 2018-05-19 11:45:02:0012
 *  aTime = 2017-09-30 09:52:12:0001
 * 
 *  -> 2018-05-19 09:52:12:0001
 */
const setTime2Date = (aDate, aTime) => {
  const source = moment(aTime)
  const target = moment(aDate)
  target.set('hour', source.get('hour'))
  target.set('minute', source.get('minute'))
  target.set('second', source.get('second'))
  target.set('millisecond', source.get('millisecond'))
  return target
}



export default {
  formatAddress,
  formatNoCause,
  unformatNoCause,

  dateTime2Date,
  setTime2Date,
  
  dateTime2Time,
  setDate2Time,
}