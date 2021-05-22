<template>
    <v-sheet
        color= "white"
        elevation="1"
    >
        <div class="cal">

            <h2>This Week</h2>
            <p class="weekOf">Week Of {{plan.id}} </p>
            <p>Breakfast: <span>{{ plan.monday.breakfast}}</span></p> 
            <p>Lunch:</p>
            <p>Dinner:</p>
            <p>Edit:</p>
    </div>
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

<style scoped>
.cal {
    padding: 1em;
    margin: 1em;
}
.weekOf{
    font-size: 1.2em;
    font-weight: bold;
}
</style>


