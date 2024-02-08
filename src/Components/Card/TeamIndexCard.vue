<template>
<div class="break-inside-avoid-column mb-6">
    <div class="h-48 bg-white rounded-2xl shadow-md overflow-hidden group">
        <Link :href="route('team.show', team.id)">
            <div v-if="props.team.coverimage" class="h-full">
                <img :src="props.team.coverimage" alt="" class="w-full h-full object-cover group-hover:scale-105 transition-all duration-350 ease-in-out">
            </div>
        </Link>
    </div>
    <div class="flex gap-2 items-start group mt-2">
        <div class="bg-white w-8 h-8 flex items-center justify-center rounded-full shrink-0 overflow-hidden">
            <img :src="props.team.logo" alt="" class="w-full h-full object-cover">
        </div>
        <h4 class="text-slate-700 font-bold w-[80%] shrink-0">{{props.team.name.slice(0,36)}} {{props.team.name.length > 36 ? '...' : ''}}</h4>
        <div class="hidden group-hover:inline-flex">
            <div class="flex items-center gap-2">
                <span class="my-auto relative">
                    <div class="text-slate-700 flex items-center justify-center">
                        <svg @click="toggleOptions" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </div>
                    <div v-show="show" class="absolute bg-gray-100 p-3 rounded -translate-x-full"> 
                        <ul class="px-2">
                            <li class="cursor-pointer text-gray-600 mb-2 hover:text-teal-600">Matches</li>
                            <li class="cursor-pointer text-gray-600 mb-2 hover:text-teal-600">Players</li>
                            <li class="cursor-pointer text-gray-600 mb-2 hover:text-teal-600">Table</li>
                            <li class="cursor-pointer text-gray-600 mb-2 hover:text-teal-600">News</li>
                        </ul>
                    </div>
                </span>
            </div>
        </div>
    </div>
</div>
</template>

<script setup>
import { Link } from "@inertiajs/vue3";
import { ref } from "vue";


const props = defineProps({
    team: [Object],
});  

const show = ref(false);

const toggleOptions = () => {
    show.value = !show.value
}
</script>

<style>

</style>