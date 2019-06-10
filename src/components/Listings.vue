<template>
<div class="ui stackable grid container">
    <div class="sixteen wide column">
        <h2 v-if="totalOpening > 1">{{totalOpening}} Openings</h2>
        <h2 v-else-if="totalOpening === 0" > No Openings</h2>
        <h2 v-else>1 Opening</h2>
    </div>
    <div class="sixteen wide column">
        <span v-for="category in checkedCategories">{{category}}  </span>
        <span v-for="location in checkedLocations">{{location}}  </span>
        <span v-for="type in checkedTypes">{type}}  </span>
    </div>
    <div class="four wide column">
        <sui-card>
            <sui-card-content>
            <sui-card-meta>FILTER BY</sui-card-meta>
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
                        <sui-checkbox v-model="checkedCategories" v-bind:value="category" :label="category"/>
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
                        <sui-checkbox v-model="checkedLocations" v-bind:value="location" :label="location" /> 
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
                        <sui-checkbox v-model="checkedTypes" v-bind:value="type" :label="type"/> 
                    </div>
                </div>
            </sui-card-content>
        </sui-card>
    </div>
    <div class="twelve wide column">
        <div v-for="(jobs, title) in filteredJobs" class="ui segments">
            <div class="ui segment">
                <h4><i class="genderless icon"></i> {{title}}</h4>
            </div>
            <div v-for="job in jobs" class="ui segment job-list">
                <div @click="navigate(job.slug)">
                    <h3>{{job.title}}</h3>
                    <span class="sub">{{job.locations[0]}}</span>
                    <span data-v-e6b04304="" class="description-fields-separator"> · </span>
                    <span class="sub">{{job.min_exp}} - {{job.max_exp }}</span>
                    <span data-v-e6b04304="" class="description-fields-separator"> · </span>
                    <span class="sub">{{job.job_type}}</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
import router from '../router.js';

export default {
    name: 'Listings',
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
        }
    },
    created() {
        this.getJobs();
    },
    filters: {
        fromNow(date) {
            moment.startOf('date', 'months').fromNow()
        },
        format(date) {
            console.log(date)
            return moment.format(date, 'YY')
        }
    },
    computed:{
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

            filterjobs = groupBy(filterjobs, (c) => c.category);

            return filterjobs;
      }
    },

    methods: {
        toggleCategory() {
            this.showCategory = !this.showCategory
        },
        toggleLocation() {
            this.showLocation = !this.showLocation
        },
        toggleType() {
            this.showType = !this.showType
        },
        getJobs() {
            this.loading = true;
            fetch('https://paramdemo.app.param.ai/api/career/get_job/', {method: 'GET'})
            .then(res => res.json())
            .then(res => {
                let data = [];
                this.categories = res.fil_category;
                this.types = res.fil_job_types;
                this.locations = res.fil_locations;
                this.categories.map(c => res.data[c].jobs.map(d => data.push(d)));
                this.jobs = data;
                this.totalOpening = res.total_jobs
                this.loading = false;
            });
        },
        navigate(slug) {
            router.push(`/jobs/${slug}`)
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
    .sub
        color: #888
</style>
