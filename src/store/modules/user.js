import {login, loginOut} from '@/api/user'

const state = () => ({
  token: '', // 登录token
  info: {},  // 用户信息
})

// getters
const getters = {
  token(state) {
    return state.token
  }
}

// mutations
const mutations = {
  tokenChange(state, token) {
    state.token = token
  }
}

// actions
const actions = {
  // login
  login({commit}, params) {
    return new Promise((resolve, reject) => {
      login(params).then(res => {
        commit('tokenChange', res.data.token)
        resolve(res.data.token)
      }).catch(err => {
        reject(err)
      })
    })
  },
  // logout
  loginOut({commit}) {
    loginOut().then(res => {

    }).catch(error => {

    }).finally(() => {
      localStorage.removeItem('tabs')
      localStorage.removeItem('vuex')
      sessionStorage.removeItem('vuex')
      location.reload()
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  getters,
  mutations
}
