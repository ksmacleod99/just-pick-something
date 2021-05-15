<template>
    <div class="home">
        <h2>Hello World</h2>
        <Week/>
    </div>
</template>

<script>
import Week from "../components/Week";

export default{
    name: 'Home',
    components: {
        Week
    },
}
</script>


<style scoped>
.home {
    margin: 1em;
    padding: 1em;
    border: 1px solid hotpink;
}
</style>