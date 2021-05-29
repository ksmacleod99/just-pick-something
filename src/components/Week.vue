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
                 <div 
                 v-for="day in plan.day" 
                 :plan="day" 
                 :key="day" 
                 class="day">
                    <p>Breakfast: <span>{{ day.breakfast }}</span></p> 
                    <p>Lunch: <span>{{ day.lunch }}</span></p>
                    <p>Dinner: <span>{{ day.dinner}}</span></p>
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
        plan: Object
    },
    methods: {
        setId() {
        //
        },
        
    },

}
</script>

<style scoped>
.container {
    margin: auto;
    width: 80%;
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
    align-items: right;
}
.day {
    width: 14%;
}

</style>


