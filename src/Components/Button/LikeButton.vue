<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';
import Modal from '@/Components/Modal.vue'
import axios from 'axios';

const props = defineProps({
    likeable_type: String,
    likeable_id: String,
});

const emits = defineEmits([
    'liked'
])

const likes = ref([]);
const user = usePage().props.auth.user.data;

const form = useForm({
    likeable_id: props.likeable_id,
    likeable_type: props.likeable_type,
    user_id: user.id,
});

const submit = async () =>{
    if(user){
        const res = await axios.post(route('api.like'), {
            likeable_id: form.likeable_id, 
            likeable_type:form.likeable_type,
            user_id: form.user_id
        })

        if(res.data.status === 200)
        {
            await fetchLikes();
            emits('liked', likes.value);   
        }
    }
    else{
        return;
    }
    
}

const fetchLikes = async ()=>{
    const fetchedlikes = await axios.post(route('api.likes'),{
            likeable_id: form.likeable_id,
            likeable_type: form.likeable_type
        });
    likes.value = fetchedlikes.data;
}

onMounted(async ()=>{
    await fetchLikes();
});


const liked = computed(()=>{
    if(user&&likes.value.length>0){
        return likes.value.map(like => like.user_id).includes(user.id);
    }
});


</script>

<template>
    <button
        @click="submit()"
        :class="liked ? 'text-teal-600' : 'text-slate-500'"
        class="text-lg"
        >
        <span v-if="liked" class="text-sm pr-1">
            You
        </span>
        <font-awesome-icon icon="fa-thumbs-up"></font-awesome-icon>
        
    </button>

</template>



<style>

</style>


