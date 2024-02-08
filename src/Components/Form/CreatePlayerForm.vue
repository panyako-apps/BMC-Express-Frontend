<script setup>
import { ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import Spinner from '@/Components/spinners/Spinner.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {component as CKEditor} from '@ckeditor/ckeditor5-vue';

const props = defineProps({
    team: Object,
});


const btnClasses = 'rounded-full border border-transparent bg-blue-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2';
const btnCloseClasses = 'rounded-full border border-transparent bg-red-600 px-3 py-1 text-sm text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2';
const inputClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'

const editorConfig = [];

const inProgress = ref(false);

const form = useForm({
    first_name: '',
    other_names: '',
    nickname: '',
    coverimage: '',
    profileimage: '',
    description: '',
})


const submit = () => {

    inProgress.value= true;

    router.post(route('player.store'), {
        first_name: form.first_name,
        other_names: form.other_names,
        nickname: form.nickname,
        coverimage: form.coverimage,
        profileimage: form.profileimage,
        description: form.description,
        team_id: props.team.id ? props.team.id : null,
    }, {
        onSuccess: ()=>{
            inProgress.value = false;
        },
        preserveScroll: true,
    })
}

</script>

<template>
    <div class="bg-white">
        <div v-if="inProgress" class="p-6 h-36 flex justify-center items-center">
            <Spinner :has-text="true"/>
        </div>
        
        <div v-if="!inProgress" class="p-6">
            <form @submit.prevent="submit">
                
                <div class="grid grid-cols-2 gap-4 mb-3">
                    <div class="">
                        <InputLabel for="first_name" value="First Name" />
                        <TextInput 
                            id="first_name" 
                            type="text" 
                            :class="inputClasses" 
                            v-model="form.first_name" 
                            placeholder="first_name"
                            required />
                        <InputError class="mt-2" :message="form.errors.first_name" />
                    </div>
                    <div class="">
                        <InputLabel for="other_names" value="Other Name(s)" />
                        <TextInput 
                            id="other_names" 
                            type="text" 
                            :class="inputClasses" 
                            v-model="form.other_names" 
                            placeholder="other_names"
                            required />
                        <InputError class="mt-2" :message="form.errors.other_names" />
                    </div>
             
                    <div class="">
                        <InputLabel for="nickname" value="nickname" />
                        <TextInput 
                            id="nickname" 
                            type="text" 
                            :class="inputClasses" 
                            v-model="form.nickname" 
                            placeholder="nickname"
                            required />
                        <InputError class="mt-2" :message="form.errors.nickname" />
                    </div>
                    
                    <div class="">
                        <InputLabel for="profileimage" value="Profile Image" />
                        <TextInput 
                            id="profileimage" 
                            type="file" 
                            class="form-file-input" 
                            @input="form.profileimage = $event.target.files[0]" 
                            />
                        <InputError class="mt-2" :message="form.errors.profileimage" />
                    </div>
    
                    <div class="">
                        <InputLabel for="coverimage" value="Cover Image" />
                        <TextInput 
                            id="coverimage" 
                            type="file" 
                            class="form-file-input" 
                            @input="form.coverimage = $event.target.files[0]" 
                            />
                        <InputError class="mt-2" :message="form.errors.image" />
                    </div>
              
                    <div class="col-span-2">
                        <InputLabel for="description" value="Description" />
                        <CKEditor :editor="ClassicEditor"  v-model="form.description"  :config="editorConfig"></CKEditor>
                    </div>
                
                </div>
        
                <div class="flex gap-2">
                    <button 
                        type="submit"
                        :class="[form.processing ? 'opacity-25' : btnClasses]"
                        @click="submit"
                        :disabled="form.processing"
                        >
                            Submit
                    </button>
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
    </div>
</template>
