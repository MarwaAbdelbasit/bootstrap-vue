<template>
  <div class="home">
    <b-container>
      <b-row align-v="center">
        <b-col md="3" v-for="job in getDisplayJobs" :key="job.id">
          <job-card-vue :name="job.name"></job-card-vue>
        </b-col>
      </b-row>

      <b-pagination
        v-model="currentPage"
        :total-rows="getRows"
        :per-page="perPage"
        first-text="First"
        prev-text="Prev"
        next-text="Next"
        last-text="Last"
        @input="paginate(currentPage)"
      ></b-pagination>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src
import JobCardVue from "../components/JobCard.vue"
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    JobCardVue
  },
  computed: {
    ...mapGetters(["getJobs", "getDisplayJobs", "getRows"])
  },
  data() {
    return {
      currentPage: 1,
      perPage: 3
    }
  },
  mounted() {
    this.fetcJobs()
  },
  methods: {
    ...mapActions(['fetchJobsVuex', 'paginate']),

    async fetcJobs() {
      await this.fetchJobsVuex()
    },
    paginate(currentPage) {
      //go and make an http request to the server and have it return back only the records you need
      //and then vhange the jobs array to the new array that has been returned from the server

      this.$store.dispatch("paginate", {currentPage, perPage:this.perPage})
    }
  }
}
</script>
