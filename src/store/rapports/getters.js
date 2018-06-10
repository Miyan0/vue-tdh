// store/rapports/getters.js


export const getters = {
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
