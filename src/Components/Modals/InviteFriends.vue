<script setup>
import { router } from "@inertiajs/vue3";
import Modal from "@/Components/Modal.vue";
import { onMounted, ref } from 'vue';
import PrimaryButton from '@/Components/PrimaryButton.vue';
import Spinner from '@/Components/spinners/Spinner.vue';
import CapsuleToggler from '@/Components/togglers/CapsuleToggler.vue'
import DropSelect from "@/Components/DropSelect.vue";
import ValidatedEmailInput from "../ValidatedEmailInput.vue";
import axios from "axios";

const btnClasses = 'rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-all duration-150 ease-in-out px-4 py-2';
const show = ref(false);
const showSuccessMessage = ref(false);

const emails = ref('');

const toggleModal = () =>{
    show.value = !show.value
    inProgress.value = false;

}

const inProgress = ref(false);

function submit() {
    inProgress.value = true;

    router.post(route('invite.store'), {
        emails: emails.value,
    }, {
        onSuccess: () => {
            inProgress.value = false;
            showSuccessMessage.value = true;

            setTimeout(() => {
                toggleModal();
                showSuccessMessage.value = false; 
                form.reset();
            }, 1200);
        },
        preserveScroll: true,
    });
}


const handleValidatedEmails = (validatedEmails)=>{
    emails.value = validatedEmails;
}


</script>

<template>

    <div  
        @click="toggleModal"
        class="h-full w-full cursor-pointer flex items-center justify-center px-3 py-2"
        > 
            Invite Friends
    </div>

    <Modal :show="show" :closeable="true">
        <div class="text-center font-bold  bg-rose-600 text-white p-2 flex justify-between px-6 rounded-t-lg">
            <h1 class="text-lg">Invite Friends</h1>
            <button type="button" @click="toggleModal" class="text-slate-100 hover:text-slate-300">
                    <font-awesome-icon icon="fa-times"></font-awesome-icon>
            </button>
        </div>
        <div class="p-8">

            <Transition   
                enter-from-class="translate-x-full opacity-0"
                enter-active-class="duration-500"
                leave-active-class="duration-500"
                leave-to-class="translate-x-full opacity-0">
                <div v-show="showSuccessMessage" class="bg-teal-600 rounded p-4 my-1 text-white flex justify-between">
                    <span class="font-bold space-x-2">
                        <font-awesome-icon icon="fa-envelope-circle-check"></font-awesome-icon>
                        Email Invitations Sent Successfully!
                    </span>
                    <span class="bg-white text-teal-600 h-6 w-6 rounded-full flex justify-center items-center cursor-pointer hover:bg-teal-400 transition-all duration-200" @click="showSuccess=false">
                        <font-awesome-icon icon="fa-times"></font-awesome-icon>
                    </span>
                </div>
            </Transition>


 
            <div class="">
    
                <div v-if="inProgress" class=" h-36 flex justify-center items-center">
                    <Spinner :has-text="true"/>
                </div>
                
                <div v-if="!inProgress" class="">
                    <form @submit.prevent="submit">
                        <div class="mb-3">
                            <button type="button" class="w-full bg-blue-50 hover:bg-blue-400 h-10 text-primary hover:text-white text-sm rounded-lg flex gap-2 items-center justify-center transition-all duration-150 ease-in-out">
                                <img src="/storage/social_logo/google.svg" alt=""> <span class="font-bold">Invite Gmail Contacts</span>
                            </button>
                        </div>
                        
                        <div class="mb-3">
                            <ValidatedEmailInput @validated="handleValidatedEmails" />
                        </div>
        
                        <div class="flex justify-end gap-2">
                            <PrimaryButton 
                                :class="[inProgress ? 'opacity-25' : btnClasses]"
                                @click="submit"
                                :disabled="inProgress"
                                >
                                    Send Invites
                            </PrimaryButton>
    
                        </div>
                    </form>
                </div>
            </div>
        
        </div>
    </Modal>

</template>
