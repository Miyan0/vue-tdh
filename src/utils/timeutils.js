// misc time utilities

//-----------------------------------------------------------------------------
// private functions
//-----------------------------------------------------------------------------

const _findTimeSeparator = timeStr => {
  
  if (timeStr.indexOf(':') !== -1) {
    return ':'
  }
  if (timeStr.indexOf('-') !== -1) {
    return '-'
  }
  if (timeStr.indexOf('.') !== -1) {
    return '.'
  }
  if (timeStr.indexOf(' ') !== -1) {
    return ' '
  }
  return null
}

export const _isValidLength = timeStr => {
  const len = timeStr.length
  // do we have a separator
  if (_findTimeSeparator(timeStr) == null) {
    return (3 <= len && len <= 4)  // js doesn't support 3 <= len <= 4
  }
  return (4 <= len && len <= 5)
}

export const _isValidHour = hourStr => {
  const hour = parseInt(hourStr)
  return (0 <= hour && hour <= 24)
}

export const _isValidMinutes = minutesStr => {
  const minutes = parseInt(minutesStr)
  return (0 <= minutes && minutes <= 59)
}

export const _getHour = timeStr => {
  const len = timeStr.length
  const separator = _findTimeSeparator(timeStr)
  let parts = null
  let result = null

  if (separator == null) {
    // no separator
    parts = timeStr.split('')
    result = len === 3 ? `0${parts[0]}` : parts[0] + parts[1]
  } else {
    parts = timeStr.split(separator)
    result = parts[0].length === 1 ? `0${parts[0]}` :parts[0] 
  }
  
  return _isValidHour(result) ? result : '00'
}

export const _getMinutes = timeStr => {
  const len = timeStr.length
  const separator = _findTimeSeparator(timeStr)
  let parts = null
  let result = null

  if (separator == null) {
    // no separator
    parts = timeStr.split('')
    result = len === 3 ? parts[1] + parts[2] : parts[2] + parts[3]
  } else {
    parts = timeStr.split(separator)
    result = parts[1].length === 1 ? `0${parts[1]}` : parts[1] 
  }
  return _isValidMinutes(result) ? result : '00'
}


export const partialStrToTime = timeStr => {
  if ( !_isValidLength(timeStr) ) {
    return '00:00'
  }
  
  return `${_getHour(timeStr)}:${_getMinutes(timeStr)}`

}