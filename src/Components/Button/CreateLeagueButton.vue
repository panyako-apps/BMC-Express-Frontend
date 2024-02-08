<script setup>
import Modal from "@/Components/Modal.vue";
import { ref } from 'vue';
import CreateLeagueForm from "@/Components/Form/CreateLeagueForm.vue";

const props = defineProps({
    league: Object
})

const btnClasses = 'rounded border border-transparent bg-blue-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
const btnCloseClasses = 'rounded border border-transparent bg-red-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2';
const primaryLinkClasses = 'px-3 py-1 text-gray-600 hover:bg-red-600 hover:text-white rounded hover:shadow-md transition-all duration-200 mb-1 w-full text-left';

const show = ref(false);

const toggleModal = () =>{
    show.value = !show.value
}

</script>

<template>

    <div>
        <button 
            @click="toggleModal"
            class="w-full h-48 rounded-xl bg-teal-600 hover:bg-teal-500 text-white text-xl"
            >
            <div class="text-2xl">
                <font-awesome-icon icon="fa-plus-circle"></font-awesome-icon>
            </div>
            Create a League
        </button>
    </div>

    <Modal :show="show" :closeable="true">
        <div class="bg-teal-400 text-slate-900 px-4 py-2.5 relative">
            Create a New League
            <div class="span absolute top-2.5 right-4 cursor-pointer" @click="toggleModal">
                <font-awesome-icon icon="fa-close"></font-awesome-icon>
            </div>
        </div>
        <CreateLeagueForm />
    </Modal>

</template>