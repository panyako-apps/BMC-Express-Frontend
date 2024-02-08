<script setup>
import Modal from "@/Components/Modal.vue";
import Spinner from '@/Components/spinners/Spinner.vue';
import { router, useForm } from "@inertiajs/vue3";
import { ref } from "vue";
import InputLabel from '@/Components/InputLabel.vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import InputError from '@/Components/InputError.vue';


const props = defineProps({
    ids: [Object, Array],
    categories: [Object, Array],
});

const emits = defineEmits([
    'categoryassigned'
])

const inProgress = ref(false);
const show = ref(false);


const toggleModal = ()=>{
    show.value = !show.value
}


const btnClasses = 'rounded border border-transparent bg-sky-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2';
const btnCloseClasses = 'rounded border border-transparent bg-red-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2';
const inputClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 sm:text-sm'


const selectedCategory = ref();

const form = useForm({
    category: ''
})


function submit() {
    
    inProgress.value= true;
    show.value = true;

    router.post(route('admin.product.assigncategory'), {
        ids: props.ids,
        category: selectedCategory.value,
    }, 
    {
        onSuccess: ()=>{
            inProgress.value = false;
            show.value=false;
            form.reset();
            emits('categoryassigned');

        },
        preserveScroll: true
    })
}

</script>


<template>
    
    <button @click="toggleModal" class="w-full text-left p-1 text-slate-700 hover:opacity-75 hover:text-rose-700 hover:pl-4 hover:border-l hover:border-rose-700 transitio duration-200 ease-in-out">Assign Category</button>

    <Modal :show="show" :closeable="true">
        <div class="pt-4 px-6 border-b pb-2">
            <h4 class="uppercase text-sky-600 font-bold">Assign Category To <span class="text-rose-600">{{ props.ids.length }}</span> product{{ props.ids.length==1 ? '' : 's' }}</h4>
        </div>

        <div v-if="inProgress" class="p-6 h-36 flex justify-center items-center">
            <Spinner :has-text="true" :text="'Working...'"/>
        </div>
        <div v-else class="p-6">
            <form @submit.prevent="submit">

                <div class="mb-3">
                    <InputLabel for="category" value="Choose Category" />
                    <select name="category" id="category" 
                            :class="inputClasses" 
                            v-model="selectedCategory" 
                            >
                        <option v-for="(category, index) in props.categories" 
                                :key="index" 
                                :value="category.id"
                                >
                                {{ category.name }}
                        </option>
                    </select>
                    <InputError class="mt-2" :message="form.errors.category" />
                </div>

                <div class="flex gap-2">
                    <PrimaryButton 
                        :class="[form.processing ? 'opacity-25' : btnClasses]"
                        @click="submit"
                        :disabled="form.processing"
                        >
                            Assign Category
                    </PrimaryButton>
                    <button 
                            type="button" 
                            :class="btnCloseClasses"
                            @click="toggleModal"
                            >
                            <font-awesome-icon icon="fa-times"></font-awesome-icon>
                            Close
                    </button>
                </div>
                </form>
        </div>
    </Modal>


</template>


<style>

</style>