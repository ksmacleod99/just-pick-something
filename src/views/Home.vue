<template>
  <div class="container">
        <Week
          v-for="plan in plans"
          :plan = "plan"
          :key="plan.id"
        />
  </div>


</template>

<script>

import Week from "../components/Week";

export default{
    name: 'Home',
    data() {
      return {
       plans: []
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
  margin: 1em;
  padding: 1em;
  display: grid;
  grid-gap: 1em;
  align-items: center;
}
</style>