<template>
  <div class="container">
    <h2>Today's Plan</h2>
    <time>{{ today }}</time>
    <p>Breakfast</p>
    <p>Lunch</p>
    <p>Dinner</p>
        <Week
          v-for="plan in plans"
          :plan = "plan"
          :key="plan.id"
        />
  </div>


</template>

<script>

import Week from "../components/Week";
import { DateTime } from 'luxon'


export default{
    name: 'Home',
    data() {
      return {
       plans: [],
       today: DateTime.local().toFormat('DDDD')
      }
    },
    components: {
        Week
    },
    methods: {
      async fetchPlans() {
       const res = await fetch("api/plans");
       const plans = await res.json();
       return plans;
      },
    },
  async created() {
    this.plans = await this.fetchPlans();
  }
}
</script>


<style scoped>
.container {
  margin: 2em;
  padding: 1em;
  display: grid;
  grid-gap: 1em;
  align-items: center;
}
</style>