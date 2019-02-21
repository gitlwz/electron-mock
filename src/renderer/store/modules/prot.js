const state = {
    httpprot: 0
}

const mutations = {
    SET_HTTP_PROT(state, prot) {
        state.httpprot = prot;
    }
}

const actions = {
    refreshprot({ commit }, prot) {
        const { httpprot } = prot;
        commit("SET_HTTP_PROT", httpprot)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
