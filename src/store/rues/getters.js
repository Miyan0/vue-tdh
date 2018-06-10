// store/rues/getters.js
import { accentFold } from '@/utils/stringsutils'

export const getters = {
  getRues: (state ) => (noCivique, name) =>{
    const no = parseInt(noCivique) // keep only digits
    console.log('no :', no)
    console.log('rue :', name )
    const pair = (no % 2) === 0

    return state.rues.filter( rue => {
      // console.log('accentFold(name) :', accentFold(name))
      if (rue.foldedName.startsWith(accentFold(name)) && no >= rue.no_civique_debut && no <= rue.no_civique_fin) {
        // check parity for the candidate found
        if (rue.cotederue === 0) {
          return rue
        }
        if (rue.cotederue === 2 && pair) {
          return rue
        }
        if (rue.cotederue === 1 && !pair) {
          return rue
        }
      }
    })
  }
}
