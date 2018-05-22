

const state = {
  rapports: [
    {
      id: 1,
      name: 'Rapport 1'
    },
    {
      id: 2,
      name: 'Rapport 2'
    },
    {
      id: 3,
      name: 'Rapport 3'
    },
    {
      id: 4,
      name: 'Rapport 4'
    }
  ],
  selectedRapport: null,
  nextId: 5
}

const getters = {
  selectedRapport: state => state.selectedRapport,
  allRapports: state => state.rapports
}

const actions = {
  selectRapport: ({commit}, rapport) => {
    console.log('rapport :', rapport)
    commit('setSelectedRapport', rapport)
  },
  addRapport: ({ commit, state }) => {
    const rapport = {
      id: state.nextId,
      name: `Rapport ${state.nextId}`
    }
    commit('addRapport', rapport)
    commit('incrementNextId')

  }
}

const mutations = {
  setSelectedRapport: (state, rapport) => {
    state.selectedRapport = rapport
  },
  addRapport: (state, rapport) => {
    state.rapports.push(rapport) // bad, use immutable way
  },
  incrementNextId: (state) => {
    state.nextId++
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
