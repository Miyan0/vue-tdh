import api from '../../api/django'
import qs from 'qs'
import Vue from 'vue'
import { RAPPORTS_URL } from './constants'
import { handleError } from './helpers'




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

const gotoPage = async (commit, rootState, pageType) => {
  let url = null
  switch (pageType) {
  case 'prev':
    url = rootState.rapports.prevPageLink
    break
  case 'next':
    url = rootState.rapports.nextPageLink
    break

  default:
    console.error('Parametre non supporté: ', pageType) // eslint-disable-line no-console
    break
  }
  if (url == null) {
    // can happen if pageType was, for example, 'prev' and we're at the first page
    return
  }
  const { token } = rootState.auth
  try {
    const { data } = await api.get(url, token)
    commit('updateRapports', data)
  } catch(error) {
    handleError(error, 'gotoPage')
  }
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

const getters = {
  selectedRapport: state => state.selectedRapport,
  allRapports: state => state.rapports,
  rapportCount: state => state.rapports.length,
  pageCount: state => state.pageCount,
  prevPageLink: state => state.prevPageLink,
  nextPageLink: state => state.nextPageLink,
  fetchedCount: state => state.fetchedCount,
  hasNext: state => !!state.nextPageLink,
  hasPrev: state => !!state.prevPageLink,
  prevPageNumber: state => state.prevPageNumber,
  nextPageNumber: state => state.nextPageNumber,
  pageNumber: state => state.pageNumber,
  procedureTypes: state => state.procedureTypes,
  rapportTypes: state => state.rapportTypes,
  procedureTypeStr: state => {
    if (state.selectedRapport) {
      return state.procedureTypes[state.selectedRapport.procedure_type]
    }
    return state.procedureTypes[0]
  },
  rapportTypeStr: state => {
    if (state.selectedRapport) {
      return state.rapportTypes[state.selectedRapport.rapport_type]
    }
    return state.rapportTypes[0]
  }
  
}

const actions = {
  selectRapport({commit}, rapport) {
    commit('setSelectedRapport', rapport)
  },
  addRapport({ commit, state }) {
    const rapport = {
      id: state.nextId,
      name: `Rapport ${state.nextId}`
    }
    commit('addRapport', rapport)
    commit('setSelectedRapport', rapport)
  },

  async fetchRapports ({commit, rootState}, params){
    let query = ''
    let url = RAPPORTS_URL
    if (params  !== null) {
      query = '?' + qs.stringify(params)
      // make sure url contains a backslash, safari needs it before query params
      url = `${url}${query}`
    }
    const { token } = rootState.profile
    try {
      const { data } = await api.get(url, token)
      commit('updateRapports', data)
    } catch(error) {
      handleError(error, 'fetchRapport')
    }
  },

  nextPage({commit, rootState}) {
    gotoPage(commit, rootState, 'next')  
  },

  prevPage({commit, rootState}) {
    gotoPage(commit, rootState, 'prev')  
  },
  
}

const mutations = {
  setSelectedRapport: (state, rapport) => {
    state.selectedRapport = JSON.parse(JSON.stringify(rapport))
  },
  addRapport: (state, rapport) => {
    state.rapports = { ...state.rapports, rapport} 
  },
  setFetchedCount: (state, count) => {
    state.fetchedCount = count
  },
  setPrevPageLink: (state, link) => {
    state.prevPageLink = link
  },
  setNextPageLink: (state, link) => {
    state.nextPageLink = link
  },
  // setRapports: (state, rapports) => {
  //   state.rapports = [...rapports]
  // },
  updateRapports: (state, data) => {
    state.rapports = [...data.results]
    state.nextPageLink = data.links.next
    state.prevPageLink = data.links.previous
    state.fetchedCount = data.count
    state.pageCount = data.total_pages
    state.nextPageNumber = data.next_page_number
    state.prevPageNumber = data.prev_page_number
    state.pageNumber = data.page_number
  },
  // updates for individual fields using a form
  // we only update the copy, the original will be updated
  // after validation.
  // TODO: validation
  
  updateProcType: (state, value) => {
    state.selectedRapport.procedure_type = value
  },

  updateRapportType: (state, value) => {
    state.selectedRapport.rapport_type = value
  },
  
  updateNoCause: (state, value) => {
    state.selectedRapport.no_cause = value
  },

  updateAudition: (state, value) => {
    state.selectedRapport.audition_date = value
  },

  updateDemarche: (state, value) => {
    state.selectedRapport.demarche_date = value
  },

  updateNoCivique: (state, value) => {
    state.selectedRapport.no_civique = value
  },

  updateRue: (state, value) => {
    state.selectedRapport.rue = value
  },

  updateApt: (state, value) => {
    state.selectedRapport.apt = value
  },

  updateVille: (state, value) => {
    state.selectedRapport.ville = value
  },

  updateKm: (state, value) => {
    state.selectedRapport.km = value
  },

  updateSecteur: (state, value) => {
    state.selectedRapport.secteur = value
  },

  updateNotes: (state, value) => {
    state.selectedRapport.notes = value
  },

  revertFormChanges: (state) => {
    // annule les changements dans le formulaire d'edition d'un rapport

    // get the rapport from the list (which has the unchanged values)
    const rapport = state.rapports.find(rapport => rapport.id === state.selectedRapport.id)
    // copy values from the list
    state.selectedRapport = JSON.parse(JSON.stringify(rapport))
  },

  saveFormChanges: (state) => {
    const item = state.rapports.find(rapport => rapport.id === state.selectedRapport.id)
    const index = state.rapports.indexOf(item)
    if (index < 0) {
      console.error('Impossible de trouver l\'element dans les rapports!!!') // eslint-disable-line no-console
    }
    Vue.set(state.rapports, index, JSON.parse(JSON.stringify(state.selectedRapport)))
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
