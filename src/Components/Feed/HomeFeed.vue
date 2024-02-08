<template>
    <div class="">
    
        <div v-if="props.posts.length>0" class="">
            <PostCard v-for="post in props.posts.slice(0,2)" :key="post.id" :post="post" />  
            <div v-if="leagues.length" class="grid grid-cols-4 gap-4 mb-6">
                <LeagueCard v-for="league in props.leagues.slice(0,4)" :key="league.id" :league="league"/>   
            </div>    
            <PostCard v-for="post in props.posts.slice(3,17)" :key="post.id" :post="post" />      
        </div>

        <div v-else class="">
            <p class=""> No posts Created</p>                                
        </div>
    </div>
</template>

<script setup>
import PostCard from "@/Components/Card/PostCard.vue"
import LeagueCard from "@/Components/Card/LeagueCard.vue"
const props = defineProps({
    posts: Array,
    leagues: Array,
})

</script>

<style>

</style>