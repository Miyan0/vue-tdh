// misc date utilities
import moment from 'moment'
import { DATE_FORMAT } from '@/app_constants'


//-----------------------------------------------------------------------------
// private functions
//-----------------------------------------------------------------------------

const findDateSeparator = dateStr => {
  
  let separator = '/'
  if (dateStr.indexOf(separator)) {
    return separator
  }
  separator = '-'
  if (dateStr.indexOf(separator)) {
    return separator
  }
  separator = '.'
  if (dateStr.indexOf(separator)) {
    return separator
  }
  separator = ' '
  if (dateStr.indexOf(separator)) {
    return separator
  }
  return null
}

const handleDateOneChar = dateStr => {
  // - 2 -> 2018-06-02

  const date = moment()
  if ('123456789'.indexOf(dateStr) === -1) {
    return date.format(DATE_FORMAT) // return the current date
  }

  date.date(dateStr)
  return date.format(DATE_FORMAT)
}


const handleDateTwoChars = dateStr => {
  // - 28 -> 2018-06-28
  // - 32 -> 2018-02-03

  const date = moment()
  const defaultDate = date.format(DATE_FORMAT)
  const dateInt = parseInt(dateStr)
  let day, month
  if (dateInt > 31) {
    // ex: 32 -> day == 3, month == 2 
    const parts = dateStr.split('')
    day = parts[0]
    month = String(parseInt(parts[1]) - 1) //f**cking months are 0 based!!!

    if ('123456789'.indexOf(day) === -1) {
      return defaultDate // return the current date
    }
    if ('123456789'.indexOf(month) === -1) {
      return defaultDate // return the current date
    }

    date.month(month)
    date.date(day)

  } else {
    if (dateStr === '00') {
      return defaultDate
    }
    date.date(dateStr)
  }
  
  return date.format(DATE_FORMAT)
}



const handleDateThreeChars = dateStr => {
  // - 282 -> 2018-02-28
  const date = moment()
  // const defaultDate = date.format(DATE_FORMAT)
  const parts = dateStr.split('')
  const day = parts[0] + parts[1]
  if (day === '00' || parts[1] === '0') {
    return date.format(DATE_FORMAT)
  }
  const month = `0${String(parseInt(parts[2]) - 1)}`
  if (day === month === '00') {
    return date.format(DATE_FORMAT)
  }
  date.month(month)
  date.date(day)
  return date.format(DATE_FORMAT)
}



const handleDateFourChars = dateStr => {
  // - 2802 -> 2018-02-28

  const date = moment()
  // const defaultDate = date.format(DATE_FORMAT)
  const parts = dateStr.split('')
  const day = parts[0] + parts[1]
  let month = parts[2] + parts[3]
  if (day === '00' || month === '00') {
    return date.format(DATE_FORMAT)
  }
  month = `0${String(parseInt(month) - 1)}`  
  date.month(month)
  date.date(day)
  return date.format(DATE_FORMAT)
}




const handleDateSixChars = dateStr => {
  // - 280201 -> 2001-02-28
  // note, this will always return years in 21th century
  // if you need to have a 20th century date, pass the full year (19051957)

  const date = moment()
  const parts = dateStr.split('')
  const day = parts[0] + parts[1]
  let month = parts[2] + parts[3]
  const year = parts[4] + parts[5]

  if (day === '00' || month === '00' || year === '00') {
    return date.format(DATE_FORMAT)
  }
  month = `0${String(parseInt(month) - 1)}`  
  date.year(`20${year}`)
  date.month(month)
  date.date(day)
  return date.format(DATE_FORMAT)
}


const handleDateEightChars = dateStr => {
  // - 28022001 -> 2001-022-28
  // note, this will always return years in 21th century

  const date = moment()
  const parts = dateStr.split('')
  const day = parts[0] + parts[1]
  let month = parts[2] + parts[3]
  const year = parts[4] + parts[5] + parts[6] + parts[7]

  if (day === '00' || month === '00' || year === '0000') {
    return date.format(DATE_FORMAT)
  }
  month = `0${String(parseInt(month) - 1)}`  
  date.year(year)
  date.month(month)
  date.date(day)
  return date.format(DATE_FORMAT)
}



const handleDateTenChars = dateStr => {
  // - 28-02-2018, 28.02.2018, 28/02/2018, 28 02 2018 -> 2018-02-28
  // - 2018-02-28 -> 2018-02-28
  let year, month, day
  const separator = findDateSeparator(dateStr)

  const date = moment()
  if (separator == null) {
    return date.format(DATE_FORMAT)
  }

  const parts = dateStr.split(separator)
  if (parts[0].length === 4) {
    // year first
    year = parts[0]
    day = parts[2]
  } else {
    year = parts[2]
    day = parts[0]
  }
  month = parts[1]


  if (day === '00' || month === '00' || year === '0000') {
    return date.format(DATE_FORMAT)
  }
  month = `0${String(parseInt(month) - 1)}`  
  date.year(year)
  date.month(month)
  date.date(day)
  return date.format(DATE_FORMAT)
}



//-----------------------------------------------------------------------------
// function: partialStrToDate
//-----------------------------------------------------------------------------
/**
 * Try to convert a date string to a valid date.
 * Returns the current date if it cannot handle the passed string.
 * 
 * Uses moment.js internally which handles overflow in dates,
 * so a date entered as 2018-06-31 will return 2018-07-01!! Also,
 * you can pass '-1' to get yesterday!
 * 
 * @param {String} dateStr
 * 
 * NOTE:  the string is parse in priority of day, month, year. So if the string is odd,
 *        the first char is the day, then it needs 2 chars for the month, and
 *        2 chars for the year. If it's even, the first 2 chars are the day.
 * 
 * NOTE:  It can handle string like '32' and parse '3' as day and '2' has month but it's
 *        not entirely relialable as passing '30' when the current month has 28 days
 *        will return the 2nd of the next month (because moment.js handles overflows)
 * 
 * NOTE:  
 * 
 * Examples if the current date is '2018-01-01'
 * - one or two char strings ('2' or '02') -> '2018-01-02'
 * - three char strings:
 *      ('282') -> '2018-02-28'
 *      ('022') -> '2018-02-02'
 */
export const partialStrToDate = dateStr => {
  const len = dateStr.length
  let result = moment().format(DATE_FORMAT)
  
  switch (len) {
  case 0:
    result = moment().format(DATE_FORMAT)
    break
  case 1:
    result = handleDateOneChar(dateStr)
    break
  case 2:
    result = handleDateTwoChars(dateStr)
    break
  case 3:
    result = handleDateThreeChars(dateStr)
    break

  case 4:
    result = handleDateFourChars(dateStr)
    break
  
  case 5:
  case 7:
  case 9:
    // we don't handle this case -> returning current date
    break

  case 6:
    result = handleDateSixChars(dateStr)
    break
  
  case 8:
    result = handleDateEightChars(dateStr)
    break

  case 10:
    result = handleDateTenChars(dateStr)
    break

  default:
    break
  }

  return result
}
