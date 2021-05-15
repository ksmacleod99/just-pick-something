<template>
   <div class="topbar">
       <div class="box">Happy Logo</div>
       <div class="box">
           <ul>
               <li><router-link to="/">Home</router-link></li>
               <li>Calendar</li>
               <li><router-link to="/cookbook">Cookbook</router-link></li>
           </ul>
       </div>
 
   </div>

</template>

<script>
export default {
   name: "Header"
}
</script>
<style scoped>

h3 {
    margin: 40px;
}
.topbar {
    position: relative;
    margin: 0;
    padding: 0;
}
ul {
    list-style-type: none;
}
li {
    margin: 20px;
    display: inline;
}
.box {
    display: inline-block;
    border: purple 1px solid;
    padding: 10px;
}
</style>