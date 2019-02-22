const state = {
    httpprot: 0,
    websocketprot: 0
}

const mutations = {
    SET_HTTP_PROT(state, prot) {
        state.httpprot = prot;
    },
    SET_WEBSOCKET_PROT(state, prot) {
        state.websocketprot = prot;
    }
}

const actions = {
    refreshprot({ commit }, prot) {
        const { httpprot } = prot;
        commit("SET_HTTP_PROT", httpprot)
    },
    websocketprot({ commit }, prot) {
        const { websocketprot } = prot;
        commit("SET_WEBSOCKET_PROT", websocketprot)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
