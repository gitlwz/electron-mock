import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)
console.log("&&&&&&&&&&&&&", modules)
export default new Vuex.Store({
    modules,
    plugins: [
        createPersistedState({
            blacklist: ["projects/REFRESHPROJECT"],
        }),
        createSharedMutations(),
        createLogger()
    ],
    strict: process.env.NODE_ENV !== 'production'
})
