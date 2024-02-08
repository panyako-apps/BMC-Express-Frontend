<template>
    <div :class="props.classes">
        <span v-for="(link, index) in props.links" :key="index" >
            <span v-if="link.url=== null" v-html="link.label" class="border border-orange-300 text-orange-300 px-3 py-1 rounded-lg"></span>
            <a v-else :href="link.url" v-html="link.label" 
                class="border border-orange-300 text-orange-300 text-sm font-bold hover:bg-orange-600 hover:border-transparent 
                        hover:text-white px-3 py-1 rounded-full mx-1 transition-all duration-200"
                :class="{'bg-orange-600 border-orange-600  text-white font-bold': link.active}"                        
                >
            </a>
        </span>
    </div>
</template>

<script setup>
const props = defineProps({
    links: [Object, Array],
    classes: String,
})
</script>

<style>

</style>