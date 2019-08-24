import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)

export const store = new vuex.Store({
  state: {
    token: window.sessionStorage.getItem('token') || null,
    userData: JSON.parse(window.sessionStorage.getItem('userData')) || null
  },
  getters: {
    token: state => {
      state.token = window.sessionStorage.getItem('token') || null
      return state.token
    },
    userData: state => {
      state.userData = JSON.parse(window.sessionStorage.getItem('userData')) || null
      return state.userData
    }
  },
  mutations: {
    updateToken: (state, payload) => {
      window.sessionStorage.setItem('token', payload)
      state.token = window.sessionStorage.getItem('token')
    },
    updateUserData: (state, payload) => {
      window.sessionStorage.setItem('userData', JSON.stringify(payload))
      state.userData = JSON.parse(window.sessionStorage.getItem('userData'))
    }
  },
  actions: {
    updateToken: ({ commit }, payload) => {
      commit('updateToken', payload)
    },
    updateUserData: ({ commit }, payload) => {
      commit('updateUserData', payload)
    }
  }
})
