<template>
        <h2>Hello World</h2>
        <Week
          v-for="plan in plans"
          :plan = "plan"
          :key="plan.id"
        />

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


