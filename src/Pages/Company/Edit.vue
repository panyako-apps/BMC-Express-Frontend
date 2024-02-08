<script setup>
import AdminDashboardLayout from '@/Layouts/AdminDashboardLayout.vue';
import { Head } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import { useForm, router } from '@inertiajs/vue3';
import InputError from '@/Components/InputError.vue';
import InputLabel from '@/Components/InputLabel.vue';
import TextInput from '@/Components/TextInput.vue';
import Spinner from '@/Components/Spinner.vue';

const props = defineProps({
    company: {
        type: Object,
        required: true
    }
});


const btnClasses = 'rounded-full bg-slate-100 shadow-sm px-5 py-1.5 text-teal-600';
const inputClasses = 'block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm'

const inProgress = ref(false);

const form = useForm({
    name: props.company.name,
    email: props.company.email,
    logo: '',
    coverimage: '',
    description: props.company.description,
})

const submit = () => {

    inProgress.value= true;

    router.post(route('admin.company.update', props.company.id), {
        _method: 'PUT',
        name: form.name,
        email: form.email,
        logo: form.logo,
        coverimage: form.coverimage,
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

    <Head>
        <title>Create BMC</title>
    </Head>

    <AdminDashboardLayout>

        <div class="container mx-auto py-16">

            
            <div class="bg-white">
                <div class="relative">
                    <div class="flex gap-2 items-center bg-slate-200 rounded px-4 py-2">
                        <div class="py-2">
                            <h4 class="font-bold text-color-main leading-4 text-lg ">Create a Company</h4>
                        </div>
                    </div>
                </div>
                <div v-if="inProgress" class="p-6 h-36 flex justify-center items-center">
                    <Spinner :has-text="true"/>
                </div>
                
                <div v-if="!inProgress" class="p-6">
                    <form @submit.prevent="submit">
                        
                        <div class="grid grid-cols-2 gap-4 mb-3">
                            <div class="">
                                <InputLabel for="name" value="Name of BMC" />
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
                                <InputLabel for="email" value="Email" />
                                <TextInput 
                                    id="email" 
                                    type="email" 
                                    :class="inputClasses" 
                                    v-model="form.email" 
                                    placeholder="Email Address"
                                    required />
                                <InputError class="mt-2" :message="form.errors.email" />
                            </div>
                            
                            <div class="">
                                <InputLabel for="logo" value="Logo" />
                                <input 
                                    id="logo" 
                                    type="file" 
                                    :class="inputClasses" 
                                    class="p-1 bg-slate-100"
                                    @input="form.logo = $event.target.files[0]" 
                                    />
                                <InputError class="mt-2" :message="form.errors.logo" />
                            </div>
            
                            <div class="">
                                <InputLabel for="coverimage" value="Cover Image" />
                                <input 
                                    id="coverimage" 
                                    type="file" 
                                    :class="inputClasses" 
                                    class="p-1 bg-slate-100"
                                    @input="form.coverimage = $event.target.files[0]" 
                                    />
                                <InputError class="mt-2" :message="form.errors.image" />
                            </div>
                    
                            <div class="col-span-2">
                                <InputLabel for="description" value="Description" />
                                <textarea  v-model="form.description" :class="inputClasses" placeholder="Short, precise and catchin description"></textarea>
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
            
        </div>
    </AdminDashboardLayout>
</template>
