import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

let defaultCity = '揭阳'

try {
  if (localStorage.city) {
    defaultCity = localStorage.city
  }
} catch (e) {
  console.log(e)
}

export default new Vuex.Store({
  state: {
    city: localStorage.city || defaultCity
  },
  actions: {
    changeCity: function (ctx, city) {
      ctx.commit('changeNewCity',city)
    }
  },
  mutations: {
    changeNewCity: function (state, city) {
      state.city = city
      localStorage.city = city
    }
  }
})

