<template>
    <div id="toggler" class="h-8 w-16 rounded-full flex items-center transition-all duration-600 ease-in-out px-1 cursor-pointer"
    @click="toggleSwitch" 
    :class="[on?'bg-blue-500 justify-end': 'bg-gray-500 justify-start']">
        <div class="h-6 w-6 rounded-full bg-gray-200" :class="[on?'':'']" />    
    </div>
</template>

<script setup>
import { ref } from "vue"

const on = ref(true)

const toggleSwitch = ()=>{
    on.value = !on.value
}


</script>

<style>

</style>