<script setup>
import InputError from '@/Components/InputError.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import { useForm, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import { computed, onMounted, ref } from 'vue';
import Modal from "@/Components/Modal.vue";
import Spinner from '@/Components/Spinner.vue'

const props = defineProps({
    commentable_type: String,
    commentable_id: String,
    parent_id: String,
    isReply: {
        type: Boolean,
        default: false
    }
});

const emits = defineEmits([
    'commentposted'
])

const show = ref(false);

const toggleModal = ()=>{
    show.value=!show.value
}
const inProgress = ref(false);


const comments = ref([]);

const user = usePage().props.auth.user.data;

const computed_user_id = computed(()=>{
    if(user){
        return user.id
    }
    else{
        return 0
    }
});

const errors = ref([])

const form = useForm({
    comment: '',
    image: null,
    commentable_id: props.commentable_id,
    commentable_type: props.commentable_type,
    user_id: computed_user_id,
    parent_id: props.parent_id,
});


const submit = async () =>{
    
    errors.value = [];

    if(user){

        if(form.comment==='')
        {
            errors.value.push('Comment field is required!')
        }

        if(errors.value.length<1){
        
            inProgress.value = true;

            const res = await axios.post(route('api.comment.store'), {
                comment: form.comment,
                image: form.image,
                commentable_id: form.commentable_id, 
                commentable_type:form.commentable_type,
                user_id: form.user_id,
                parent_id: form.parent_id
            })
                        
            if(res.data.status === 200)
            {
                inProgress.value = false;
                comments.value = res
                toggleModal();
                form.reset();
                emits('commentposted');
                
            }
        }
    }
    else{
        toggleModal();
    }
    
}


const editorConfig = ref();

const btnText = 'text-sm text-blue-600 hover:text-slate-400 transition-all duration-200';
const btnCloseClasses = 'rounded border border-transparent bg-red-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2';
const primaryLinkClasses = 'px-3 py-1 text-gray-600 bg-blue-600 hover:bg-blue-700 text-white rounded-full hover:shadow-md text-left';

</script>

<template>
    <div>
        <button 
            @click="toggleModal" class="text-slate-500" >
            <span v-if="isReply" class="space-x-1">
                <font-awesome-icon icon="fa-reply"></font-awesome-icon>
                <span class=""> reply</span>
            </span>
            <span v-else  class="space-x-1">
                <font-awesome-icon icon="fa-comment" class="text-lg"></font-awesome-icon>
                <span class="">Comment</span>
            </span>

        </button>
    </div>
    <Modal :show="show" @close="toggleModal">
        <div class="" v-if="user">
            <div v-if="inProgress" class="p-6 h-36 flex justify-center items-center">
                <Spinner :has-text="true" :text="'Posting...'"/>
            </div>
            <div v-show="!inProgress" class="p-6">
                <form @submit.prevent="submit">
                    <div class="flex justify-end mb-2">
                        <button 
                            type="button" 
                            class="rounded-full w-6 h-6 shrink-0 bg-red-600 hover:bg-red-700 text-white text-sm"
                            @click="toggleModal"
                            >
                            <font-awesome-icon icon="fa-times"></font-awesome-icon>
                        </button>
                    </div>
                    <div class="mb-3">
                        <textarea v-model="form.comment" class="w-full rounded-xl border border-slate-200 " placeholder="Write your comment..."></textarea>
                        <InputError class="mt-2" :message="form.errors.comment" />
                        <ul v-if="errors.length>0" class="bg-red-100 rounded-md p-2 mt-1">
                            <li class="text-red-600" v-for="error in errors" :key="error">{{ error }}</li>
                        </ul>
                    </div>
    
                    <div class="my-3 flex gap-2 items-center">
                        <button class="rounded-full bg-slate-100 shadow-sm px-5 py-1.5 text-teal-600" :class="[{ 'opacity-25': form.processing }, {'bg-teal-600 text-white' : form.comment}]" :disabled="form.processing">
                            Post Comment
                        </button>
                    </div>
                </form>
            </div>
        </div>
               
    </Modal>

</template>
