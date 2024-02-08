<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import Modal from '@/Components/Modal.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    model: Object,
    publishable_type: String,
    publishable_id: String,
});

const isPublished =ref(props.model.isPublished);

const btnClasses = 'rounded border border-transparent bg-blue-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
const btnCloseClasses = 'rounded border border-transparent bg-rose-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2';
const primaryLinkClasses = 'px-3 py-1 text-gray-600 hover:bg-blue-600 hover:text-white rounded hover:shadow-md transition-all duration-200 mb-1 w-full text-left';
const dangerLinkClasses = 'bg-slate-50 rounded-full px-4 py-1.5 text-red-600 text-sm border hover:text-red-700 hover:bg-slate-100 transition-all duration-200 ease-in-out space-x-2';


const user = usePage().props.auth.user;

const isModalActive = ref(false);

const toggleModal = async()=>{
    isModalActive.value=!isModalActive.value;
    await fetchStatus();
}

const computed_user_id = computed(()=>{
    if(user){
        return user.id
    }
    else{
        return 0
    }
});

const form = useForm({
    publishable_id: props.publishable_id,
    publishable_type: props.publishable_type,
    user_id: computed_user_id,
});

const submit = async () =>{
    if(user){
        const res = await axios.post(route('model.publish'), {
            publishable_id: form.publishable_id, 
            publishable_type:form.publishable_type,
            published_by: form.user_id
        })

        if(res.data.status === 200)
        {
            isPublished.value = res.isPublished;
            fetchStatus();
            toggleModal();
            location.reload(); // Should be changed to happen asynchronously 
        }

    }
}


const fetchStatus = async ()=>{
    const modelstatus = await axios.post(route('model.getispublished'),{
            publishable_id: form.publishable_id,
            publishable_type: form.publishable_type
        });
    isPublished.value = modelstatus.data;
}


</script>

<template>
    <div>
        <button 
            @click="toggleModal"
            :class="isPublished ? dangerLinkClasses : primaryLinkClasses"
            >
                <span v-if="isPublished" class="">
                    <font-awesome-icon icon="fa-times"></font-awesome-icon> Unpublish
                </span>
                <span v-else class="space-x-">
                    <font-awesome-icon icon="fa-check"></font-awesome-icon> Publish 
                </span>
        </button>
    </div>

    <Modal :show="isModalActive" :closeable="true">
        <div class="p-6">
            <div class="flex gap-4 items-center mb-6">

                <div v-if="model.image" class="h-24">
                    <img :src="model.image" class="h-full" >
                </div>
                
                <div class="grow">
                    <h3 class="uppercase font-bold text-blue-800">{{ model.name }}</h3>
                    <p class="uppercase">
                        This action will
                        <span v-if="!isPublished">publish </span>  
                        <span v-else class="text-rose-600 font-bold">unpublish </span>  
                        <span v-if="model.name" class="font-bold"> "{{model.name}}" </span>
                        <span v-else-if="model.title" class="font-bold"> "{{ model.title }}" </span> .
                    </p>
                
                    <h2 
                        class="font-bold"
                        :class="!isPublished ? 'text-blue-600' : 'text-rose-600'"
                        >Do you want to proceed ?</h2>

                </div>
            </div>

            <div class="flex gap-2">
                <button 
                    type="button"
                    :class="!isPublished ? btnClasses : btnCloseClasses"
                    @click="submit"
                    >
                        Ok, 
                        <span v-if="!isPublished">Publish</span>  
                        <span v-else>Remove</span> 
                </button>
                <button 
                    type="button" 
                    :class="!isPublished ? btnCloseClasses : btnClasses"
                    @click="toggleModal"
                    >
                    No, Go Back
                </button>
            </div>
        </div>
    </Modal>

</template>


