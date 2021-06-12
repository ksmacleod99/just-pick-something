<template>
    <div>
        <input type="number" class="number">
        <input type="text" placeholder="Add Ingredient">
    </div>
</template>

<script>
export default {
    name: 'AddIngredient',
}
</script>

<style scoped>
    .number {
        width: 50px;
        border: 1px solid #314e55;
        border-radius: 2px;
        margin: 5px;
    }
    input {
        border-bottom: 1px solid #314E55;
    }
</style>