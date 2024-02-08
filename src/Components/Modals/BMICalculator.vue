<script setup>
import Modal from "@/Components/Modal.vue";
import { ref } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import Spinner from '@/Components/spinners/Spinner.vue';


const btnClasses = 'rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all duration-150 ease-in-out px-4 py-2';
const show = ref(false);

const toggleModal = () =>{
    show.value = !show.value
    inProgress.value = false;

}

const inProgress = ref(false);

function calculateBMI() {
    inProgress.value = true;


}


</script>

<template>

    <div>
        <button  
        @click="toggleModal"
        > 
            Calculate Your BMI
        </button>

    </div>

    <Modal :show="show" :closeable="true">
        <div class="text-center font-bold  bg-rose-600 text-white p-2 flex justify-between px-6">
            <h1 class="text-lg">Calculate Your BMI</h1>
            <button type="button" @click="toggleModal" class="text-slate-100 hover:text-slate-300">
                    <font-awesome-icon icon="fa-times"></font-awesome-icon>
            </button>
        </div>
        <div class="p-8">
 
            <div class="">
    
                <div v-if="inProgress" class=" h-36 flex justify-center items-center">
                    <Spinner :has-text="true"/>
                </div>
                
                <div v-if="!inProgress" class="">
                    <div class="flex justify-end gap-2">
                        <PrimaryButton 
                            :class="[inProgress ? 'opacity-25' : btnClasses]"
                            @click="submit"
                            :disabled="inProgress"
                            >
                                Calculate
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    </Modal>

</template>
