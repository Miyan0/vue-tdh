// store/rapports/index.js
import { getters } from './getters'
import { actions } from './actions'
import { mutations } from './mutations'




const buildProcedureTypes = () => {
  return [
    'Inconnu',
    'Avis d\'instruction',
    'Avis d\'audition',
    'Avis de présentation',
    'Avis aux parents',
    'Constat',
    'Saisie-arrêt',
    'SPI',
    'BAM',
    'Sign. Affaires',
    'Subpoena',
    'Acte d\'assignation',
    'Mandat Perquisition',
    'Avis de convocation',
    'Avis d\'exécution',
  ]
}

const buildRapportTypes = () => {
  return ['Inconnu', 'Démarche']
}



const state = {
  procedureTypes: buildProcedureTypes(),
  rapportTypes: buildRapportTypes(),
  rapports: [],
  selectedRapport: null,
  prevPageLink: null,
  prevPageNumber: null,
  nextPageLink: null,
  nextPageNumber: null,
  pageNumber: 0,
  fetchedCount: 0,
  pageCount: 0,
}

export default {
  state,
  getters,
  actions,
  mutations
}
