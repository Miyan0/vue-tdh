import { partialStrToDate } from '@/utils/dateutils'
import { DATE_FORMAT } from '@/app_constants'
import moment from 'moment'

const CURRENT_DATE_FORMATTED = moment().format(DATE_FORMAT)
const CURRENT_DATE = moment()
const CURRENT_YEAR = CURRENT_DATE.year()

const currentMonth = () => {
  let month = CURRENT_DATE.month() + 1 // month are 0 based
  if (month < 10) {
    return `0${month}`
  }
  return `${month}`
}


//-----------------------------------------------------------------------------
// testing: empty string
//-----------------------------------------------------------------------------
describe('date string conversions (empty string)', () => {

  it('handle empty strings', () => {
    const dateStr = ''
    expect(partialStrToDate(dateStr)).toBe(CURRENT_DATE_FORMATTED)
  })
})



//-----------------------------------------------------------------------------
// testing: one char
//-----------------------------------------------------------------------------
describe('date string conversions (one char passed)', () => {

  it('handle one char strings', () => {
    const dateStr = '9'
    const result = `${CURRENT_YEAR}-${currentMonth()}-0${dateStr}`
    expect(partialStrToDate(dateStr)).toBe(result)
  }),
  it('return the current date if passed char other than 1-9 ', () => {
    const dateStr = '0'
    expect(partialStrToDate(dateStr)).toBe(CURRENT_DATE_FORMATTED)
  })
})



//-----------------------------------------------------------------------------
// testing: two chars
//-----------------------------------------------------------------------------
describe('date string conversions (two chars passed)', () => {

  it('handle day only strings', () => {
    const dateStr = '01'
    const result = `${CURRENT_YEAR}-${currentMonth()}-${dateStr}`
    expect(partialStrToDate(dateStr)).toBe(result)
  }),
  it('handle day/month strings', () => {
    const dateStr = '32'
    const result = `${CURRENT_YEAR}-02-03`
    expect(partialStrToDate(dateStr)).toBe(result)
  }),
  it('return the current date if passed char other than 1-9 ', () => {
    const dateStr = '00'
    expect(partialStrToDate(dateStr)).toBe(CURRENT_DATE_FORMATTED)
  })
})



//-----------------------------------------------------------------------------
// testing: three chars
//-----------------------------------------------------------------------------
describe('date string conversions (3 chars)', () => {

  it('handle 3 chars', () => {
    const dateStr = '123'
    const result = `${CURRENT_YEAR}-03-12`
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 3 chars', () => {
    const dateStr = '313'
    const result = `${CURRENT_YEAR}-03-31`
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 3 chars', () => {
    const dateStr = '011'
    const result = `${CURRENT_YEAR}-01-01`
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 3 chars', () => {
    const dateStr = '282'
    const result = `${CURRENT_YEAR}-02-28`
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 3 chars', () => {
    const dateStr = '000'
    const result = CURRENT_DATE_FORMATTED
    expect(partialStrToDate(dateStr)).toEqual(result)
  })

})



//-----------------------------------------------------------------------------
// testing: four chars
//-----------------------------------------------------------------------------
describe('date string conversions (4 chars)', () => {

  it('handle 4 chars', () => {
    const dateStr = '3112'
    const result = `${CURRENT_YEAR}-12-31`
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 4 chars', () => {
    const dateStr = '0101'
    const result = `${CURRENT_YEAR}-01-01`
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 4 chars', () => {
    const dateStr = '1001'
    const result = `${CURRENT_YEAR}-01-10`
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle "0000" chars', () => {
    const dateStr = '0000'
    const result = CURRENT_DATE_FORMATTED
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle bad dates', () => {
    const dateStr = '5555' // moment will overflow and return a valid date (in the future)
    expect(partialStrToDate(dateStr)).toEqual(expect.stringContaining('-'))
  })

})



//-----------------------------------------------------------------------------
// testing: five chars
//-----------------------------------------------------------------------------
describe('date string conversions (5 chars)', () => {
  // we don't handle this case, we always return the current date
  it('handle 5 chars', () => {
    const dateStr = '99999'
    const result = CURRENT_DATE_FORMATTED
    expect(partialStrToDate(dateStr)).toEqual(result)
  })
})



//-----------------------------------------------------------------------------
// testing: six chars
//-----------------------------------------------------------------------------
describe('date string conversions (6 chars)', () => {

  it('handle 6 chars', () => {
    const dateStr = '311217'
    const result = '2017-12-31'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 6 chars', () => {
    const dateStr = '010116'
    const result = '2016-01-01'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 6 chars', () => {
    const dateStr = '100101'
    const result = '2001-01-10'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle "0000" chars', () => {
    const dateStr = '000000'
    const result = CURRENT_DATE_FORMATTED
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle bad dates', () => {
    const dateStr = '555555' // moment will overflow and return a valid date (in the future)
    expect(partialStrToDate(dateStr)).toEqual(expect.stringContaining('-'))
  })

})



//-----------------------------------------------------------------------------
// testing: seven chars
//-----------------------------------------------------------------------------
describe('date string conversions (7 chars)', () => {
  // we don't handle this case, we always return the current date
  it('handle 7 chars', () => {
    const dateStr = '9999999'
    const result = CURRENT_DATE_FORMATTED
    expect(partialStrToDate(dateStr)).toEqual(result)
  })
})



//-----------------------------------------------------------------------------
// testing: eight chars
//-----------------------------------------------------------------------------
describe('date string conversions (8 chars)', () => {

  it('handle 8 chars', () => {
    const dateStr = '31122017'
    const result = '2017-12-31'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 8 chars', () => {
    const dateStr = '01012016'
    const result = '2016-01-01'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle 8 chars', () => {
    const dateStr = '10011901'
    const result = '1901-01-10'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle "0000" chars', () => {
    const dateStr = '000000'
    const result = CURRENT_DATE_FORMATTED
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle bad dates', () => {
    const dateStr = '555555' // moment will overflow and return a valid date (in the future)
    expect(partialStrToDate(dateStr)).toEqual(expect.stringContaining('-'))
  })

})



//-----------------------------------------------------------------------------
// testing: nine chars
//-----------------------------------------------------------------------------
describe('date string conversions (9 chars)', () => {
  // we don't handle this case, we always return the current date
  it('handle 9 chars', () => {
    const dateStr = '999999999'
    const result = CURRENT_DATE_FORMATTED
    expect(partialStrToDate(dateStr)).toEqual(result)
  })
})



//-----------------------------------------------------------------------------
// testing: ten chars
//-----------------------------------------------------------------------------
describe('date string conversions (10 chars)', () => {

  it('handle space separator', () => {
    const dateStr = '28 02 2018'
    const result = '2018-02-28'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle "-" separator', () => {
    const dateStr = '28-02-2018'
    const result = '2018-02-28'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle "/" separator', () => {
    const dateStr = '28/02/2018'
    const result = '2018-02-28'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle "." separator', () => {
    const dateStr = '28.02.2018'
    const result = '2018-02-28'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle bad separator', () => {
    const dateStr = '28*02*2018'
    const result = CURRENT_DATE_FORMATTED
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle bad dates', () => {
    const dateStr = '55.55.5555' // moment will overflow and return a valid date (in the future)
    expect(partialStrToDate(dateStr)).toEqual(expect.stringContaining('-'))
  }),

  // year first
  it('handle space separator', () => {
    const dateStr = '2018 02 28'
    const result = '2018-02-28'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle "-" separator', () => {
    const dateStr = '2018-02-28'
    const result = '2018-02-28'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle "/" separator', () => {
    const dateStr = '2018/02/28'
    const result = '2018-02-28'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle "." separator', () => {
    const dateStr = '2018.02.28'
    const result = '2018-02-28'
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle bad separator', () => {
    const dateStr = '2018*02*28'
    const result = CURRENT_DATE_FORMATTED
    expect(partialStrToDate(dateStr)).toEqual(result)
  }),
  it('handle bad dates', () => {
    const dateStr = '5555.55.55' // moment will overflow and return a valid date (in the future)
    expect(partialStrToDate(dateStr)).toEqual(expect.stringContaining('-'))
  })

})
