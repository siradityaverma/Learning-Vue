<template>
<div class="ui stackable grid container">
    <div class="four wide column">
        <sui-card>
            <sui-card-content>
            <sui-card-meta>FILTER BY</sui-card-meta>
            </sui-card-content>
            <sui-card-content>
                <sui-header size="tiny">Category/Function</sui-header>
                <sui-input placeholder="Search..." icon="search" />
                <div v-for="category in categories">
                    <sui-checkbox v-model="checkedCategories" v-bind:value="category" :label="category"/>
                </div>
            </sui-card-content>
            <sui-card-content>
                <sui-header size="tiny">Location</sui-header>
                <sui-input placeholder="Search..." icon="search" />
                <div v-for="location in locations">
                    <sui-checkbox v-model="checkedLocations" v-bind:value="location" :label="location" /> 
                </div>
            </sui-card-content>
            <sui-card-content>
                <sui-header size="tiny">Job Type</sui-header>
                <sui-input placeholder="Search..." icon="search" />
                <div v-for="type in types">
                    <sui-checkbox v-model="checkedTypes" v-bind:value="type" :label="type"/> 
                </div>
            </sui-card-content>
        </sui-card>
    </div>
    <div class="twelve wide column">
        <div v-for="(jobs, title) in filteredJobs" class="ui segments">
            <div class="ui segment">
                <h5>{{title}}</h5>
            </div>
            <div v-for="job in jobs" class="ui segment">
                <h3>{{job.title}}</h3>
                <span>{{job.locations[0]}}</span>
                <span data-v-e6b04304="" class="description-fields-separator"> · </span>
                <span>{{job.min_exp}} - {{job.max_exp }}</span>
                <span data-v-e6b04304="" class="description-fields-separator"> · </span>
                <span>{{job.job_type}}</span>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import source from '../data.json';
import moment from 'moment';

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
            checkedTypes: []
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

            function groupBy(xs, f) {
                return xs.reduce((r, v, i, a, k = f(v)) => ((r[k] || (r[k] = [])).push(v), r), {});
            }

            filterjobs = groupBy(filterjobs, (c) => c.category);

            return filterjobs;
      }
    },

    methods: {
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
            });
        }
    }
};
</script>

