<template>
    <v-sheet>
        <h2>This Week</h2>
        <h3>Week Of:</h3> <p> {{plan.id}} </p>
        <p>Breakfast:</p> {{ plan.monday.breakfast.value}}
        <p>Lunch:</p>
        <p>Dinner:</p>
        <p>Edit:</p>
    </v-sheet>
</template>

<script>
export default{
    name: "Week",
    props: {
        plan: Object
    },
    methods: {
        //
    }
}
</script>


