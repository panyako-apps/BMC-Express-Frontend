<template>
    <button @click="toggleIsFavourite" class="bg-rose-900 bg-opacity-25 px-1 rounded-md">
        <span class="text-2xl" :class="[isFavourite ? 'text-rose-500' : 'text-white']">                                    
            <font-awesome-icon  icon="fa-heart"></font-awesome-icon>
        </span>
    </button>
</template>

<script setup>
import { ref } from "vue";


const isFavourite = ref(false);

const toggleIsFavourite = () =>{
    isFavourite.value = !isFavourite.value
}

</script>

<style>

</style>