<script setup>
import { useForm, usePage } from '@inertiajs/vue3';
import { computed, onMounted, ref } from 'vue';
import axios from 'axios';
import Modal from '@/Components/Modal.vue'
import PrimaryButton from '@/Components/PrimaryButton.vue';

const props = defineProps({
    model: Object,
    featurable_type: String,
    featurable_id: String,
});

const isFeatured =ref(props.model.isFeatured);

const btnClasses = 'rounded border border-transparent bg-sky-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2';
const btnCloseClasses = 'rounded border border-transparent bg-rose-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2';
const primaryLinkClasses = 'px-3 py-1 text-gray-600 hover:bg-sky-600 hover:text-white rounded hover:shadow-md transition-all duration-200 mb-1 w-full text-left';
const dangerLinkClasses = 'px-3 py-1 text-rose-600 font-bold hover:bg-rose-600 hover:text-white rounded hover:shadow-md transition-all duration-200 mb-1 w-full text-left';


const user = usePage().props.auth.user;

const isModalActive = ref(false);

const toggleModal = async()=>{
    isModalActive.value=!isModalActive.value
    if(isModalActive.value === 1){
        await fetchStatus();
    }
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
    featurable_id: props.featurable_id,
    featurable_type: props.featurable_type,
    user_id: computed_user_id,
});

const submit = async () =>{
    if(user){
        const res = await axios.post(route('model.feature'), {
            featurable_id: form.featurable_id, 
            featurable_type:form.featurable_type,
        })

        if(res.data.status === 200)
        {
            isFeatured.value = res.isFeatured;
            fetchStatus();
            toggleModal();
            location.reload(); // Should be changed to happen asynchronously 
           

        }

    }
}


const fetchStatus = async ()=>{
    const modelstatus = await axios.post(route('model.getisfeatured'),{
            featurable_id: form.featurable_id,
            featurable_type: form.featurable_type
        });
    isFeatured.value = modelstatus.data;
}



</script>

<template>
    <div>
        <button 
            @click="toggleModal"
            :class="isFeatured ? dangerLinkClasses : primaryLinkClasses"
            >
                <span v-if="isFeatured" class="">
                    <font-awesome-icon icon="fa-times"></font-awesome-icon> UnFeature
                </span>
                <span v-else class="space-x-">
                    <font-awesome-icon icon="fa-check"></font-awesome-icon> Feature 
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
                    <h3 class="uppercase font-bold text-sky-800">{{ model.name }}</h3>
                    <p class="uppercase">
                        This action will
                        <span v-if="!isFeatured">feature </span>  
                        <span v-else class="text-rose-600 font-bold">unfeature </span>  
                        <span v-if="model.name"> {{model.name}} </span>
                        <span v-else-if="model.title"> {{ model.title }} </span>
                        <span v-else> this. </span>
                    </p>
                
                    <h2 
                        class="font-bold"
                        :class="!isFeatured ? 'text-sky-600' : 'text-rose-600'"
                        >Do you want to proceed ?</h2>

                </div>
            </div>

            <div class="flex gap-2">
                <PrimaryButton 
                    type="button"
                    :class="!isFeatured ? btnClasses : btnCloseClasses"
                    @click="submit"
                    >
                        Ok, 
                        <span v-if="!isFeatured">Publish</span>  
                        <span v-else>Remove</span> 
                </PrimaryButton>
                <button 
                    type="button" 
                    :class="!isFeatured ? btnCloseClasses : btnClasses"
                    @click="toggleModal"
                    >
                    No, Go Back
                </button>
            </div>
        </div>
    </Modal>

</template>


