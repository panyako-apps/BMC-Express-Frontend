<script setup>
import { computed, ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import Spinner from '@/Components/Spinner.vue';

const props = defineProps({
    league: Object,
});


const btnClasses = 'rounded-full bg-slate-100 shadow-sm px-5 py-1.5 text-teal-600';
const inputClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'

const editorConfig = [];

const inProgress = ref(false);

const form = useForm({
    name: '',
    logo: '',
    coverimage: '',
    region: '',
    slogan: '',
    description: '',
})

const submit = () => {

    inProgress.value= true;

    router.post(route('team.store'), {
        league_id: props.league ? props.league.id : null,
        name: form.name,
        logo: form.logo,
        coverimage: form.coverimage,
        region: form.region,
        slogan: form.slogan,
        description: form.description,
    }, {
        onSuccess: ()=>{
            inProgress.value = false;
        },
        preserveScroll: true,
    })
}


const isReadyToSubmit = computed(()=>form.name);

</script>

<template>
    <div class="bg-white">
        <div v-if="inProgress" class="p-6 h-36 flex justify-center items-center">
            <Spinner :has-text="true"/>
        </div>
        
        <div v-if="!inProgress" class="p-6">
            <form @submit.prevent="submit">
                
                <div class="grid grid-cols-2 gap-4 mb-3">
                    <div class="col-span-2">
                        <InputLabel for="name" value="Team's Name" />
                        <TextInput 
                            id="name" 
                            type="text" 
                            :class="inputClasses" 
                            v-model="form.name" 
                            placeholder="Official Name"
                            required />
                        <InputError class="mt-2" :message="form.errors.name" />
                    </div>
                    <div class="">
                        <InputLabel for="region" value="Region / Location" />
                        <TextInput 
                            id="region" 
                            type="text" 
                            :class="inputClasses" 
                            v-model="form.region" 
                            placeholder="Pin Location"
                            required />
                        <InputError class="mt-2" :message="form.errors.region" />
                    </div>
             
                    <div class="">
                        <InputLabel for="slogan" value="Slogan / Tagline" />
                        <TextInput 
                            id="slogan" 
                            type="text" 
                            :class="inputClasses" 
                            v-model="form.slogan" 
                            placeholder="Your Slogan"
                            required />
                        <InputError class="mt-2" :message="form.errors.slogan" />
                    </div>
                    
                    <div class="">
                        <InputLabel for="logo" value="Logo" />
                        <TextInput 
                            id="logo" 
                            type="file" 
                            class="form-file-input" 
                            @input="form.logo = $event.target.files[0]" 
                            />
                        <InputError class="mt-2" :message="form.errors.logo" />
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
                        <textarea  v-model="form.description" :class="inputClasses" placeholder="Short & Precise History or Current Status"></textarea>
                    </div>
                
                </div>
        
                <div class="flex gap-2">
                    <button 
                        type="submit"
                        :class="[form.processing ? 'opacity-25' : btnClasses,[isReadyToSubmit ? 'bg-teal-600 text-white' : 'bg-slate-300']]"
                        @click="submit"
                        :disabled="form.processing || !isReadyToSubmit"
                        >
                            Submit
                    </button>
                </div>
        
            </form>
        </div>
    </div>
</template>
