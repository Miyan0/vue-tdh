import api from '../../api/django'
import qs from 'qs'

const DOMAIN = 'http://localhost:8000'
const RAPPORTS_URL = `${DOMAIN}/api/rapports/`

const handleError = (error, methodName) => {
  //TODO: we should display an error page (500 or 404)
  const msg = `ERROR: ${methodName}`
  console.error(msg, error.response.status) // eslint-disable-line no-console
}

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
  console.log('url :', url)
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
  pageCount: 0
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
  },
  rapportCopy: state => {
    // deep copy
    return JSON.parse(JSON.stringify(state.selectedRapport))
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
    const { token } = rootState.auth
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
    state.selectedRapport = rapport
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
  }

}

export default {
  state,
  getters,
  actions,
  mutations
}
