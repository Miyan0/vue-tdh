export const mutations = {

  updateLots: (state, data) => {
    state.lots = [...data.results]
    state.nextPageLink = data.links.next
    state.prevPageLink = data.links.previous
    state.fetchedCount = data.count
    state.pageCount = data.total_pages
    state.nextPageNumber = data.next_page_number
    state.prevPageNumber = data.prev_page_number
    state.pageNumber = data.page_number
    state.selectedLot = null
  },

}
