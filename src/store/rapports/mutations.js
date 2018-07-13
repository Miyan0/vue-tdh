// store/rapports/mutations.js
import Vue from 'vue'

export const mutations = {
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
    console.log('Updating rapports ( mutation )')
    state.rapports = [...data.results]
    state.nextPageLink = data.links.next
    state.prevPageLink = data.links.previous
    state.fetchedCount = data.count
    state.pageCount = data.total_pages
    state.nextPageNumber = data.next_page_number
    state.prevPageNumber = data.prev_page_number
    state.pageNumber = data.page_number
    state.selectedRapport = null
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
