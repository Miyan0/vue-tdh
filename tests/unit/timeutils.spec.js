import { 
  partialStrToTime,
  _isValidLength,
  _isValidHour,
  _isValidMinutes,
  _getHour,
  _getMinutes
} from '@/utils/timeutils'

//-----------------------------------------------------------------------------
// testing: isValidLength
//-----------------------------------------------------------------------------
describe('time string valid length', () => {
  it('does not allow empty strings', () => {
    const timeStr = ''
    expect(_isValidLength(timeStr)).toBeFalsy()
  })

  it('does not allow 1 chars', () => {
    const timeStr = '0'
    expect(_isValidLength(timeStr)).toBeFalsy()
  })
  
  it('does not allow 2 chars', () => {
    const timeStr = '00'
    expect(_isValidLength(timeStr)).toBeFalsy()
  })

  it('allow 3 chars', () => {
    const timeStr = '012'
    expect(_isValidLength(timeStr)).toBeTruthy()
  })

  it('does not allow 3 chars with separator', () => {
    const timeStr = '0:2'
    expect(_isValidLength(timeStr)).toBeFalsy()
  })

  it('allow 4 chars', () => {
    const timeStr = '0212'
    expect(_isValidLength(timeStr)).toBeTruthy()
  })
  
  it('does allow 4 chars with separator', () => {
    const timeStr = '02:2'
    expect(_isValidLength(timeStr)).toBeTruthy()
  })

  it('allow 5 chars with separator', () => {
    const timeStr = '02:12'
    expect(_isValidLength(timeStr)).toBeTruthy()
  })

  it('does not allow 5 chars without separator', () => {
    const timeStr = '12345'
    expect(_isValidLength(timeStr)).toBeFalsy()
  })

})

//-----------------------------------------------------------------------------
// testing: isValidHour
//-----------------------------------------------------------------------------
describe('time string valid hour', () => {

  it('does not allow empty strings', () => {
    const timeStr = ''
    expect(_isValidHour(timeStr)).toBeFalsy()
  })

  it('allow numbers between 0 and 24', () => {
    const timeStr = '0'
    expect(_isValidHour(timeStr)).toBeTruthy()
  })

  it('allow numbers between 0 and 24', () => {
    const timeStr = '24'
    expect(_isValidHour(timeStr)).toBeTruthy()
  })

  it('allow numbers between 0 and 24', () => {
    const timeStr = '12'
    expect(_isValidHour(timeStr)).toBeTruthy()
  })

  it('does not allow negative numbers', () => {
    const timeStr = '-1'
    expect(_isValidHour(timeStr)).toBeFalsy()
  })

  it('does not allow numbers greater than 24', () => {
    const timeStr = '555'
    expect(_isValidHour(timeStr)).toBeFalsy()
  })

})



//-----------------------------------------------------------------------------
// testing: isValidMinutes
//-----------------------------------------------------------------------------
describe('time string get hour', () => {

  it('does not allow empty strings', () => {
    const timeStr = ''
    expect(_isValidMinutes(timeStr)).toBeFalsy()
  })

  it('allow numbers between 0 and 59', () => {
    const timeStr = '0'
    expect(_isValidMinutes(timeStr)).toBeTruthy()
  })

  it('allow numbers between 0 and 24', () => {
    const timeStr = '59'
    expect(_isValidMinutes(timeStr)).toBeTruthy()
  })

  it('allow numbers between 0 and 59', () => {
    const timeStr = '20'
    expect(_isValidMinutes(timeStr)).toBeTruthy()
  })

  it('does not allow negative numbers', () => {
    const timeStr = '-1'
    expect(_isValidMinutes(timeStr)).toBeFalsy()
  })

  it('does not allow numbers greater than 59', () => {
    const timeStr = '60'
    expect(_isValidMinutes(timeStr)).toBeFalsy()
  })

})



//-----------------------------------------------------------------------------
// testing: getHour
//-----------------------------------------------------------------------------
describe('time string valid hour', () => {

  it('handles 3 chars strings', () => {
    const timeStr = '912'
    expect(_getHour(timeStr)).toEqual('09')
  })

  it('handles 3 chars strings with separator', () => {
    const timeStr = '9:2'
    expect(_getHour(timeStr)).toEqual('09')
  })
  
  it('handles 4 chars strings', () => {
    const timeStr = '0912'
    expect(_getHour(timeStr)).toEqual('09')
  })

  it('handles 4 chars strings with separator', () => {
    const timeStr = '09:2'
    expect(_getHour(timeStr)).toEqual('09')
  })

  it('handles 5 chars strings with separator', () => {
    const timeStr = '09:20'
    expect(_getHour(timeStr)).toEqual('09')
  })

  it('return "00" with 6 chars strings with separator', () => {
    const timeStr = '092:20'
    expect(_getHour(timeStr)).toEqual('00')
  })

})


//-----------------------------------------------------------------------------
// testing: getMinutes
//-----------------------------------------------------------------------------
describe('time string valid hour', () => {

  it('handles 3 chars strings', () => {
    const timeStr = '912'
    expect(_getMinutes(timeStr)).toEqual('12')
  })

  it('handles 3 chars strings with separator', () => {
    const timeStr = '9:2'
    expect(_getMinutes(timeStr)).toEqual('02')
  })
  
  it('handles 4 chars strings', () => {
    const timeStr = '0912'
    expect(_getMinutes(timeStr)).toEqual('12')
  })

  it('handles 4 chars strings with separator', () => {
    const timeStr = '09:2'
    expect(_getMinutes(timeStr)).toEqual('02')
  })

  it('handles 5 chars strings with separator', () => {
    const timeStr = '09:20'
    expect(_getMinutes(timeStr)).toEqual('20')
  })

  it('return "00" with 6 chars strings with separator', () => {
    const timeStr = '92:220'
    expect(_getMinutes(timeStr)).toEqual('00')
  })

})

//-----------------------------------------------------------------------------
// testing: partialStrToTime
//-----------------------------------------------------------------------------
describe('time string valid hour', () => {

  it('handles 3 chars strings', () => {
    const timeStr = '912'
    expect(partialStrToTime(timeStr)).toEqual('09:12')
  })

  it('returns "00:00" with 3 chars strings and separator', () => {
    const timeStr = '9:2'
    expect(partialStrToTime(timeStr)).toEqual('00:00')
  })
  
  it('handles 4 chars strings', () => {
    const timeStr = '0912'
    expect(partialStrToTime(timeStr)).toEqual('09:12')
  })

  it('handles 4 chars strings with ":" separator', () => {
    const timeStr = '09:2'
    expect(partialStrToTime(timeStr)).toEqual('09:02')
  })

  it('handles 5 chars strings with separator', () => {
    const timeStr = '09:20'
    expect(partialStrToTime(timeStr)).toEqual('09:20')
  })

  it('handles "." separator', () => {
    const timeStr = '09.20'
    expect(partialStrToTime(timeStr)).toEqual('09:20')
  })

  it('handles space separator', () => {
    const timeStr = '09 20'
    expect(partialStrToTime(timeStr)).toEqual('09:20')
  })

  it('return "00:00" with 6 chars strings with separator', () => {
    const timeStr = '92:220'
    expect(partialStrToTime(timeStr)).toEqual('00:00')
  })

  it('return "00:00" with bad string', () => {
    const timeStr = 'back'
    expect(partialStrToTime(timeStr)).toEqual('00:00')
  })

})