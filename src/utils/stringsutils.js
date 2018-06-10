// utils/stringsutils.js

/**
   * Convert a string to lowercase and remove accents
   * @param theStr
   * @returns {string}
   */
export const accentFold = theStr => {
  // noinspection NonAsciiCharacters
  const accentMap = {
    'á': 'a',
    'à': 'a',
    'â': 'a',
    'é': 'e',
    'è': 'e',
    'ê': 'e',
    'î': 'i',
    'ô': 'o',
    'û': 'u'
  }
  if (!theStr) {
    return ''
  }
  let s = theStr.toLowerCase()
  let result = ''
  
  for (let i = 0; i < s.length; i++) {
    result += accentMap[s.charAt(i)] || s.charAt(i)
  }
  return result
}
