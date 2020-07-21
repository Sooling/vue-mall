import Vue from 'vue'
import Vuex from 'vuex'
import {mutations} from './mutations.js'
import {actions} from './actions.js'
import {getters} from './getters.js'

Vue.use(Vuex)
    //调用use方法，相当于内部调用install
const state = {
	cartList: []
}
export default new Vuex.Store({
    state,
    mutations,
    actions,
		getters,
    modules: {}
})