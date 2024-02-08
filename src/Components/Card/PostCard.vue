
<script setup>
import { Link } from "@inertiajs/vue3";
import axios from "axios";
import { onMounted, ref } from "vue";
import NewCommentForm from "@/Components/Form/NewCommentForm.vue"
import LikeButton from "@/Components/Button/LikeButton.vue"

const props = defineProps({
    post: [Object],
});  

const show = ref(false);
const comments = ref(props.post.comments);

const toggleOptions = () => {
    show.value = !show.value
}


const fetchComments = async ()=>{
    const res = await axios.post(route('api.comments.index'),
    {
        commentable_id: props.post.id,
        commentable_type: 'App\\Models\\Post'
    });
    comments.value = res.data.data
}



</script>

<template>

  <div class="bg-white rounded-2xl border-2 border-gray-50 mb-5 shadow-md overflow-hidden sm:overflow-hidden">
   
        <div class="flex justify-between px-6 align-bottom mb-2">
            <div class="flex align-middle gap-2 pt-3">
                <div class="h-12 w-12 bg-teal-400 rounded-full cursor-pointer shadow-md transition-all overflow-hidden">
                    <img :src="post.owner.profile.profileimage" alt="" class="h-full w-full object-cover">
                </div>
                <div class="my-auto">
                    <div class="">
                        <span v-if="props.post.owner.name" class="font-bold m-0 text-base cursor-pointer">{{ props.post.owner.name}}</span>  
                    </div>
                    <div class="">
                        <small class="flex items-center gap-1">Pro Player 
                            <span class="text-teal-500">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                </svg>
                            </span>
                        </small>
                    </div>
                </div>
            </div>
            <div class="flex items-center gap-2">
                <span class="text-gray-700 text-sm">{{ props.post.created_at }}</span>
                <span class="my-auto relative">
                    <svg @click="toggleOptions" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 cursor-pointer">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                    </svg>
                    <div v-show="show" class="absolute bg-gray-100 p-3 rounded -translate-x-full"> 
                        <ul class="px-2">
                            <li class="cursor-pointer text-gray-600 mb-2 hover:text-teal-600">Save</li>
                            <li class="cursor-pointer text-gray-600 mb-2 hover:text-teal-600">Edit</li>
                            <li class="cursor-pointer text-gray-600 mb-2 hover:text-teal-600">Delete</li>
                            <li class="cursor-pointer text-gray-600 mb-2 hover:text-teal-600">Share</li>
                        </ul>
                    </div>
                </span>
            </div>
        </div>

        <div class="mb-3">

            <Link :href="route('post.show', props.post.id)">
                <div v-if="props.post.body" class="px-6 pb-6">
                    <p>{{ props.post.body }}</p>
                </div>
            </Link>

            <div v-if="props.post.images.length > 0" class="px-4 gap-4"
                :class="[
                        [props.post.images.length == 2 ? 'grid grid-rows-2' : ''],
                        [props.post.images.length == 3 ? 'grid grid-cols-2' : ''],
                        [props.post.images.length == 4 ? 'grid grid-cols-2' : ''],
                        [props.post.images.length > 4 ? 'grid grid-cols-3' : ''],
                    ]"    
                >
                <Link v-for="(image, index) in props.post.images.slice(0,4)" :key="image.id" :href="route('post.show', props.post.id)"
                    :class="[
                        [props.post.images.length == 3 && index == 0 ? 'col-span-2' : ''],
                        [props.post.images.length >= 5 && index == 0 ? 'col-span-3' : ''],
                    ]"
                    >
                    <div class="rounded-md overflow-hidden relative"
                        :class="[
                            [props.post.images.length == 1 ? 'h-auto' : ''],
                            [props.post.images.length == 3 && index == 0 ? 'h-96' : 'h-56'],
                            [props.post.images.length == 4 ? 'h-56' : ''],
                            [props.post.images.length >= 5 && index == 0 ? 'h-96' : 'h-56'],
                        ]"
                    >
                        <div v-if="props.post.images.length>4 && index==3" class="overlay absolute inset-0 bg-black bg-opacity-50">
                            <div class="flex items-center justify-center h-full">
                                <span class="text-2xl text-white font-bold">+{{props.post.images.length-4}}</span>
                            </div>
                        </div>
                        <img ref="postImage" :src="image" alt="" class="w-full h-full object-cover">
                    </div>
                </Link>
            </div>

        </div>

        <div class="px-6 flex justify-between text-sm mb-3">
            <div class="flex items-center gap-4">

                <LikeButton 
                    :likeable_type="`\\App\\Models\\Post`" 
                    :likeable_id="props.post.id" 
                    />

                <NewCommentForm
                    :commentable_type="`\\App\\Models\\Post`" 
                    :commentable_id="post.id" 
                    @commentposted="fetchComments"
                />

                <button class="mr-2 hover:text-teal-700 flex items-center">
                    <font-awesome-icon icon="fa-share"></font-awesome-icon>
                    Share
                </button>
            </div>
            <div class="flex justify-end gap-2">
                <span class="text-gray-400 my-auto">{{comments.length}} Comments</span>
                <span class="text-gray-400 my-auto">150 Shares</span>
                <span class="text-gray-400 my-auto">{{ props.post.likes.length }} Likes</span>
            </div>
        </div>
        <hr class="mb-6">

        <div class="px-6 mb-3">
          <div v-if="comments.length" class="">
            <div v-for="comment in comments" :key="comment.id" class="flex items-start gap-1 mb-3">
                <div class="h-8 w-8 bg-teal-400 rounded-full cursor-pointer shadow-md transition-all overflow-hidden">
                    <img :src="comment.owner.profile.profileimage" alt="" class="h-full w-full object-cover">
                </div>
                <div class="w-[90%] text-sm">
                    <div class="bg-teal-100 px-3 py-2 rounded-lg">
                        <h3 class="font-bold mb-1">{{ comment.owner.name }}</h3>
                        <p>
                        {{ comment.comment }}
                        </p>
                    </div>
                    <div class="flex justify-between items-center gap-2 text-xs  px-3 py-1">
                        <div class="space-x-2 text-teal-900 font-bold">
                            <button>Reply</button>
                            <button @click="likeComment(comment.id)"><span v-if="comment.likes.length>0">{{ comment.likes.length }}</span> Like</button>
                        </div>
                        <div class="">
                            <span class="text-gray-700">{{ comment.created_at }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <a href="#" class="text-teal-900 font-bold uppercase text-sm">View More Comments</a>
          </div>
        </div>
        <!--
          

        <div class="flex justify-between items-center px-6 gap-1 mb-3">
            <div class="h-8 w-8 bg-teal-400 rounded-full cursor-pointer shadow-md transition-all overflow-hidden">
                <img src="../assets/images/panyako.jpg" alt="" class="h-full w-full object-cover">
            </div>
            <form @submit.prevent="postComment(props.post.id)" class="w-full">
                <input type="text" name="comment" id="comment" autocomplete="comment" required class="block w-full h-10 rounded-full bg-gray-50 border border-gray-200  focus:outline-none focus:bg-teal-50 focus:ring ring-teal-100 px-3 py-1" v-model="commentForm.comment">
            </form>
        </div> -->

    </div>
</template>
<style>

</style>