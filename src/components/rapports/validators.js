export const validateAudition = (audition) => {
  // validations:
  // date > today
  // data < today + 11 mois
  const today = new Date()
  if (audition <= today) {
    return false
  }
  return true
}