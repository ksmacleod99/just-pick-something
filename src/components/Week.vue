<template>
    <div class="container">
        <v-sheet
            color= "white"
            elevation="1"
        >
            <div class="inside">
                <div class="flex">
                    <div class="weekOf">
                        <h3>Week Of {{plan.id}} </h3>
                    </div>
                    <div class="controls">
                        <EditButton />
                    </div>
                </div>

                <div class="flex">
                 <div class="day">
                    <p>Breakfast: <span>{{ plan.monday.breakfast}}</span></p> 
                    <p>Lunch:</p>
                    <p>Dinner:</p>
                 </div>
                </div>

            </div>
        </v-sheet>
    </div>

</template>

<script>
import EditButton from "./EditButton";

export default{
    name: "Week",
    components: {
        EditButton
    },
    props: {
        plan: Object,
    },
    methods: {
        //
    }
}
</script>

<style scoped>
.container {
    margin: auto;
    width: 70%;
}
.inside { 
    margin: 1em;
    padding: 1em;
}
.flex {
    display: flex;
}
.weekOf{
    width:80%;
}
.controls{
    width: 20%;
}
.day {
    width: 14%;
}

</style>


