<template>
  <div class="ui stackable grid container">
    <div class="sixteen wide column">
      <h2 v-if="totalOpening > 1">{{ totalOpening }} Openings</h2>
      <h2 v-else-if="totalOpening === 0">No Openings</h2>
      <h2 v-else>1 Opening</h2>
    </div>
    <div class="sixteen wide column">
      <template v-for="category in checkedCategories">
        <span :key="category" class="filter-label">
          {{ category }} <i class="times icon" @click="removeCategory(category)"></i>
        </span>
      </template>
      <template v-for="location in checkedLocations">
        <span :key="location" class="filter-label">
          {{ location }} <i class="times icon" @click="removeLocation(location)"></i>
        </span>
      </template>
      <template v-for="type in checkedTypes">
        <span :key="type" class="filter-label">
          {{ type }} <i class="times icon" @click="removeType(type)"></i>
        </span>
      </template>
    </div>
    <div class="four wide column">
      <sui-card>
        <sui-card-content class="card-filter">
          <sui-card-meta>FILTER BY</sui-card-meta>
          <a
            v-if="
              checkedCategories.length > 0 || checkedLocations.length > 0 || checkedTypes.length > 0
            "
            @click="clearFilters"
            ><i class="undo icon" /> Reset</a
          >
        </sui-card-content>
        <sui-card-content>
          <div class="filter-header">
            <sui-header size="tiny">Category/Function</sui-header>
            <span @click="toggleCategory">
              <i v-if="showCategory" class="minus icon"></i>
              <i v-else class="plus icon"></i>
            </span>
          </div>
          <div v-if="showCategory">
            <sui-input placeholder="Search..." icon="search" />
            <div v-for="category in categories">
              <sui-checkbox v-model="checkedCategories" :value="category" :label="category" />
            </div>
          </div>
        </sui-card-content>
        <sui-card-content>
          <div class="filter-header">
            <sui-header size="tiny">Location</sui-header>
            <span @click="toggleLocation">
              <i v-if="showLocation" class="minus icon"></i>
              <i v-else class="plus icon"></i>
            </span>
          </div>
          <div v-if="showLocation">
            <sui-input placeholder="Search..." icon="search" />
            <div v-for="location in locations">
              <sui-checkbox v-model="checkedLocations" :value="location" :label="location" />
            </div>
          </div>
        </sui-card-content>
        <sui-card-content>
          <div class="filter-header">
            <sui-header size="tiny">Job Type</sui-header>
            <span @click="toggleType">
              <i v-if="showType" class="minus icon"></i>
              <i v-else class="plus icon"></i>
            </span>
          </div>
          <div v-if="showType">
            <div v-for="type in types">
              <sui-checkbox v-model="checkedTypes" :value="type" :label="type" />
            </div>
          </div>
        </sui-card-content>
      </sui-card>
    </div>
    <div class="twelve wide column">
      <div v-for="(jobs, title) in filteredJobs" class="ui segments">
        <div class="ui segment">
          <h4><i class="genderless icon"></i> {{ title }}</h4>
        </div>
        <div v-for="job in jobs" class="ui segment job-list">
          <div class="clickable-job" @click="navigate(job.slug)">
            <div>
              <h3>{{ job.title }}</h3>
              <span class="sub">{{ job.locations[0] }}</span>
              <span data-v-e6b04304="" class="description-fields-separator"> · </span>
              <span class="sub">{{ job.min_exp | moment }} - {{ job.max_exp | moment }} Years</span>
              <span data-v-e6b04304="" class="description-fields-separator"> · </span>
              <span class="sub">{{ job.job_type }}</span>
            </div>

            <span class="sub created-at">{{ job.created_at | fromNow }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import router from "../router.js";

export default {
  name: "Listings",
  filters: {
    moment(date) {
      return parseInt(date) / 12;
    },
    fromNow(date) {
      return moment(date).fromNow();
    }
  },
  data() {
    return {
      loading: false,
      jobs: null,
      categories: [],
      types: [],
      locations: [],
      checkedLocations: [],
      checkedCategories: [],
      checkedTypes: [],
      totalOpening: 0,
      showLocation: true,
      showCategory: true,
      showType: true
    };
  },
  computed: {
    filteredJobs() {
      var filterjobs = this.jobs;

      if (this.checkedLocations.length > 0) {
        filterjobs = filterjobs.filter(l => {
          return this.checkedLocations.includes(l.locations[0]);
        });
      }

      if (this.checkedCategories.length > 0) {
        filterjobs = filterjobs.filter(c => {
          return this.checkedCategories.includes(c.category);
        });
      }

      if (this.checkedTypes.length > 0) {
        filterjobs = filterjobs.filter(t => {
          return this.checkedTypes.includes(t.job_type);
        });
      }

      this.totalOpening = filterjobs.length;

      function groupBy(xs, f) {
        return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
      }

      filterjobs = groupBy(filterjobs, c => c.category);

      return filterjobs;
    }
  },
  created() {
    this.getJobs();
  },

  methods: {
    toggleCategory() {
      this.showCategory = !this.showCategory;
    },
    toggleLocation() {
      this.showLocation = !this.showLocation;
    },
    toggleType() {
      this.showType = !this.showType;
    },
    clearFilters() {
      this.checkedLocations = this.checkedCategories = this.checkedTypes = [];
    },
    removeCategory(value) {
      this.checkedCategories = this.checkedCategories.filter(item => item !== value);
    },
    removeLocation(value) {
      this.checkedLocations = this.checkedLocations.filter(item => item !== value);
    },
    removeTypes(value) {
      this.TypesLocations = this.checkedTypes.filter(item => item !== value);
    },
    getJobs() {
      this.loading = true;
      fetch("https://paramdemo.app.param.ai/api/career/get_job/", { method: "GET" })
        .then(res => res.json())
        .then(res => {
          let data = [];
          this.categories = res.fil_category;
          this.types = res.fil_job_types;
          this.locations = res.fil_locations;
          this.categories.map(c => res.data[c].jobs.map(d => data.push(d)));
          this.jobs = data;
          this.totalOpening = res.total_jobs;
          this.loading = false;
        });
    },
    navigate(slug) {
      router.push(`/jobs/${slug}`);
    },
    moment() {
      return moment();
    }
  }
};
</script>
<style lang="sass">
.ui.stackable
    padding-top: 20px
.ui.icon.input
    width: 100%!important
    margin-bottom: 15px
    input
        padding-right: 0em!important
.ui.checkbox
    margin-top: 7px
.genderless
    color: rgb(0, 141, 234)
    font-size: 13px
.card-filter
    display: flex
    justify-content: space-between
    width: 100%
    .meta
        width: 50%
    a
        text-align: right
        width: 50%
.filter-header
    display: flex
    flex-direction: row
    width: 100% !important
    justify-content: space-between
    i
        color: #888
.ui.segment.job-list
    cursor: pointer
    &:hover
        background-color: #cce2ff
        h3
            color: #268ee8
    .clickable-job
        display: flex
        justify-content: space-between
        .created-at
            font-size: 12px;
            align-self: flex-end!important;
        .sub
            color: #777
.filter-label
    display: inline-block;
    list-style: none;
    position: relative;
    background-color: #fff;
    text-transform: capitalize;
    color: #3e4152;
    cursor: default;
    font-size: 12px;
    padding: 4px 5px 4px 12px;
    border-radius: 50px
    margin: 5px
    i
        &:hover
            cursor: pointer
</style>
