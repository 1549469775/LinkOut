import Vuex from 'vuex'
import Vue from "vue"
Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        showAlert: false
    },
    getters: {
        isAlert(state) {
            return state.showAlert;
        }
    },
    mutations: {
        setAlert(state, show) {
            state.showAlert = show;
        }
    },
    actions: {
        setAlert(context, isShow) {
            context.commit('setAlert', isShow);
        }
    }
});

export default store;