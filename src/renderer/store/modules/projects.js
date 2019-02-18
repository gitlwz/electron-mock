const state = {
    projects: {}
}

const mutations = {
    REFRESHPROJECT(state, projects) {
        state.projects = projects
    }
}

const actions = {
    refreshProject({ commit }, projects) {
        commit("REFRESHPROJECT", projects)
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
