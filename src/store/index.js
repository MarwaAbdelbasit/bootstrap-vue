import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobs: [],
    displayJobs: [],
    rows: 0,
  },
  mutations: {
    setJobs: (state, jobs) => {
      state.jobs = jobs
    },
    setDisplayJobs: (state, displayJobs) => {
      state.displayJobs = displayJobs
    },
    setRows: (state, rows) => {
      state.rows = rows
    }
  },
  getters: {
    getJobs: (state) => {
      return state.jobs
    },
    getDisplayJobs: (state) => {
      return state.displayJobs
    },
    getRows: (state) => {
      return state.rows
    }
  },
  actions: {
    fetchData: () => {
      return new Promise(resolve => {
        setTimeout(async () => {
          const res = await fetch("jobs.json")
          const val = await res.json()
          resolve(val)
        }, 1000)
      })
    },
    fetchJobsVuex: async ({dispatch, commit}) => {
      const myJobs = await dispatch("fetchData")
      commit("setJobs", myJobs)
      const displayJobs = myJobs.slice(0, 3)
      commit("setDisplayJobs", displayJobs)
      commit("setRows", myJobs.length)
    },
    paginate: async ({commit, state}, {currentPage, perPage}) => {
      const start = (currentPage - 1) * perPage
      const jobs = state.jobs.slice(start, start + 3)
      commit("setDisplayJobs", jobs)
    },
    updatePagination: ({commit, dispatch}, {myJobs, currentPage, perPage}) => {
      commit("setJobs", myJobs)
      commit("setRows", myJobs.length)
      dispatch("paginate", {currentPage, perPage})
    },
    search: async ({dispatch}, {text}) => {
      const myJobs = await dispatch("fetchData")
      const values = myJobs.filter(val => 
        val.name.toLowerCase().includes(text.toLowerCase())
      )
      dispatch("updatePagination", {
        myJobs: values,
        currentPage: 1,
        perPage: 3
      })
    }
  },
  modules: {
  }
})
