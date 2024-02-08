<script setup>
import Modal from "@/Components/Modal.vue";
import { ref } from 'vue';
import { router } from "@inertiajs/vue3";
import Spinner from '@/Components/Spinner.vue';


const props = defineProps({
    company: {
        type: Object, 
        required: true,
    }
})

const btnClasses = 'rounded border border-transparent bg-blue-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
const btnCloseClasses = 'rounded border border-transparent bg-red-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2';
const primaryLinkClasses = 'block w-full px-4 py-2 text-start text-sm leading-5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-800 transition duration-150 ease-in-out flex items-center gap-1';

const inProgress = ref(false);

function deleteCompany() {

    inProgress.value= true;

    router.post(route('admin.company.destroy', props.company.id),
        {
            _method: 'delete'
        }, 
        {
            onSuccess: ()=>{
                toggleModal();
                inProgress.value = false;
            },
            preserveScroll: true,
        }
    );


}

const show = ref(false);

const toggleModal = () =>{
    show.value = !show.value
}

</script>

<template>

    <div>
        <button 
            @click="toggleModal"
            :class="primaryLinkClasses"
            class="block w-full mb-1"
            >
            <font-awesome-icon icon="fa-trash-alt"></font-awesome-icon>
            Delete
        </button>
    </div>

    <Modal :show="show" :closeable="true" :max-width="'sm'">

        <div v-if="inProgress" class="p-6 h-36 flex justify-center items-center">
            <Spinner :text="'Deleting...'"/>
        </div>


        <div v-if="!inProgress" class="p-6">
            <div class="flex gap-2 items-center mb-6">
                    <div class="h-12 w-12 rounded-full shrink-0 overflow-hidden">
                        <img :src="company.logo" class="h-full w-full object-cover" >
                    </div>
                    <div class="grow">
                        <h2 class="text-slate-500 text-xl">Delete this BMC?</h2>
                    </div>
                </div>

            <div class="flex gap-2">
                <button 
                    type="button"
                    :class="btnCloseClasses"
                    @click="deleteCompany"
                    >
                        <font-awesome-icon icon="fa-trash-alt"></font-awesome-icon>
                        Yes, Delete
                </button>
                <button 
                    type="button" 
                    :class="btnClasses"
                    @click="toggleModal"
                    >
                    No, Go Back
            </button>
            </div>
        </div>
    </Modal>

</template>