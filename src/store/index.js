import Vuex from 'vuex'
import Vue from "vue"
Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        alert: {
            namespaced: true,
            state: {
                isShow: false,
                option: {
                    type: "text",
                    message: "未知领域",
                    autoClose: true
                }
            },
            getters: {
                isShow(state) {
                    return state.isShow;
                },
            },
            mutations: {
                setShow(state, show) {
                    state.isShow = show;
                },
                setOption(state, option) {
                    state.option = {
                        ...option
                    };
                },
                setMessage(state, text) {
                    state.option.message = text;
                },
            },
            actions: {
                setOption(context, option) {
                    context.commit('setOption', option);
                },
                show(context, text) {
                    context.commit('setShow', true);
                    context.commit('setMessage', text);
                },
                hide(context) {
                    context.commit('setShow', false);
                    context.commit('setMessage', "");
                }
            }
        }
    }
});

export default store;