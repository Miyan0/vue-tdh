export const validateFutureDate = (aDate) => {
  // validations:
  // date > today
  const today = new Date()
  if (aDate <= today) {
    return false
  }
  return true
}

export const validatePreviousDate = (aDate) => {
  // validations:
  // date <= today
  const today = new Date()
  if (aDate > today) {
    return false
  }
  return true
}